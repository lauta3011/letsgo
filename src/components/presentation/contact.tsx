// src/components/GetInTouch.tsx
import React, { useRef, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import emailjs from "@emailjs/browser";

type Status = "loading" | "success" | "error" | null;

export function GetInTouch() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    if (!form.current) return;

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",      // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",     // Replace with your EmailJS template ID
        form.current,
        "YOUR_PUBLIC_KEY"       // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("success");
          form.current?.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-md">
      <Typography variant="h2" color="blue-gray" className="mb-6 text-center">
        Contact me!
      </Typography>

      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <Input crossOrigin="anonymous" name="user_name" label="Name" required />
        <Input crossOrigin="anonymous" name="user_email" label="Email" type="email" required />
        <Textarea name="message" label="Message" required />
        <Button type="submit" fullWidth>
          Send Message
        </Button>
      </form>

      {status === "success" && (
        <Alert color="green" className="mt-4">
          Message sent successfully!
        </Alert>
      )}
      {status === "error" && (
        <Alert color="red" className="mt-4">
          Something went wrong. Please try again.
        </Alert>
      )}
      {status === "loading" && (
        <Alert color="blue" className="mt-4">
          Sending...
        </Alert>
      )}
    </div>
  );
};

export default GetInTouch;
