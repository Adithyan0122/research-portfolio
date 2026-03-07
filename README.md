# V2G-RAG — Personal Portfolio

A dark researcher's lab portfolio built with Next.js 14 (App Router), custom CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # Production build (Vercel-ready)
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy
4. Done. Zero config needed.

## How to Add a New Series

1. Open `src/data/projects.js`
2. Add a new object to the `seriesData` array:

```js
{
  slug: "agents",
  title: "AI Agents",
  description: "Building autonomous agents...",
  versions: [
    {
      version: "v0.1",
      subtitle: "Hello Agent",
      status: "completed",     // "completed" | "in-progress" | "locked"
      whatChanged: "Basic ReAct loop",
      whatYouPublish: "...",
      keyInsight: "...",
      githubUrl: "",
      pdfPath: "/pdfs/agents/v0.1.pdf",
      codeSnippet: "",
      result: ""
    }
  ]
}
```

3. The card appears automatically on the homepage, and `/series/agents` is auto-routed.

## How to Add a PDF

1. Place the PDF in `public/pdfs/<series>/<version>.pdf`
   - Example: `public/pdfs/rag/v0.1.pdf`
2. Set `pdfPath` in `projects.js` to `/pdfs/rag/v0.1.pdf`
3. The Math tab in the modal will embed it automatically

## How to Mark a Version Complete

In `src/data/projects.js`, change the version's `status`:

```js
status: "locked"       → Not clickable, greyed out
status: "in-progress"  → Pulsing teal outline, clickable
status: "completed"    → Glowing amber, fully clickable
```

## Customization

- **Your info**: Edit `siteConfig` and `aboutData` in `src/data/projects.js`
- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Fonts**: Change the Google Fonts import in `globals.css`

## Tech Stack

- Next.js 14 (App Router)
- Custom CSS (no Tailwind, no MUI, no shadcn)
- Framer Motion
- Google Fonts: Space Grotesk + JetBrains Mono
