# Contributing to Velora

First of all, thank you for taking the time to contribute!  
Contributions of all kinds are welcome — code, documentation, ideas, or bug reports.

This document explains how to set up the project locally, how to work on changes, and the rules we follow to keep the project consistent and maintainable.

---

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** v18.20 or higher (LTS recommended)
- **Bun** (recommended), or npm / pnpm / yarn
- **Git**
- Linux, macOS, or Windows

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/armandwipangestu/velora.git
cd velora
````

### 2. Install dependencies

Using **Bun** (recommended):

```bash
bun install
```

### 3. Run the development server

```bash
bun run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Project Structure

Here are the most important directories you will interact with when contributing:

```txt
root
├── app/               # Next.js App Router
├── components/        # Shared UI components
├── content/           # MDX content (blog posts, examples)
├── docs/              # Documentation source
├── velite/            # Velite collections, plugins configuration
├── velite.config.ts   # Velite content pipeline configuration
├── release.config.cjs # semantic-release configuration
└── package.json
```

### Common Contribution Areas

* **Content changes** → `content/`
* **UI / theme changes** → `components/` or `app/`
* **Collection / Plugins changes**  → `velite/`
* **Docs** → `docs/` or `README.md`
* **Tooling / CI** → `.github/`

---

## Available Scripts

Frequently used commands during development:

```bash
# Start development server
bun run dev

# Run linter
bun run lint

# Build content + Next.js app
bun run build

# Build content pipeline only
bun run build:content
```

Make sure linting and build pass before opening a Pull Request.

---

## Commit Message Convention

This project uses **Conventional Commits** and is fully automated with **semantic-release**.

Correct commit messages are critical, as they determine **versioning and changelog generation**.

### Commit Format

```
<type>(optional scope): <description>
```

### Allowed Types

| Type     | Release    |
| -------- | ---------- |
| feat     | Minor      |
| fix      | Patch      |
| hotfix   | Patch      |
| refactor | Patch      |
| perf     | Patch      |
| chore    | Patch      |
| revert   | Patch      |
| patch    | Patch      |
| docs     | No release |
| style    | No release |
| test     | No release |
| ci       | No release |

### Breaking Changes

Breaking changes **must** trigger a major release.

You can indicate a breaking change by:

* Adding `!` after the type
* Or using `BREAKING CHANGE:` in the commit body

#### Example

```text
feat!: change MDX pipeline API

BREAKING CHANGE: the content loader API has changed.
```

---

## Pull Request Guidelines

Before submitting a Pull Request, please ensure that:

* The project builds successfully
* `bun run lint` passes
* Your commits follow the commit message convention
* The PR is focused and scoped (avoid unrelated changes)

When applicable:

* Update or add documentation
* Reference related issues (e.g. `Closes #123`)

---

## Issues & Discussions

* **Bug reports** and **feature requests** should use the provided issue templates
* **Questions or usage help** should go to **GitHub Discussions**

[https://github.com/armandwipangestu/velora/discussions](https://github.com/armandwipangestu/velora/discussions)

---

## Code of Conduct

By participating in this project, you agree to act respectfully and professionally.

Please be kind and constructive — we're all here to build something great together

---

Thank you again for contributing to **Velora**
