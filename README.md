# Pruden Jack Gideon

Personal portfolio website for Pruden Jack Gideon — showcasing software, AI, web development, projects, and digital work.

## About

This is a professional, scalable portfolio foundation built with modern web technologies. The site is under active development and will reach v1.0 public launch on **December 12, 2026**.

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── assets/              # Images, fonts, documents
├── components/
│   ├── layout/         # Navbar, Footer, PageContainer
│   └── ui/            # Reusable UI components
├── sections/          # Page sections (Hero, About, Skills, etc.)
├── data/              # Typed content data files
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```
VITE_SITE_URL=https://prudenackgideon.dev
VITE_CONTACT_EMAIL=contact@prudenackgideon.dev
```

## Content Management

Content is managed through typed data files in `src/data/`:

- **personal.ts** — Personal information and bio
- **socialLinks.ts** — Social media and contact links
- **skills.ts** — Technical skills and proficiencies
- **projects.ts** — Project showcase data
- **services.ts** — Services offered
- **experience.ts** — Timeline of education and experience

Add or update content by editing these data files. No need to modify components.

## Deployment

The project is ready for deployment to any modern hosting platform:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Custom servers**

## Roadmap

This is a living portfolio project with the following planned enhancements:

- [x] Project foundation and architecture
- [ ] Complete content and case studies
- [ ] Profile images and project gallery
- [ ] Dark mode
- [ ] Blog section
- [ ] Contact form backend
- [ ] Analytics
- [ ] Project detail pages
- [ ] SEO optimization and sitemap
- [ ] Custom domain
- [ ] Additional animations and interactions
- [ ] Performance optimization
- [ ] v1.0 public launch (December 12, 2026)

## Design Principles

- **Minimal and clean** — Focus on content and clarity
- **Professional** — Premium, modern aesthetic
- **Responsive** — Mobile-first approach
- **Accessible** — WCAG compliance, keyboard navigation
- **Performance** — Fast load times, optimized assets
- **Scalable** — Easy to add new projects and content

## Development Notes

### Component Architecture

All reusable UI components are in `src/components/ui/`. Section components use these building blocks and pull data from `src/data/`.

### Styling

The site uses Tailwind CSS with a custom color palette:
- **Background**: `#f7f6f2` (off-white)
- **Text**: `#20201e` (deep charcoal)
- **Accent**: Purple (`#9333ea` and variants)

### Animation Guidelines

Animations use Framer Motion. Always:
- Respect `prefers-reduced-motion` media query
- Keep animations subtle and purposeful
- Prioritize performance over visual effects
- Test on mobile devices

## Contributing / Development

This is an actively developed project. Guidelines for future contributors:

1. Follow the existing folder structure
2. Use TypeScript for all new code
3. Create reusable components in `src/components/`
4. Keep styles in Tailwind CSS
5. Add types to `src/types/index.ts`
6. Use semantic HTML
7. Ensure accessibility compliance
8. Test responsive behavior

## License

© 2026 Pruden Jack Gideon. All rights reserved.

## Contact

For inquiries, please reach out via:
- Email: [Add email in personal.ts]
- GitHub: [Add GitHub URL in socialLinks.ts]
- LinkedIn: [Add LinkedIn URL in socialLinks.ts]

---

**Status**: v0.1.0 (Foundation) → v1.0 launching December 12, 2026

- [x] Responsive portfolio shell
- [x] Hero, About, Skills, Projects, Contact sections
- [ ] Personal content and real project case studies
- [ ] Motion and interaction system
- [ ] Accessibility and performance pass
- [ ] SEO and social metadata
- [ ] Deployment
