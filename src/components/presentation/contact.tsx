// src/components/GetInTouch.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Typography,
  Alert,
  Card,
  CardBody,
} from "@material-tailwind/react";
import emailjs from "@emailjs/browser";

type Status = "loading" | "success" | "error" | null;

export function GetInTouch() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        setStatus(null);
      }, 2000)
    }
  }, [status])

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    if (!form.current) return;
    emailjs
      .sendForm(
        "service_wljbbsk",      // Replace with your EmailJS service ID
        "template_tdvzdgj",
        form.current,
        "smM27pWlwXHzxf6un"
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
    <section id="contact" className="mx-auto flex justify-center lg:py-20 lg:p-8 bg-white shadow-md rounded-md">
      <div className="container max-auto">
        <Card           
          shadow={false}
          className="overflow-hidden rounded-3xl md:flex-row md:gap-8"
          >
            <CardBody className="flex-col justify-between py-20 px-14 md:w-11/12">
              <Typography variant="h2" color="blue-gray" className={"py-8"} >
                Get in touch with me!
              </Typography>

              <form ref={form} onSubmit={sendEmail} className="w-full space-y-6">
                <Input className="bg-white" crossOrigin="anonymous" name="user_name" label="Name" required />
                <Input className="bg-white" crossOrigin="anonymous" name="user_email" label="Email" type="email" required />
                <Textarea className="bg-white" name="message" label="Message" required />
                
                <div className="flex justify-center w-full">
                  <Button type="submit" className="w-1/4">
                    Send Message
                  </Button>
                </div>
              </form>

              {status === "success" && (
                <Alert color="light-blue" className="mt-4">
                  Message sent successfully!
                </Alert>
              )}
              {status === "error" && (
                <Alert color="red" className="mt-4">
                  Something went wrong. Please try again.
                </Alert>
              )}
              {status === "loading" && (
                <Alert className="mt-4">
                  Sending...
                </Alert>
              )}
            </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default GetInTouch;
