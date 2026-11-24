# Claude skills for this repo

## source-table

Fact-checks blog posts. Every factual claim gets a row with its source link, a verbatim supporting quote and a status (Proven / Uncertain / Not found). The table is shown in chat, not saved to the repo.

### How to use it

Claude picks the skill up on its own whenever you draft, edit, proofread or review a blog post. You can also ask for it directly:

- Drafting: "Draft a blog post about X based on these articles: <links>". Claude builds the source table first, settles open rows with you, then writes the post.
- Reviewing: "Source-check blog/which-layer-do-you-own.html" or "Review this draft" (paste the text).
- Explicitly: "Use the source-table skill on …"

When a source is paywalled or can't be opened, Claude marks the row Uncertain and asks you to paste the passage. Paste it, and the row is re-checked.

A post is ready when the last line says `Ready: N/N Proven`. Any other result lists the rows that still need work.

### Claude Code (terminal and claude.ai/code)

Nothing to do. The skill loads from `.claude/skills/` in this repo. Use a branch where this folder exists.

### Claude online (claude.ai and the desktop app)

1. Zip the skill folder. Run this from the repo root:
   `cd .claude/skills && zip -r source-table.zip source-table`
   The zip must contain the `source-table` folder with `SKILL.md` inside it.
2. On claude.ai, open Settings → Capabilities, and make sure "Code execution and file creation" is on.
3. In the Skills section, click "Upload skill" and select `source-table.zip`.
4. Make sure the skill's toggle is on.

To update it after `SKILL.md` changes, delete the old skill in Settings and upload a fresh zip.

For sources to be fetched automatically, web search must be enabled in the chat. Without it, Claude will ask you to paste the source text.
