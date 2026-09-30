# PRUDEN JACK GIDEON

Personal portfolio for **Pruden Jack Gideon** — an ICT student, software developer, and AI builder creating software, AI experiments, and digital products from Kenya.

## Current build

The public portfolio has been upgraded into a cinematic, dark technology-style experience with:

- Responsive navigation with active-section state
- Hero, About, Skills, Projects, Services, Experience, CV, and Contact sections
- Featured project cards linked to real GitHub repositories
- Framer Motion reveal animations with reduced-motion support
- Responsive mobile navigation
- SEO, Open Graph, Twitter metadata, and canonical URL
- Accessible focus states and semantic structure
- Typed content architecture for future owner-dashboard editing
- Owner dashboard foundation for future secure server-backed editing

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Run locally

~~~bash
npm install
npm run dev
~~~

Production build:

~~~bash
npm run build
~~~

## Content architecture

Public content is separated into typed data files under src/data/:

- personal.ts
- socialLinks.ts
- skills.ts
- projects.ts
- services.ts
- experience.ts

This keeps the presentation layer reusable and makes the site ready for a future authenticated content-management workflow.

## Owner dashboard

The repository includes an owner-dashboard foundation with navigation for:

- Profile / About
- Projects
- Skills
- Services
- Experience
- Education
- Achievements
- Media
- CV / Documents
- Social & Contact
- Site settings
- Preview

The dashboard UI is intentionally not pretending to have secure persistence yet. The remaining production step is connecting it to a real server-side authentication, authorization, database, and private media-storage implementation.

## Deployment

The app is a standard Vite SPA and can be deployed to Render, Vercel, Netlify, or another static frontend host.

## Launch target

The long-term v1.0 public launch target is **December 12, 2026**.

## License

© 2026 Pruden Jack Gideon. All rights reserved.
