# Site restructure for search

Status: built on branch `site-restructure-for-search` (12 November 2026). New pages are
made by copying an existing topic page; keep the FAQ structured data identical to the
visible FAQ text, and add the page to `sitemap.xml`.

Plan agreed on 12 November 2026 between Adam and Claude. Tomer has not confirmed it yet.

## Goal

A prospect who googles one of the pain points in `knowledge-share/plans/product-strategy.md`
should land on a page of enidia.ai that names that pain in its title and first paragraph.
Google ranks pages, not sections, so each pain or audience that matches a real query gets
its own URL.

## Where the site stands

- One home page of about 5,800 words in 11 sections, plus three blog posts, the
  Verification Standard, privacy, media. Research, contact and process are retired stubs.
- The nav has nine items, eight of them anchors into the home page. On mobile only Blog and
  Book a demo remain; there is no hamburger.
- The content already covers most of the strategy's pain points. What is missing: the
  small-firm pricing angle, the CSSF deadline peak and the auditor, large-firm data
  sovereignty as its own message, banks (not yet known, as the strategy says).
- The blog posts carry canonical, Open Graph and Article JSON-LD. The home page carries
  none of that. There is no sitemap or robots.txt.

## The split

Not a rewrite. Each section that matches a search query becomes its own page, with more
depth than the home page has room for. The home page keeps a short version of every
section with a link, so it still scrolls through the whole story.

| Page | Built from | Query it targets |
|---|---|---|
| Home | Hero, trust bar, three audience doors, films, proof | brand, verification-first legal AI |
| `/product/` | Workflows, Found / Inferred / Absent, certificate, Watch / Try / Own | checklist automation from documents |
| `/on-premise-legal-ai/` | The eight on-premise cards, two ways to pay, Deploy film | on-premise legal AI, self-hosted legal AI |
| `/for-law-firms/` | LPA closing film, due diligence, closing review | legal AI for law firms Luxembourg |
| `/for-funds/` | CSSF film, regulatory questionnaires, new copy on the peak and the auditor | CSSF self-assessment questionnaire |
| `/for-in-house-and-compliance/` | DORA film, contract compliance review | DORA Article 30 contract review |
| `/pricing/` | Two ways to pay, EUR 5,000 machine, calculator, pricing as it is today | legal AI pricing, flat fee |
| `/legal-ai-for-small-law-firms/` | New, from the strategy's A1 line | legal AI small law firm |
| `/why-not-a-general-legal-ai/` | The existing section | general legal AI limits |
| `/about/` | New, see below | company, founders, press |
| Blog | As is, plus a hallucination case tracker | informational queries |

Nav becomes: Product, Who it's for (three), On-premise, Pricing, About, Blog, Book a demo.
It must work on mobile.

First three pages: on-premise, funds, product.
Pricing stays as it is today for small and large firms alike; the pricing and small-firm
pages present the current model and do not introduce new numbers.

## About page

Tells the history in order, so the old press earns credibility instead of raising questions:

1. Who builds it: the three founders, one line each, photos from the blog.
2. Where it comes from: the university lab, the two FNR grants, the LexisNexis award, and
   the research papers (Smywiński-Pohl and Libal 2024; Kaczmarczyk, Libal and
   Smywiński-Pohl 2024; Libal 2023; Libal and Smywiński-Pohl 2023; the Verification
   Standard). Publisher links to be looked up and confirmed.
3. What it became: the Global 10 deployment, the Eurostart award.
4. In the press: the items from `media.html`, curated, newest first, the autonomous cars
   piece last or dropped. `media.html` is folded in and redirected.

Linked from the nav, the footer, and a "read the story" link under the proof section.

## Methods

- **No Jekyll.** Pages are plain HTML, built by copying the blog post head pattern. The
  sitemap is written by hand.
- **Structured data** in the head of each page: Organization on the home page (founders,
  awards, press links), SoftwareApplication on the product page, FAQPage on each pain
  page. The visible FAQ text and the block must match.
- **Query-shaped headings.** The H1 and first paragraph say what the person types. The
  slogan stays as the subtitle. The first paragraph answers before Enidia is mentioned.
- **Luxembourg** in the title and first paragraph of the funds and law-firm pages and in
  the address. Not on the on-premise or DORA pages, which are European. English only.
- **Deferred:** Google Search Console, Google Business Profile, directory listings, French
  pages. Search Console should be added the day the pages go live, so results can be read.

## Rules for the copy

- Only claims marked Proved or Sourced in the strategy go on the site. Internal or assumed
  figures stay off.
- Nothing from the strategy's "Future" list is presented as available.
- Each page has one demo button in the same place with the same wording.
