"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Building,
  HelpCircle,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";

const HelpCenterView = () => {
  const categories = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Job Seeker Support",
      description: "Managing your profile, applications, and job alerts.",
      link: "#",
      count: "12 articles",
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Employer Support",
      description: "Posting jobs, managing candidates, and company profiles.",
      link: "#",
      count: "8 articles",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Trust & Safety",
      description: "Keeping your account secure and reporting issues.",
      link: "#",
      count: "5 articles",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Career Guides",
      description: "Resume tips, interview prep, and industry insights.",
      link: "#",
      count: "15 articles",
    },
  ];

  const faqs = [
    {
      question: "How do I apply for a job on Workly_job?",
      answer:
        "Applying is simple. Just browse for jobs, click on a position you're interested in, and hit the 'Apply Now' button. You can upload a new resume or select one from your profile.",
    },
    {
      question: "Is there a fee to post a job?",
      answer:
        "We offer both free and premium job posting options. Basic postings are free, while featured postings that get more visibility require a subscription or one-time payment.",
    },
    {
      question: "How can I update my resume?",
      answer:
        "Go to your 'Profile' section and click on 'CV Manager'. From there, you can upload new versions of your resume, set a primary one, or delete old ones.",
    },
    {
      question: "How do I report a suspicious job posting?",
      answer:
        "Every job posting has a 'Report' button at the bottom. If you suspect a job is fraudulent, please click that button and our safety team will investigate immediately.",
    },
  ];

  return (
    <div className="bg-background mt-16 min-h-screen pt-16 pb-20 md:mt-20">
      {/* Hero Search Section */}
      <section className="bg-muted/30 border-border/50 border-b py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
            How can we <span className="text-primary italic">help</span> you?
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Search our knowledge base for answers or browse categories below.
          </p>
          <div className="relative mx-auto mt-10 max-w-2xl">
            <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search for articles (e.g. 'how to apply', 'reset password')"
              className="border-border/50 bg-card focus-visible:ring-primary/20 h-14 rounded-2xl pr-4 pl-12 text-base shadow-none"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-card border-border/50 hover:border-primary/30 group cursor-pointer rounded-2xl border shadow-none transition-all"
            >
              <CardContent className="space-y-4 p-6">
                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-bold">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {category.description}
                  </p>
                  <p className="text-primary mt-4 text-xs font-medium tracking-wider uppercase">
                    {category.count}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2">
              Quick answers to common questions about Workly_job.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50 bg-card hover:border-primary/20 rounded-2xl border px-6 py-1 shadow-none transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground border-border/50 mt-2 border-t pt-2 pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary/5 border-primary/10 mx-auto mt-24 max-w-4xl rounded-3xl border p-10 text-center">
          <div className="bg-primary/20 text-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold">Still need help?</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            If you {`couldn't`} find the answer {`you're`} looking for, our
            global support team is available 24/7.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact-us">
              <Button className="h-12 gap-2 rounded-xl px-8 text-base font-bold">
                Contact Support
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-border/50 hover:bg-background h-12 rounded-xl px-8 text-base font-bold"
            >
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
