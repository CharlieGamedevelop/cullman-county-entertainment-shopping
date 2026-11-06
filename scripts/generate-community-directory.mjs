import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const networkPath = path.join(repoRoot, 'community-network.json');
const outputPath = path.join(repoRoot, 'communities.html');

const network = JSON.parse(fs.readFileSync(networkPath, 'utf8'));

const cards = network.map((entry) => {
  const label = entry.status === 'published' ? 'Published' : 'Planned';
  const siteUrl = entry.website || '#';
  const statusText = entry.status === 'published' ? 'Published' : 'Planned · not yet published';
  const slug = entry.slug || entry.municipality.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return `
    <article class="community-card" data-status="${entry.status}">
      <div class="community-topbar">
        <span class="community-pill">${label}</span>
      </div>
      <h2>${entry.municipality}</h2>
      <p class="district">${entry.district || 'Local community'}</p>
      <p class="repo">Repo: <code>${entry.repo}</code></p>
      <p class="feed">Feed: <code>${entry.feedUrl || 'pending'}</code></p>
      <div class="community-actions">
        <a href="${siteUrl}" target="_blank" rel="noreferrer">Visit site</a>
      </div>
      <span class="status">${statusText}</span>
      <span class="slug">/${slug}</span>
    </article>
  `;
}).join('');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Countywide municipalities directory for the Cullman County community network.">
  <meta name="theme-color" content="#0a2a4a">
  <title>Community Directory | Cullman County</title>
  <style>
    :root {
      --navy: #0a2a4a;
      --blue: #0b4f8a;
      --sky: #8fd0ff;
      --ink: #101820;
      --muted: #46515e;
      --bg: #f4f8fb;
      --card: #ffffff;
      --line: #cfe0ee;
      --soft: #eaf5fd;
      --success: #245a3d;
      --warning: #7a4b11;
      --shadow: 0 18px 46px rgba(16, 24, 32, 0.08);
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.6;
    }
    a { color: var(--blue); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .wrap {
      width: min(1120px, calc(100% - 2rem));
      margin: 0 auto;
    }
    .site-header {
      background: var(--navy);
      color: #ffffff;
      padding: 1rem 0;
    }
    .site-header .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .site-header a {
      color: #ffffff;
      font-weight: 800;
      text-decoration: none;
    }
    .hero {
      background: linear-gradient(135deg, #0a2540 0%, #0b4f8a 100%);
      color: #ffffff;
      padding: 4rem 0 3rem;
    }
    .eyebrow {
      letter-spacing: 0.12em;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      color: #dbeef9;
      margin-bottom: 0.8rem;
    }
    h1 {
      font-size: clamp(2.25rem, 5vw, 3.5rem);
      line-height: 1.08;
      margin: 0 0 0.9rem;
    }
    .lead {
      max-width: 60rem;
      font-size: 1.08rem;
      color: #ebf5fd;
      margin: 0;
    }
    main {
      padding: 2rem 0 3rem;
    }
    .intro {
      margin: 0 0 1.5rem;
      color: var(--muted);
      max-width: 56rem;
    }
    .community-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .community-card {
      background: var(--card);
      border: 1px solid var(--line);
      border-top: 6px solid var(--navy);
      border-radius: 14px;
      box-shadow: var(--shadow);
      padding: 1rem 1rem 0.9rem;
      display: flex;
      flex-direction: column;
      min-height: 220px;
    }
    .community-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .community-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--soft);
      color: var(--blue);
      border: 1px solid var(--line);
      border-radius: 999px;
      font-weight: 800;
      font-size: 0.74rem;
      padding: 0.3rem 0.6rem;
    }
    .community-card h2 {
      margin: 0;
      font-size: 1.35rem;
    }
    .district {
      margin: 0.2rem 0 0.8rem;
      color: var(--muted);
      font-size: 0.92rem;
    }
    .community-card p {
      margin: 0.2rem 0;
      word-break: break-word;
      color: var(--ink);
    }
    .repo, .feed {
      font-size: 0.86rem;
      color: var(--muted);
    }
    .community-actions {
      margin-top: auto;
      padding-top: 0.9rem;
    }
    .community-actions a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 0.9rem;
      border-radius: 10px;
      background: var(--blue);
      color: #ffffff;
      font-weight: 700;
      text-decoration: none;
    }
    .status {
      display: inline-flex;
      margin-top: 0.7rem;
      align-self: flex-start;
      background: rgba(36, 90, 61, 0.08);
      color: var(--success);
      border-radius: 999px;
      padding: 0.2rem 0.55rem;
      font-size: 0.74rem;
      font-weight: 800;
    }
    .slug {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: var(--muted);
      letter-spacing: 0.04em;
    }
    .note {
      margin-top: 2rem;
      background: #fefefe;
      border: 1px solid var(--line);
      border-left: 6px solid var(--sky);
      border-radius: 12px;
      padding: 1rem 1.1rem;
      color: var(--ink);
    }
    .note strong {
      display: block;
      margin-bottom: 0.3rem;
    }
    footer {
      background: #0b1014;
      color: #edf4f9;
      padding: 1.5rem 0 2.5rem;
    }
    footer p {
      margin: 0;
    }
    footer a {
      color: #dfeeff;
    }
    @media (max-width: 640px) {
      .community-card { min-height: 200px; }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a href="index.html">Cullman County Entertainment &amp; Shopping</a>
      <a href="index.html">Mega hub home</a>
    </div>
  </header>

  <section class="hero">
    <div class="wrap">
      <div class="eyebrow">One county · 15 communities</div>
      <h1>Explore the municipal network</h1>
      <p class="lead">The countywide hub remains the main destination, while each town can have its own branded site. This directory lists the planned community websites and the feed model they will use to publish local stories.</p>
    </div>
  </section>

  <main>
    <div class="wrap">
      <p class="intro">This directory is intended to organize the network structure for the county and keep each municipality independent while the county site functions as the central aggregator and discovery layer.</p>
      <div class="community-grid">
        ${cards}
      </div>

      <div class="note">
        <strong>How the network works</strong>
        Each municipal site publishes a structured story feed. The county site validates the feed, filters stale or duplicate items, ranks the most relevant articles, and presents them with clear attribution to the original municipality and story source.
      </div>
    </div>
  </main>

  <footer>
    <div class="wrap">
      <p><a href="index.html">Return to the Cullman County hub</a></p>
    </div>
  </footer>
</body>
</html>`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log(`Generated ${outputPath} from ${networkPath}`);
