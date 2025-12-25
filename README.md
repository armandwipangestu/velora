<h1 align="center">A developer-first MDX blog template powered by Velite</h1>

<div align="center">

![Next.js](https://img.shields.io/badge/-Next.js-131821?style=for-the-badge&logo=next.js)&nbsp;
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-131821?style=for-the-badge&logo=tailwindcss)&nbsp;
![Shadcn UI](https://img.shields.io/badge/-ShadcnUI-131821?style=for-the-badge&logo=shadcnui)&nbsp;
![MDX](https://img.shields.io/badge/-MDX-131821?style=for-the-badge&logo=mdx)&nbsp;
![Velite.js](https://img.shields.io/badge/-velite.js-131821?style=for-the-badge&logo=velite.js)&nbsp;
![Docker](https://img.shields.io/badge/-Docker-131821?style=for-the-badge&logo=docker)&nbsp;

</div>

<p align="center">
 <img src="docs/img/preview.png" width="400">
</p>

## Description

A type-safe, very rich code block feature (using Shiki & Rehype), dynamic open graph image, and more, a demo can be seen [here](https://velora-example.vercel.app/).

<picture>
  <source srcset="https://velite.js.org/assets/flow-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="https://velite.js.org/assets/flow.svg" alt="Velite Workflow" title="Velite Workflow">
</picture>

## Features

- MDX Components
- Shadcn UI
- Pagination
- Dynamic Open Graph Image
- Very Rich Code Block Feature
  - Syntax Highlighting using Shiki and Rehype
    - Line Numbers
    - Line Highlighting
    - Word Highlighting
    - ANSI Highlighting
    - Word Group Highlighting (based on id `#v` for variable, `#s` for state, `#i` for identifier)
    - Inline Diff Highlighting
    - Focused and Unfocused Lines
    - Error and Warning Highlighting
    - Inline Code with Language
    - Nested Code Block
  - Title Bar
  - Copy Button
  - Custom Font with Ligatures Support
  - Custom Language Icon
- Docker Support
- Velite Integration for Content Pipeline
- Giscus Integration for Discussion Section

## Running the Application

- Using bun

```bash
git clone https://github.com/armandwipangestu/velora.git

cd velora

bun install

bun run dev
```

- Using docker

```bash
docker run --rm -p 3000:3000 ghcr.io/armandwipangestu/velora:latest
```

## Roadmap

The following are the features I want to achieve or are under development:

- [ ✅ ] Add some style type like github to callout component (`note`, `tip`, `important`, `warning`, `caution`)
- [ ✅ ] Light / Dark mode theme in code block
- [ ✅ ] Remove backtick in inline code
- [ ✅ ] Adjust background line and word highlight in code block
- [ ✅ ] Add multiple word highlighting based on char ids `#v` (variable/value) , `#s` (state/stateful) , `#i` (import/identifier)
- [ ✅ ] Add title bar (language icon, copy button, etc) in code block
- [ ✅ ] Make some logic to override language icon using `icon="..."` meta string
- [ ✅ ] Custom font for code block using `font="..."` meta string
- [ ✅ ] Disable ligature for code block using `fontLigatures=false` meta string
- [ ✅ ] Inline code (without specific language) with custom background color
- [ ✅ ] Add umami analytics
- [ ✅ ] Add vercel analytics
- [ ✅ ] Rehype transformers for diff notation
- [ ✅ ] Add code block focus
- [ ✅ ] Add code block error and warning
- [ ✅ ] Add giscus components for discussion section
- [ ✅ ] Code block group components
- [ ] Wrap code block content
- [ ] Add preview rendered code block

See the [open issues](https://github.com/armandwipangestu/velora/issues) for a list of proposed features (and known issues).

## Credits

Much of the design of this project is taken from shadcn in his projects, such as [shadcn/ui](https://ui.shadcn.com/) and [Taxonomy](https://tx.shadcn.com/).

Another credit goes to [Jolly Coding](https://youtu.be/tSI98g3PDyE?si=bqgUHaJsqzyCJorx) with this repository [here](https://github.com/jolbol1/nextjs-velite-blog-template).