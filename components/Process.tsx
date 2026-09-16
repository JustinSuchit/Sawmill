import { processItems, whyItems } from "@/lib/site-data";

export function WhyChooseUs() {
  return (
    <section className="section why" id="about" aria-labelledby="why-title">
      <div className="section-head reveal">
        <p className="eyebrow">Why Choose Us</p>
        <h2 id="why-title">Capability You Can Put to Work.</h2>
      </div>
      <div className="why-grid">
        {whyItems.map(([number, title, description]) => (
          <article className="reveal" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="section-head reveal">
        <p className="eyebrow">Quote Process</p>
        <h2 id="process-title">Simple Steps. Clear Next Move.</h2>
      </div>
      <ol className="timeline">
        {processItems.map(([number, title, description]) => (
          <li className="reveal" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
