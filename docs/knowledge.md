# Project Knowledge Base

This file serves as a central repository for project knowledge, learnings, and best practices.

## Table of Contents

1. [Development Practices](#development-practices)
2. [Styling Solutions](#styling-solutions)
3. [Performance Optimizations](#performance-optimizations)
4. [Troubleshooting](#troubleshooting)

## Development Practices

### Project Setup: Next.js Modern Website Migration

**Context**: Modernizing personal website by migrating to Next.js with updated development practices.

**Solution**: Set up proper development environment with:

- Cursor rules for consistent development practices
- Knowledge management system for tracking learnings
- Branch-based development workflow

**Implementation**:

1. Created and pushed feature branch:

   ```bash
   git checkout -b feature/nextjs-modern
   git push -u origin feature/nextjs-modern
   ```

2. Established Cursor rules in `.cursor/rules/`:

   - `nextjs-development.mdc`: Next.js development standards
   - `styling-standards.mdc`: CSS and styling guidelines
   - `knowledge-management.mdc`: Documentation practices
   - `git-standards.mdc`: Version control practices
   - `rules-location.mdc`: Standards for organizing rule files

3. Set up knowledge management system:
   - Created `docs/knowledge.md` for centralized documentation
   - Implemented structured format for knowledge entries
   - Established guidelines for maintaining documentation

**References**:

- [Next.js Documentation](https://nextjs.org/docs)
- Project Cursor rules in `.cursor/rules/`
- [GitHub Repository](https://github.com/InfernapeXavier/InfernapeXavier.github.io)

**Date**: [Current Date]

### Cursor Rules Organization

**Context**: Need for consistent organization and placement of Cursor rule files across the project.

**Solution**: Implemented standards for rule file organization following the `rules-location.mdc` specifications.

**Implementation**:

1. Directory Structure:

   ```
   PROJECT_ROOT/
   ├── .cursor/
   │   └── rules/
   │       ├── git-standards.mdc
   │       ├── knowledge-management.mdc
   │       ├── nextjs-development.mdc
   │       ├── rules-location.mdc
   │       └── styling-standards.mdc
   └── ...
   ```

2. Naming Conventions:

   - Use kebab-case for all filenames
   - Always use `.mdc` extension
   - Names clearly describe rule purpose

3. File Organization:

   - All rule files placed in `.cursor/rules/`
   - No rule files in project root or other directories
   - Each rule file follows MDC format with frontmatter

**References**:

- Project rule standards in `.cursor/rules/rules-location.mdc`

**Date**: [Current Date]

### Git Standards Implementation

**Context**: Need for consistent Git practices across the project to maintain clean version control and effective collaboration.

**Solution**: Implemented comprehensive Git standards covering branch naming, commit messages, workflows, and security practices.

**Implementation**:

1. Created `.cursor/rules/git-standards.mdc` with:

   - Branch naming conventions (feature/, fix/, refactor/, etc.)
   - Conventional Commits specification
   - Pull request templates and guidelines
   - Git workflow procedures
   - Security best practices

2. Example usage:

   ```bash
   # Branch naming
   git checkout -b feature/new-feature-name

   # Commit message
   git commit -m "feat(component): add new feature description

   - Detailed change 1
   - Detailed change 2

   Closes #123"
   ```

**References**:

- [Conventional Commits](https://www.conventionalcommits.org/)
- Project Git standards in `.cursor/rules/git-standards.mdc`

**Date**: [Current Date]

### Next.js Project Setup

**Context**: Setting up a modern Next.js project structure while preserving the existing site content.

**Solution**: Created a new Next.js project with TypeScript, Tailwind CSS, and modern features while keeping a backup of the original site.

**Implementation**:

1. Backed up existing site:

   ```bash
   mkdir -p _backup
   cp -r assets index.html robots.txt sitemap.xml 404.html _backup/
   ```

2. Set up Next.js project:

   - Created temporary directory due to npm naming restrictions
   - Used create-next-app with modern features:
     ```bash
     npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-yarn
     ```
   - Features enabled:
     - TypeScript for type safety
     - Tailwind CSS for styling
     - App Router for modern routing
     - src directory for better organization
     - ESLint for code quality
     - Import aliases for cleaner imports

3. Project Structure:
   ```
   PROJECT_ROOT/
   ├── src/
   │   ├── app/
   │   │   ├── layout.tsx
   │   │   └── page.tsx
   │   ├── components/
   │   └── styles/
   ├── public/
   │   └── assets/
   ├── _backup/
   │   └── [original site files]
   └── docs/
       └── knowledge.md
   ```

**References**:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

**Date**: [Current Date]

## Styling Solutions

[To be populated as we implement styling solutions]

## Performance Optimizations

[To be populated as we implement performance optimizations]

## Troubleshooting

[To be populated as we encounter and solve issues]
