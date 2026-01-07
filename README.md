# SaaS Boiler Plate

## Stacks

### Shadcn UI

- Next.js
- TypeScript
- Lucide Icons
- TailwindCSS

### Additional

- Theme (npm install next-themes)
- Tanstack React Query + Devtools (npm install @tanstack/react-query @tanstack/react-query-devtools)
- Supabase (npm install @supabase/supabase-js @supabase/ssr)
- Drizzle (npm install drizzle-orm postgres, npm install -D drizzle-kit)
- Stripe (npm install stripe)

## Getting Started

1. Create new project in Supabase
2. Set env variables in .env.local file

```bash
# supabase
# Connect on navbar -> App Frameworks
NEXT_PUBLIC_SUPABASE_URL=
# Project Settings -> API Keys -> Legacy anon, service_role API keys
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OAuth provider
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Go to Google Cloud Console -> APIs & Services -> Credentials -> Create Credentials -> OAuth Client ID -> Application type: Web Application -> Add Authorized redirects URIs: your app's domain, URLs: from supabase after enable oauth
# Go to Supabase Dashboard → Authentication → Providers → Google -> Type Client ID / Client Secret -> Enable and save
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# drizzle
DATABASE_URL=
DATABASE_PASSWORD=

# etc
NODE_ENV=development
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

3. Push schema to database
```bash
npm run db:push
```