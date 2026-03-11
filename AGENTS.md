# AGENTS.md - Elart.nl Development Guide

This file provides guidelines and commands for agentic coding agents working on the Elart.nl recipe website project.

## Project Overview

Elart.nl is a recipe website built with Payload CMS (MongoDB) and Next.js 15 (App Router). It features recipe management, page building, SEO, and search functionality.

## Build / Lint / Type Commands

```bash
# Development
pnpm dev              # Start development server on localhost:3000
pnpm build            # Build for production (with next-sitemap)
pnpm start            # Start production server

# Linting
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix

# Type generation
pnpm generate:types   # Generate Payload types
pnpm generate:importmap  # Generate admin panel import map

# Other
pnpm payload <cmd>    # Run Payload CLI commands
```

Note: There are currently no tests in this project.

## Code Style Guidelines

### Formatting (Prettier)

- **Single quotes** for strings, **Trailing commas** everywhere, **Print width**: 100, **Semicolons**: false
- Run `pnpm lint:fix` to auto-format

### TypeScript

- **Strict mode**, **noUncheckedIndexedAccess**, **noImplicitOverride**, **strictNullChecks** all enabled
- Avoid `any` - use `unknown` if necessary

### ESLint Rules

- `@typescript-eslint/ban-ts-comment`: warn
- `@typescript-eslint/no-empty-object-type`: warn
- `@typescript-eslint/no-explicit-any`: warn
- `@typescript-eslint/no-unused-vars`: warn - prefix unused with `_` (e.g., `_unusedVar`, `function foo(_arg)`)

### Imports & Path Aliases

Use path aliases:

```typescript
import { Something } from '@/components/Something' // src/*
import config from '@payload-config'
import type { FC } from 'react'
```

Import order: 1) Built-in/External type, 2) Payload/Plugin, 3) Local access/utility, 4) Block/component, 5) Field

### Naming Conventions

- **Collections/Components**: PascalCase (e.g., `Recipes`, `BannerBlock`)
- **Hooks**: camelCase with `use` prefix (e.g., `useDebounce`)
- **Utilities**: camelCase (e.g., `deepMerge`)
- **Files**: kebab-case general, PascalCase components/collections

### React Components

If using React hooks (useState, useRef, useEffect, etc.), add `"use client"` at the top of the file.

```typescript
"use client"

import type { FC } from 'react'
import { cn } from '@/utilities/ui'

type Props = { className?: string } & SomePayloadType

export const MyComponent: FC<Props> = ({ className, ...props }) => {
  return <div className={cn('base-classes', className)}>...</div>
}
```

### Payload CMS Patterns

- **Collections**: `src/collections/<Name>/index.ts`
- **Globals**: `src/<Name>/config.ts`
- **Blocks**: config in `src/blocks/<Name>/config.ts`, render in `src/blocks/<Name>/Component.tsx`
- **Fields**: `src/fields/`
- **Access Control**: `src/access/`
- **Hooks**: `src/hooks/` and `src/collections/<Name>/hooks/`

### Error Handling

- Use `payload.logger.info/error` for logging
- For hooks, return `doc` at the end
- Use optional chaining: `const slug = typeof data?.slug === 'string' ? data.slug : ''`

### Tailwind CSS

- Use `@/utilities/ui` for `cn()` utility (clsx + tailwind-merge)
- Pattern: `className={cn('base-classes', { conditional: condition })}`

### Git & Version Control

- Do NOT commit `.env` files or secrets
- Use `.env.example` for required environment variables

## File Organization

```
src/
├── access/           # Access control functions
├── blocks/           # Layout blocks (config + Component)
├── collections/      # Payload collections
│   └── <Name>/
│       ├── index.ts  # Collection config
│       └── hooks/    # Collection-specific hooks
├── components/       # React components
├── fields/           # Custom field types
├── Footer/           # Global config
├── Header/           # Global config
├── heros/            # Hero components
├── hooks/            # Custom React hooks
├── payload.config.ts # Main Payload config
├── payload-types.ts  # Generated types
└── utilities/        # Utility functions
```

## Common Development Tasks

```bash
pnpm reinstall     # Reset and reinstall
pnpm dev:prod       # Start in production mode locally
pnpm generate:types  # Generate types after schema changes
```

## Environment Variables

- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Secret for Payload
- `VERCEL_BLOB_READ_WRITE_TOKEN` - For media storage (optional in dev)
