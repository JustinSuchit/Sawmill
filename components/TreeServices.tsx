import { SiteImage } from "./SiteImage";

const treeImage = "https://assets.weforum.org/article/image/Bo0Qek_KruQYGA-MF9w0MPhRwMvS1aCUtTdLk-TSyFo.JPG";

export function TreeServices() {
  return (
    <section className="tree-panel" id="tree-services" aria-labelledby="tree-title">
      <div className="tree-media">
        <SiteImage src={treeImage} alt="Representative professional tree cutting with safety gear" sizes="(max-width: 860px) 100vw, 50vw" />
      </div>
      <div className="tree-copy reveal">
        <p className="eyebrow">Tree Services</p>
        <h2 id="tree-title">Need a Tree Gone? We Handle the Entire Job.</h2>
        <p>
          From a single property tree to larger commercial clearing needs, the service path is built around assessment,
          cutting, removal, hauling and cleanup. Confirm stump services before publishing if the company offers them.
        </p>
        <div className="check-list" aria-label="Tree service capabilities">
          <span>Tree cutting</span><span>Tree removal</span><span>Branch removal</span><span>Land clearing</span><span>Site cleanup</span><span>Commercial clearing</span>
        </div>
        <ol className="process-mini">
          <li><strong>1.</strong> Site Assessment</li>
          <li><strong>2.</strong> Cutting & Removal</li>
          <li><strong>3.</strong> Hauling</li>
          <li><strong>4.</strong> Site Cleanup</li>
        </ol>
        <a className="btn btn-primary" href="/quote">Request a Tree Service Quote</a>
      </div>
    </section>
  );
}
