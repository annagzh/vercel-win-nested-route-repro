# NEXT_MISSING_LAMBDA Windows repro

Minimal Next.js 16.3.0 App Router project with one 2-segment static route
(/prueba-plana/anidada). CI runs `npx vercel@58.9.4 build` on windows-latest
and ubuntu-latest (Node 24). Hypothesis: fails on Windows only, with
"Unable to find lambda for route: /prueba-plana/anidada" (PIPE-1685 class,
suspect @vercel/next utils.ts getServerlessPages path.join keying).
`.vercel/project.json` is a stub so the build runs offline without auth.
