import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import "./chatbot.css";

type Role = "user" | "assistant";

type Message = {
  role: Role;
  content: string;
};

const API_URL =
  import.meta.env.PUBLIC_CHAT_API_URL ||
  "https://chatty-chat.lauta-3011.workers.dev/chat";
const MAX_HISTORY = 8;
const FALLBACK_REPLY = "I don't have that in my CV — email lauta_3011@hotmail.com.";
const ERROR_REPLY = "Couldn't reach the assistant. Try again.";

function replaceLast(list: Message[], content: string): Message[] {
  if (list.length === 0) return list;
  const next = list.slice();
  next[next.length - 1] = { ...next[next.length - 1], content };
  return next;
}

async function readReply(
  response: Response,
  onToken: (text: string) => void
): Promise<string> {
  const contentType = response.headers.get("Content-Type") || "";

  if (!response.body || !contentType.includes("text/event-stream")) {
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    if (content) onToken(content);
    return content;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      try {
        const chunk = JSON.parse(payload);
        const delta = chunk?.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta.length > 0) {
          full += delta;
          onToken(full);
        }
      } catch {
        // Ignore malformed keep-alive or partial payloads.
      }
    }
  }

  return full;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const distanceFromBottom = log.scrollHeight - log.scrollTop - log.clientHeight;
    if (distanceFromBottom < 80) log.scrollTop = log.scrollHeight;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const lastMessage = messages[messages.length - 1];
  const thinking =
    pending && lastMessage?.role === "assistant" && lastMessage.content === "";

  const closePanel = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const send = async () => {
    const text = input.trim();
    if (!text || pendingRef.current) return;

    pendingRef.current = true;

    const userMessage: Message = { role: "user", content: text };
    const history = [...messages, userMessage].slice(-MAX_HISTORY);

    setMessages([...messages, userMessage, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      const reply = await readReply(response, (partial) => {
        setMessages((current) => replaceLast(current, partial));
      });

      if (!reply) {
        setMessages((current) => replaceLast(current, FALLBACK_REPLY));
      }
    } catch (requestError) {
      if (controller.signal.aborted) return;
      console.error(requestError);
      setMessages((current) => current.slice(0, -1));
      setError(ERROR_REPLY);
    } finally {
      pendingRef.current = false;
      if (!controller.signal.aborted) setPending(false);
      abortRef.current = null;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <section
          id="chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-title"
          className="chatbot__panel flex h-[min(70vh,32rem)] w-[24rem] max-w-[calc(100vw-2rem)] flex-col border border-swiss-plum bg-swiss-meeple text-swiss-lime"
        >
          <header className="flex items-center justify-between gap-4 border-b border-swiss-plum px-4 py-3">
            <h2
              id="chatbot-title"
              className="text-xs font-bold uppercase tracking-widest"
            >
              Ask something
            </h2>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close chat"
              className="border border-swiss-plum px-2 py-1 text-sm leading-none transition-colors duration-300 hover:bg-swiss-lime hover:text-swiss-meeple focus:border-swiss-lime focus:outline-none"
            >
              &times;
            </button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-busy={pending || undefined}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm font-light leading-relaxed"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "ml-8 border-l-2 border-swiss-lime pl-3"
                    : "mr-8 border-l-2 border-swiss-olive pl-3"
                }
              >
                <span className="sr-only">
                  {message.role === "user" ? "You: " : "Assistant: "}
                </span>
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            ))}
            {thinking && (
              <p className="text-xs uppercase tracking-widest text-swiss-lime/80">Thinking&hellip;</p>
            )}
          </div>

          {error && (
            <p role="alert" className="px-4 pb-2 text-xs leading-relaxed">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-swiss-plum p-3"
          >
            <label htmlFor="chatbot-input" className="sr-only">
              Message
            </label>
            <textarea
              id="chatbot-input"
              ref={inputRef}
              rows={1}
              maxLength={2000}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              className="max-h-24 w-full resize-none border border-swiss-plum bg-transparent px-3 py-2 text-sm leading-relaxed transition-colors duration-300 placeholder:text-swiss-lime/80 hover:border-swiss-lime focus:border-swiss-lime focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending || input.trim().length === 0}
              className="border border-swiss-plum px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-swiss-lime hover:text-swiss-meeple focus:border-swiss-lime focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-swiss-lime"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? "chatbot-panel" : undefined}
        className="border border-swiss-plum bg-swiss-meeple px-4 py-3 text-xs font-bold uppercase tracking-widest text-swiss-lime transition-colors duration-300 hover:bg-swiss-lime hover:text-swiss-meeple focus:border-swiss-lime focus:outline-none"
      >
        Ask about me
      </button>
    </div>
  );
}
