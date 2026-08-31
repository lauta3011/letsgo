import React, { createElement, type ReactNode } from "react";

const GAP_CLASS = "w-[0.35em]";

const DEFAULT_TAG = "span";

export function SplitText({
  text,
  className,
  tag = DEFAULT_TAG,
}: {
  text: string;
  className?: string;
  tag?: keyof HTMLElementTagNameMap;
}) {
  const chars = text.split("");

  const content = chars.map((char, i) =>
    char === " " ? (
      <span key={i} className={GAP_CLASS} aria-hidden="true" />
    ) : (
      <span key={i} className="inline-block">
        {char}
      </span>
    )
  ) as ReactNode[];

  return createElement(tag, { className, "aria-label": text, role: "text" }, content);
}

export default SplitText;
