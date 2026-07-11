# AkkerDigital Agent Instructions

## Project
AkkerDigital is a professional digital agency website with a backend-first architecture.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase PostgreSQL
- Drizzle ORM
- Zod
- React Hook Form

## Priorities
1. Keep the backend clean and understandable.
2. Prefer simple, explicit code over clever abstractions.
3. Never expose secrets in frontend code.
4. Never use Supabase service_role keys in client components.
5. Keep UI professional, minimal, and easy to customize.
6. Do not overbuild before the MVP works.

## MVP
- Public website
- Contact form
- Leads table
- Admin dashboard
- Projects/case studies from database
- Basic auth
- Later: ROI calculator and Wolfram integration

## Rules for AI agents
- Make small changes.
- Do not rewrite unrelated files.
- Explain changed files after each task.
- Run lint/typecheck when possible.
- Never create or expose secrets.
