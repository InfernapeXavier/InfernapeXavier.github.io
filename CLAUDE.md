# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `yarn dev` (Next.js dev server on localhost:3000)
- **Build for production**: `yarn build`
- **Start production server**: `yarn start`
- **Lint code**: `yarn lint` (ESLint with Next.js config)
- **Format code**: `yarn format` (Prettier formatting)
- **Prepare git hooks**: `yarn prepare` (Husky setup)

## Architecture Overview

This is a personal portfolio website built with Next.js 14+ using the App Router architecture. The codebase follows a modern React/Next.js structure:

### Core Architecture

- **Framework**: Next.js 14+ with App Router (`src/app/`)
- **Styling**: Tailwind CSS with custom theme support
- **Fonts**: Google Fonts (Outfit + JetBrains Mono) with optimized loading
- **Theme**: Custom dark/light theme system with localStorage persistence and reduced motion support
- **Typography**: Optimized font loading with fallbacks and display swap

### Key Components

- **ThemeProvider** (`src/contexts/ThemeContext.tsx`): Global theme state management with dark mode default, system preference detection, and reduced motion support
- **Layout system**: Root layout with comprehensive SEO metadata, structured data, and accessibility features
- **Navigation**: Responsive navbar component with theme switching
- **Project showcase**: Component-based project cards with image optimization

### Special Features

- **Security**: Custom IP validation utilities (`src/utils/ipValidation.ts`) to replace vulnerable dependencies
- **SEO**: Comprehensive metadata, Open Graph, Twitter cards, and JSON-LD structured data
- **Performance**: Optimized font loading, image caching headers via Vercel config
- **Accessibility**: Skip links, proper ARIA labels, keyboard navigation support

### File Organization

- `src/app/`: Next.js App Router pages and layouts
- `src/components/`: Reusable React components
- `src/contexts/`: React context providers
- `src/data/`: Static data and configuration
- `src/hooks/`: Custom React hooks
- `src/utils/`: Utility functions and helpers

### Development Standards

Import order (from .cursor/rules):

1. React imports
2. Next.js imports
3. Component imports (@/components/\*)
4. Library imports (@/lib/\*)
5. Style imports (@/styles/\*)
6. Other internal imports (@/\*)
7. Relative imports

### Git Workflow

- Uses Husky for pre-commit hooks with lint-staged
- Follows conventional commit format
- Branch naming: `feature/`, `fix/`, `refactor/`, `docs/`, `style/`, `perf/`
- Automated formatting and linting on commit

### Security Headers

Configured in `vercel.json`:

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Long-term caching for static assets

### Deployment

- **Platform**: Vercel with automatic deployments
- **Domain**: rohitc.tech
- **Build**: Standard Next.js build process
- **Assets**: Optimized with long-term caching headers
