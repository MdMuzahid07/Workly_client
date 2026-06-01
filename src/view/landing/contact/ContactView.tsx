"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ContactView = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log("Contact form data:", data);
    toast.success(
      "Message sent successfully! Our team will get back to you soon.",
    );
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Our team is here to help.",
      value: "support@workly-job.com",
      link: "mailto:support@workly-job.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm.",
      value: "+1 (555) 000-0000",
      link: "tel:+15550000000",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Visit our global headquarters.",
      value: "123 Business Ave, Dhaka, Bangladesh",
      link: "#",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Worldwide Presence",
      description: "Serving professionals in 150+ countries.",
      value: "Available 24/7",
      link: "#",
    },
  ];

  return (
    <div className="bg-background mt-16 min-h-screen pt-16 pb-20 md:mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Get in <span className="text-primary italic">touch</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg lg:mx-0">
            Have questions about Workly_job? Whether {`you're`} a job seeker or
            an employer, our global support team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Contact Info Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {contactInfo.map((item, index) => (
                <Card
                  key={index}
                  className="bg-card border-border/50 hover:border-primary/30 group rounded-2xl border shadow-none transition-all"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-foreground text-lg font-bold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {item.description}
                      </p>
                      <a
                        href={item.link}
                        className="text-primary mt-3 block text-base font-semibold transition-all hover:underline"
                      >
                        {item.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Message */}
            <div className="bg-primary/5 border-primary/10 rounded-3xl border p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-primary/20 rounded-lg p-2">
                  <MessageSquare className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Need instant help?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Check our Help Center for quick answers to common questions
                about account setup, job postings, and application tracking.
              </p>
              <Button
                variant="link"
                className="text-primary mt-4 px-0 font-bold"
              >
                Visit Help Center →
              </Button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:mt-0">
            <Card className="bg-card overflow-hidden rounded-3xl border shadow-none">
              <div className="bg-muted/30 border-border/50 border-b p-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mt-2">
                  Complete the form below and {`we'll`} reply within 24 hours.
                </p>
              </div>
              <CardContent className="p-8">
                <WkForm onSubmit={handleSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <WKInput
                      name="firstName"
                      label="First Name"
                      placeholder="e.g. John"
                      required
                    />
                    <WKInput
                      name="lastName"
                      label="Last Name"
                      placeholder="e.g. Doe"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <WKInput
                      name="email"
                      type="email"
                      label="Work Email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <WKInput
                      name="subject"
                      label="Subject"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <WKTextArea
                      name="message"
                      label="Message"
                      placeholder="Tell us what you need..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-8 h-12 w-full gap-2 rounded-xl text-base font-bold"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </WkForm>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
