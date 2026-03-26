#!/bin/bash
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  CHEEZIOUS — Deploy to GitHub + Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Check prerequisites
command -v gh    >/dev/null 2>&1 || { echo "❌  GitHub CLI (gh) not found. Install: https://cli.github.com"; exit 1; }
command -v vercel >/dev/null 2>&1 || npm install -g vercel

# 2. Write real env file
cat > .env.local << 'ENV'
NEXT_PUBLIC_SUPABASE_URL=https://ldyitelbgxzajahxgghf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeWl0ZWxiZ3h6YWphaHhnZ2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjE4MDMsImV4cCI6MjA4OTkzNzgwM30.FOxPDSTvPPcSJgmyuQKB1E4965yu5sAsHxZRm6lHwB4
ENV

echo "✅  .env.local written"

# 3. Install dependencies
echo "📦  Installing dependencies..."
npm install

# 4. Push to GitHub
echo "🐙  Pushing to GitHub..."
gh repo create cheezious \
  --public \
  --description "Cheezious Pizza Restaurant — Next.js 14 landing page" \
  --push \
  --source=. 2>/dev/null || git push -u origin main

echo "✅  GitHub repo ready"

# 5. Deploy to Vercel and set env vars
echo "🚀  Deploying to Vercel..."
vercel --yes \
  --team haiderali211s-projects \
  -e NEXT_PUBLIC_SUPABASE_URL="https://ldyitelbgxzajahxgghf.supabase.co" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeWl0ZWxiZ3h6YWphaHhnZ2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjE4MDMsImV4cCI6MjA4OTkzNzgwM30.FOxPDSTvPPcSJgmyuQKB1E4965yu5sAsHxZRm6lHwB4"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅  DONE! Your site is live on Vercel."
echo "  🗄️  Supabase DB: https://supabase.com/dashboard/project/ldyitelbgxzajahxgghf"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
