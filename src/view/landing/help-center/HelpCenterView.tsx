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
  Building,
  CreditCard,
  HelpCircle,
  LifeBuoy,
  MessageSquare,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const HelpCenterView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearchSubmit = () => {
    const faqElement = document.getElementById("faq-section");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const categories = [
    {
      id: "seeker",
      icon: <User className="h-5 w-5" />,
      title: "Job Seeker Support",
      description: "Managing your profile, applications, and job alerts.",
      count: "12 articles",
    },
    {
      id: "employer",
      icon: <Building className="h-5 w-5" />,
      title: "Employer Support",
      description: "Posting jobs, managing candidates, and company profiles.",
      count: "8 articles",
    },
    {
      id: "safety",
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Trust & Safety",
      description: "Keeping your account secure and reporting issues.",
      count: "5 articles",
    },
    {
      id: "billing",
      icon: <CreditCard className="h-5 w-5" />,
      title: "Billing & Subscriptions",
      description: "Managing invoices, premium upgrades, and payment gateways.",
      count: "6 articles",
    },
  ];

  const faqs = [
    {
      category: "seeker",
      question: "How do I apply for a job on Workly?",
      answer:
        "Applying is simple. Just browse for jobs, click on a position you're interested in, and hit the 'Apply Now' button. You can upload a new resume or select one already saved to your profile.",
    },
    {
      category: "seeker",
      question: "How can I update my resume?",
      answer:
        "Go to your 'Profile' dashboard and click on the 'CV Manager' section. From there, you can upload new versions of your resume, set a primary resume, or delete outdated files.",
    },
    {
      category: "seeker",
      question: "Can I withdraw a submitted job application?",
      answer:
        "Yes, navigate to your Seeker Dashboard, go to 'Applications', select the application you wish to cancel, and click the 'Withdraw' button. Please note that withdrawing is permanent, and you cannot reapply to the same job post.",
    },
    {
      category: "seeker",
      question: "What does the 'Shortlisted' status mean?",
      answer:
        "When an employer moves your status to 'Shortlisted', it means your profile and resume successfully matched their initial criteria. The hiring team will typically contact you next to schedule an interview or assessment.",
    },
    {
      category: "employer",
      question: "Is there a limit to how many jobs I can post?",
      answer:
        "Job posting limits are governed by your subscription plan. The Free plan allows 1 active listing, the Starter plan allows 5, the Pro plan offers 15, and the Enterprise/Ultimate plans provide unlimited active listings.",
    },
    {
      category: "employer",
      question: "How do I view applicant resumes and details?",
      answer:
        "Log into your Employer Dashboard, go to 'Manage Jobs', select the relevant listing, and click on 'Applicants'. You will see a list of candidates along with their cover letters, profile experience, and default resumes.",
    },
    {
      category: "employer",
      question: "Can I invite candidates to apply for my active jobs?",
      answer:
        "Yes, with premium search access, you can browse candidate profiles, filter by specific skills, experience levels, or languages, and send direct invite notifications prompting them to view and apply to your posts.",
    },
    {
      category: "employer",
      question: "How do I close or delete a job posting?",
      answer:
        "On your Employer Dashboard under 'Manage Jobs', select the status drop-down next to the job. You can toggle the status to 'CLOSED' or 'DRAFT' to prevent further applications from being submitted.",
    },
    {
      category: "safety",
      question: "How do I report a suspicious job listing?",
      answer:
        "Every job details view contains a 'Report' button. If you believe a posting violates our terms (e.g. asking for money, spam, misleading duties), click the button to alert our compliance and safety team immediately.",
    },
    {
      category: "safety",
      question: "How can I secure my account login credentials?",
      answer:
        "We recommend enabling Two-Factor Authentication (2FA) inside your 'Security Settings'. Additionally, always use a strong, unique password and verify your email address to secure your account logs.",
    },
    {
      category: "safety",
      question: "Can I control who views my professional profile?",
      answer:
        "Yes, you can toggle your profile visibility between 'PUBLIC' and 'PRIVATE' in your User Settings. Private profiles are hidden from employer directory searches and are only visible to companies you explicitly apply to.",
    },
    {
      category: "billing",
      question: "What payment options are supported on Workly?",
      answer:
        "We support SSLCommerz payment gateways, allowing secure transactions in BDT via Credit/Debit cards (Visa, Mastercard), mobile banking (bkash, Nagad, Rocket), and online bank transfers.",
    },
    {
      category: "billing",
      question: "Can I get a refund on my corporate subscription plan?",
      answer:
        "According to our Refund Policy, corporate plans are eligible for full refunds within 7 days of purchase, provided no featured jobs have been active and no premium candidate alerts have been consumed.",
    },
    {
      category: "billing",
      question: "How do I download my monthly invoices?",
      answer:
        "Invoices are automatically generated for every transaction. You can view, review, and download PDF copies of your invoices by going to the 'Billing & Invoices' tab on your Company Settings dashboard.",
    },
  ];

  // Filter FAQs based on active category and search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Smooth scroll down to FAQ section
    const faqElement = document.getElementById("faq-section");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Premium Hero Search Section with Chateau Green accents */}
      <section className="from-primary/10 via-primary/5 relative overflow-hidden bg-linear-to-b to-transparent pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="bg-primary/5 pointer-events-none absolute top-1/4 left-1/10 h-72 w-72 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 right-1/10 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
            <LifeBuoy
              className="animate-spin-slow h-3.5 w-3.5"
              style={{ animationDuration: "8s" }}
            />
            <span>Support Center</span>
          </div>

          <h1 className="text-foreground sm:text-5.5xl text-4xl font-extrabold tracking-tight">
            How can we <span className="text-primary italic">help</span> you?
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base sm:text-lg">
            Search our knowledge base for instant answers or select one of the
            core support categories below.
          </p>

          <div className="relative mx-auto mt-8 max-w-2xl">
            <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for articles (e.g. 'resume', 'billing', 'verify')"
              className="border-border/60 bg-card/80 focus-visible:ring-primary/20 focus-visible:border-primary/50 h-14 rounded-2xl pr-24 pl-12 text-base backdrop-blur-xs transition-all"
            />
            <Button
              onClick={handleSearchSubmit}
              className="absolute top-1/2 right-2 h-10 -translate-y-1/2 cursor-pointer rounded-xl px-5 text-xs font-bold transition-all"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <div className="-mt-10 mb-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <Card
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`group cursor-pointer rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? "ring-primary/10 border-primary bg-primary/5 ring-2"
                      : "border-border/50 bg-card hover:border-primary/60"
                  }`}
                >
                  <CardContent className="space-y-4 p-6">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-foreground text-base font-bold">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
                        {category.description}
                      </p>
                      <span className="text-primary mt-4 block text-[10px] font-bold tracking-wider uppercase">
                        {category.count}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq-section" className="max-w-3.5xl mx-auto scroll-mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Quick answers to common questions about Workly platform
              operations.
            </p>

            {/* Category Filter Tabs */}
            <div className="scrollbar-hide mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                onClick={() => setActiveCategory("all")}
                className="h-9 cursor-pointer rounded-full px-5 text-xs font-bold transition-all duration-300"
              >
                All FAQs
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat.id)}
                  className="h-9 cursor-pointer rounded-full px-5 text-xs font-bold transition-all duration-300"
                >
                  {cat.title.split(" ")[0]}
                </Button>
              ))}
            </div>
          </div>

          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/50 bg-card hover:border-primary/40 rounded-2xl border px-6 py-1.5 transition-all duration-300"
                >
                  <AccordionTrigger className="hover:text-primary text-left text-base font-semibold transition-colors duration-300 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground border-border/40 mt-3 border-t pt-3 pb-6 text-sm leading-relaxed sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="border-border/50 bg-card rounded-2xl border py-16 text-center">
              <HelpCircle className="text-muted-foreground/30 mx-auto h-12 w-12" />
              <h3 className="text-foreground mt-4 text-lg font-bold">
                No matching results found
              </h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-sm">
                We {`couldn't`} find any FAQs for {`"${searchQuery}"`}. Try
                updating your keywords or resetting the filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-6 h-9 rounded-xl font-bold"
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </div>

        {/* Contact CTA card */}
        <div className="bg-primary/5 border-primary/10 relative mx-auto mt-28 max-w-4xl overflow-hidden rounded-3xl border p-8 text-center md:p-12">
          <div className="bg-primary/10 pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full blur-2xl" />
          <div className="bg-primary/10 pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="bg-primary/10 text-primary mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Still need support?
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-base">
              {`Can't`} find the resolution to your query in our documentation?
              Contact our global service desk.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact-us" className="w-full sm:w-auto">
                <Button className="h-11 w-full gap-2 rounded-xl px-8 text-sm font-bold transition-all">
                  Contact Support
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-border/60 hover:bg-card h-11 w-full rounded-xl px-8 text-sm font-bold transition-all sm:w-auto"
              >
                Live Chat Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
