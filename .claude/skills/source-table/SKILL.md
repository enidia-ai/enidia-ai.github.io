---
name: source-table
description: Builds a verified source table for Enidia blog posts, mapping every factual claim to a source link and a verbatim supporting quote. Use whenever drafting, writing, editing, proofreading or reviewing a blog article (files in blog/ or any article text meant for the Enidia blog), especially one based on news, media articles, announcements, posts or statistics, and whenever the user asks to fact-check, source-check or verify an article.
---

# Source table for blog posts

Enidia sells verifiable answers: every claim tied to a verbatim source. The blog must meet the same standard. Every factual claim in a post gets a row in a source table with the exact quote that supports it.

## The table

Output it in chat as a Markdown table, never as a file in the repo:

| # | Claim | Source | Exact citation | Status |
|---|---|---|---|---|
| 1 | A&O Shearman committed USD 1.1bn to AI | [A&O Shearman accelerates AI strategy…](https://www.aoshearman.com/…) | "…" | Proven |

- **#**: running number, so rows can be referenced ("fix #4").
- **Claim**: the claim exactly as worded in the post (or a tight excerpt of the sentence).
- **Source**: publisher + page title as a Markdown link to the exact URL, plus the publication date if shown.
- **Exact citation**: verbatim text from the source that supports the claim. Non-English quotes stay in the original language with an English translation in brackets.
- **Status**:
  - **Proven**: the citation fully supports the claim as worded.
  - **Uncertain**: partial support, wording drift (source says "over 3,000", post says "3,400"), a source that could not be read, or a secondary source reporting someone else's claim.
  - **Not found**: no source supports it.

Below the table, list every non-Proven row with a concrete fix: re-source, reword to match the source, soften, or cut.

## What counts as a claim

Include every checkable statement: numbers, amounts, percentages, dates, names, job titles, roles, organisations, events, product launches, direct quotes, attributions ("X announced", "according to Y") and superlatives or firsts ("largest", "first").

A derived claim (a sum, a ratio, "doubled", "three weeks later") gets its own row. In the citation column write `Derived from #2, #5` and show the calculation. Its status is the weakest status among its inputs.

Leave out:
- opinion, argument and interpretation that is clearly the author's own;
- claims about Enidia itself (product features, pricing, verification statuses, certificates).

If a sentence mixes fact and opinion, extract only the factual part.

## Hard rules for citations

1. Quote only from a page fetched or a document read in this session. Never quote from memory, and never reconstruct or "tidy" a quote. Ellipses are allowed only to drop irrelevant text, never to join sentences so they say something the source does not.
2. Prefer the primary source (the company announcement, the court ruling, the official statistic) over media coverage. If only secondary coverage is available, link it and mark the row Uncertain unless the secondary source is itself the claim ("The Legal Wire reported…").
3. If a page cannot be fetched (paywall, blocked, no web access in this environment), do not guess. Mark the row Uncertain, write `Not accessible` in the citation column and ask the user to paste the relevant passage. Once pasted, quote from it and note `(text supplied by user)`.
4. If the source disagrees with the post, the post is wrong until proven otherwise. Mark the row Uncertain or Not found and propose wording that matches the source.
5. Use the URL of the exact page the quote comes from, not a homepage or search result.

## Mode A: drafting a new post (source-first)

1. **Gather**: from the user's brief and materials, collect the facts the post will rely on. Fetch each source and build the table first, before writing prose.
2. **Confirm**: show the table. Flag anything Uncertain or Not found and resolve it with the user (paste text, find another source, or drop the fact).
3. **Write**: draft the post using only facts that have a row. Keep numbers, dates and names exactly as in the citation. Any new fact that comes up while writing gets a row before it goes into the text.
4. **Final check**: re-read the finished draft, extract the claims again and re-output the full table with row numbers matching the final text. Wording usually drifts during writing, so catch that here.
5. **Footer**: make sure the post's `Sources:` paragraph lists every source used in the table (publisher, linked date or title) and nothing that is not in the table.

## Mode B: reviewing or editing an existing post

1. Read the post and extract every claim in order of appearance.
2. Fetch every linked source, plus any obvious primary source that is not linked.
3. Output the table and the fix list.
4. Check that the `Sources:` footer matches the table: no missing sources, no unused ones, and the links match.
5. When making edits (proofreading, restyling), re-check any row whose sentence changed. Polishing must not change a number, date, name or attribution.

## Ready to publish

A post is ready only when every row is Proven or the user has explicitly accepted an Uncertain row. State this verdict on one line at the end, e.g. `Ready: 14/14 Proven` or `Not ready: #3 Uncertain, #7 Not found`.
