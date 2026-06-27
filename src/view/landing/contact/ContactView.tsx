"use client";

import WkForm from "@/components/form/WkForm";
import WKInput from "@/components/form/WkInput";
import WKTextArea from "@/components/form/WkTextArea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "motion/react";
import Link from "next/link";

const ContactView = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log("Contact form data:", data);
    toast.success(
      "Message sent successfully! Our team will get back to you soon.",
    );
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Our team is here to help.",
      value: "support@workly-job.com",
      link: "mailto:support@workly-job.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm.",
      value: "+1 (555) 000-0000",
      link: "tel:+15550000000",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Visit our global headquarters.",
      value: "123 Business Ave, Dhaka, Bangladesh",
      link: "#",
    },
    {
      icon: Globe,
      title: "Worldwide Presence",
      description: "Serving professionals in 150+ countries.",
      value: "Available 24/7",
      link: "#",
    },
  ];

  return (
    <div className="bg-background relative min-h-screen overflow-hidden pt-16 pb-12 sm:pt-32 lg:pt-40">
      {/* Atmospheric Background Decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="bg-primary/5 absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" />
        <div className="bg-accent/5 absolute bottom-1/4 left-1/4 h-[350px] w-[350px] rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-16 lg:text-left"
        >
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Get in{" "}
            <span className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text pr-2 text-transparent italic">
              touch
            </span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base sm:text-lg lg:mx-0">
            Have questions about Workly_job? Whether {`you're`} a job seeker or
            an employer, our global support team is ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Contact Info Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-8"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6">
              {contactInfo.map((item, index) => (
                <Card
                  key={index}
                  className="bg-card border-border/40 hover:border-primary/40 group cursor-pointer rounded-2xl border shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                >
                  <CardContent className="flex h-full flex-col justify-between space-y-2 p-3.5 sm:space-y-4 sm:p-6">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 will-change-transform group-hover:scale-110 sm:h-12 sm:w-12">
                      <item.icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground truncate text-xs font-bold sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[10px] sm:mt-1 sm:text-sm">
                        {item.description}
                      </p>
                      <a
                        href={item.link}
                        className="text-primary mt-2 line-clamp-1 block truncate text-[9.5px] font-semibold break-all transition-all hover:underline sm:mt-3 sm:text-base"
                      >
                        {item.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Message */}
            <div className="bg-primary/5 border-primary/10 rounded-2xl border p-5 transition-shadow duration-500 hover:shadow-xs sm:rounded-3xl sm:p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-primary/20 rounded-lg p-2">
                  <MessageSquare className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Need instant help?</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                Check our Help Center for quick answers to common questions
                about account setup, job postings, and application tracking.
              </p>
              <Link href="/help-center" className="inline-block">
                <Button
                  variant="link"
                  className="text-primary mt-4 px-0 font-bold hover:underline"
                >
                  Visit Help Center →
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:mt-0"
          >
            <Card className="bg-card border-border/40 overflow-hidden rounded-2xl border shadow-xs transition-shadow duration-500 hover:shadow-md sm:rounded-3xl">
              <div className="p-4 pb-0 sm:p-8 sm:pb-0">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm">
                  Complete the form below and {`we'll`} reply within 24 hours.
                </p>
              </div>
              <CardContent className="p-4 pt-4 sm:p-8 sm:pt-6">
                <WkForm onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
                  <div className="mt-4 sm:mt-6">
                    <WKInput
                      name="email"
                      type="email"
                      label="Work Email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <WKInput
                      name="subject"
                      label="Subject"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <WKTextArea
                      name="message"
                      label="Message"
                      placeholder="Tell us what you need..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 h-11 w-full cursor-pointer gap-2 rounded-xl text-sm font-bold sm:mt-8 sm:h-12 sm:text-base"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </WkForm>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
