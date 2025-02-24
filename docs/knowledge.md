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

   - Commit confirmation requirements
   - Branch naming conventions (feature/, fix/, refactor/, etc.)
   - Conventional Commits specification
   - Pull request templates and guidelines
   - Git workflow procedures
   - Security best practices

2. Commit Confirmation Process:

   ```bash
   # Stage changes
   git add .

   # Review staged changes
   git diff --staged

   # Get user confirmation for:
   # - Files being committed
   # - Commit message
   # - Any new files

   # Only after confirmation:
   git commit -m "type(scope): description"
   ```

3. Example usage:

   ```bash
   # Branch naming
   git checkout -b feature/new-feature-name

   # Commit message (after confirmation)
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

### Basic Layout and Navigation Setup

**Context**: Setting up the foundational layout and navigation structure for the modern Next.js website.

**Solution**: Created reusable layout components and implemented responsive navigation following modern web practices.

**Implementation**:

1. Created Navigation Component (`src/components/layout/Navbar.tsx`):

   - Responsive design with mobile menu
   - Smooth scroll to sections
   - Active link highlighting
   - External link handling (Resume)

   ```tsx
   const navLinks = [
     { href: "#about", label: "About" },
     { href: "#projects", label: "Work" },
     { href: "#contact", label: "Contact" },
     {
       href: "https://bit.ly/rohitcresume",
       label: "Resume",
       icon: <FaFilePdf />,
       external: true,
     },
   ];
   ```

2. Set up Root Layout (`src/app/layout.tsx`):

   - Meta tags and SEO configuration
   - Favicon setup
   - Google Fonts integration
   - Global navigation

   ```tsx
   export const metadata: Metadata = {
     title: "Rohit Choudhari (academia.edu)",
     description: "...",
     // ... other meta configurations
   };
   ```

3. Created Basic Page Structure:

   - Full-height sections
   - Responsive typography
   - Mobile-first approach
   - Semantic HTML structure

4. Asset Management:
   - Moved favicons to `public/assets/favicon/`
   - Set up proper asset paths
   - Maintained original branding

**References**:

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

**Date**: [Current Date]

### Website Modernization and Improvements

**Context**: Implementing various improvements to enhance the website's performance, accessibility, SEO, and user experience.

**Solution**: Added multiple features and optimizations across different aspects of the website.

**Implementation**:

1. Performance Optimizations:

   ```typescript
   // Font optimization in next.config.js
   experimental: {
     optimizePackageImports: ['@next/font'],
   }

   // Loading state component (src/app/loading.tsx)
   export default function Loading() {
     return (
       <div className="min-h-screen bg-rose-pine-base flex items-center justify-center">
         <div className="space-y-8 text-center">
           <div className="relative w-24 h-24 mx-auto">
             <div className="absolute inset-0 border-4 border-rose-pine-dawn-foam/20 dark:border-rose-pine-foam/20 rounded-full animate-pulse" />
             <div className="absolute inset-0 border-t-4 border-rose-pine-dawn-foam dark:border-rose-pine-foam rounded-full animate-spin" />
           </div>
           <p className="text-lg text-rose-pine-subtle animate-pulse">Loading...</p>
         </div>
       </div>
     );
   }
   ```

2. SEO Enhancements:

   ```plaintext
   # robots.txt configuration
   User-agent: *
   Allow: /

   Sitemap: https://rohitc.tech/sitemap.xml

   Disallow: /api/
   Disallow: /_next/
   ```

3. Security Headers:

   ```javascript
   // Security headers in next.config.js
   async headers() {
     return [
       {
         source: "/:path*",
         headers: [
           {
             key: "Strict-Transport-Security",
             value: "max-age=31536000; includeSubDomains",
           },
           {
             key: "Content-Security-Policy",
             value: "default-src 'self'; script-src 'self' 'unsafe-inline'...",
           },
           // Additional security headers...
         ],
       },
     ];
   }
   ```

4. Accessibility Features:

   ```typescript
   // Skip Link Component (src/components/SkipLink.tsx)
   export default function SkipLink() {
     return (
       <a
         href="#main"
         className="fixed top-4 left-4 -translate-y-full focus:translate-y-0 z-50..."
       >
         Skip to main content
       </a>
     );
   }
   ```

5. Error Handling:
   ```typescript
   // Custom Error Page (src/app/error.tsx)
   export default function Error({
     error,
     reset,
   }: {
     error: Error & { digest?: string };
     reset: () => void;
   }) {
     // Error UI implementation with retry functionality
   }
   ```

**Key Features Added**:

1. Loading States:

   - Animated loading spinner
   - Smooth transitions between pages
   - Loading feedback for user actions

2. Error Handling:

   - Custom error page with branded styling
   - Error retry functionality
   - Development mode error details
   - User-friendly error messages

3. Accessibility:

   - Skip link for keyboard navigation
   - Proper ARIA labels
   - Semantic HTML structure
   - Focus management

4. SEO:

   - Robots.txt configuration
   - Sitemap reference
   - Protected sensitive paths
   - Enhanced meta tags

5. Security:

   - Strict CSP headers
   - HSTS configuration
   - XSS protection
   - Frame protection
   - Content type enforcement

6. Performance:
   - Font optimization
   - Image optimization settings
   - Efficient loading strategies
   - Resource prioritization

**References**:

- [Next.js Documentation](https://nextjs.org/docs)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Google SEO Guidelines](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

**Date**: [Current Date]

## Styling Solutions

[To be populated as we implement styling solutions]

## Performance Optimizations

[To be populated as we implement performance optimizations]

## Troubleshooting

[To be populated as we encounter and solve issues]
