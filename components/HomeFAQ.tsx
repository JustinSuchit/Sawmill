import Link from "next/link";
import { Plus } from "lucide-react";

const questions = [
  {
    question: "What information should I include in a lumber quote request?",
    answer: "Include the wood type, board sizes, quantities and intended use. Add your delivery location if needed, and attach drawings or photos when they help explain the job. Pricing and availability are confirmed when your request is reviewed.",
    href: "/quote?product=Dimensional%20Lumber",
    link: "Get Lumber Pricing",
  },
  {
    question: "Can I request custom-cut timber and mouldings?",
    answer: "Yes. Sawmill services include cutting timber to project requirements, while dressing and moulding options include crown mouldings, base mouldings and custom profiles. Send dimensions or a profile drawing so the team can review your requirements.",
    href: "/lumber#mouldings-title",
    link: "View timber mouldings",
  },
  {
    question: "How do I enquire about haulage or site services?",
    answer: "Provide the site location, material or load details, access conditions and preferred timing. For tree removal or land clearing, include photos and a description of the work. The team will review the scope before confirming arrangements.",
    href: "/services",
    link: "Explore site services",
  },
  {
    question: "Where is the business located?",
    answer: "J. Jagmohan & Co. Ltd is located at 331 Rochard Rd, Penal, Trinidad & Tobago. The contact page includes a map and directions to the business.",
    href: "/contact",
    link: "View the map and directions",
  },
] as const;

export function HomeFAQ() {
  return (
    <section className="section faq-section" aria-labelledby="faq-title">
      <div className="section-head">
        <p className="eyebrow">Common questions</p>
        <h2 id="faq-title">Planning Your Order or Site Work.</h2>
      </div>
      <div className="faq-list">
        {questions.map(({ question, answer, href, link }) => (
          <details key={question}>
            <summary>{question}<Plus size={20} aria-hidden="true" /></summary>
            <div><p>{answer}</p><Link className="text-link" href={href}>{link}</Link></div>
          </details>
        ))}
      </div>
    </section>
  );
}
