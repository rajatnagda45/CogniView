---
description: use this workflow for conducting security check 
---

```
Security Audit Guide – Condensed Checklist

Purpose:
A complete checklist for securing web applications covering environment variables, API keys, databases (Supabase & MongoDB), authentication, and deployment.

--------------------------------------------------

1. Environment Variables & API Key Security

Best Practices:
- Store secrets in .env files (never in code)
- Use prefixes:
  Public: NEXT_PUBLIC_*
  Private: no prefix
- Keep .env in .gitignore
- Provide .env.example for teams
- Use strong secrets (32+ chars)
- Rotate keys every 90 days

Common Mistakes:
- Hardcoding API keys
- Using secret keys in frontend
- Committing .env to Git
- Passing keys in URLs

Correct Approach:
- Use process.env.KEY
- Keep secrets server-side only

Secret Management (Production):
- Vercel Environment Variables
- AWS Secrets Manager
- Google Secret Manager
- Azure Key Vault
- HashiCorp Vault / Dotenv Vault

Client vs Server Exposure:
Safe:
- Stripe publishable key
- Firebase config
- Supabase anon key (with RLS)

Never expose:
- OpenAI API key
- DB credentials
- JWT secrets
- Stripe secret key

API Key Audit Checklist:
- Apply restrictions (IP/domain/rate limit)
- Use least privilege
- Separate keys per environment
- Enable monitoring
- Scan code (Gitleaks, TruffleHog)
- Have revocation process

--------------------------------------------------

2. Supabase Row Level Security (RLS)

Why RLS:
- Database-level security
- User data isolation
- Role-based access

Audit Checklist:
- Enable RLS on all tables
- Policies for SELECT, INSERT, UPDATE, DELETE
- No service role keys in client
- Use auth.uid() & JWT properly
- Apply RLS to storage

Secure Policies:
- Users access only their data
- Admin roles properly validated
- Limited public access

Vulnerabilities:
- No RLS
- Overly permissive policies (USING true)
- Using user_metadata for auth

Optimization:
- Add indexes
- Use functions for checks
- Optimize queries

Storage Security:
- Restrict file access by user
- Allow controlled public read

Testing:
- Test as user, other user, admin
- Ensure unauthorized access fails

--------------------------------------------------

3. MongoDB Security

Fundamentals:
- Use env variables for connection
- Enable authentication & TLS

Checklist:
- TLS/SSL enabled
- IP allowlist
- Strong passwords (16+ chars)
- Separate users per environment
- Avoid root user in apps

Schema Validation:
- Required fields enforced
- Validate formats (email, date)
- Use enums

Access Control:
- Least privilege roles
- Restrict fields where needed

Query Security:
- Always filter by user_id
- Avoid returning all data
- Use parameterized queries

Injection Prevention:
- Validate input types
- Sanitize input
- Avoid dynamic queries

Encryption:
- Encryption at rest
- TLS for connections
- Prefer MongoDB Atlas

Audit Logging:
- Log authentication attempts
- Monitor queries
- Retain logs ≥ 90 days

--------------------------------------------------

4. General API Security

Authentication:
- Verify JWT on protected routes
- Store secrets in env variables

Rate Limiting:
- Limit requests per IP
- Stricter limits for login

Input Validation:
- Use schemas (Zod/Joi)
- Sanitize HTML

CORS:
- Allow trusted domains only
- Never use * in production

Security Headers:
- Use Helmet.js
- Enable CSP, HSTS, X-Frame-Options, X-Content-Type-Options

--------------------------------------------------

5. Security Audit Summary

Environment:
- No .env in Git
- Proper key separation
- Key rotation

Supabase:
- RLS enabled everywhere
- No permissive policies
- anon key client-side only

MongoDB:
- Auth + TLS enabled
- Least privilege roles
- Schema validation

API:
- Authentication enforced
- Rate limiting enabled
- Input validation
- HTTPS required

Code Quality:
- No sensitive logs
- Updated dependencies
- Use SAST tools

--------------------------------------------------

6. Incident Response

Immediate (≤1 hour):
- Revoke key
- Generate new key
- Update & deploy
- Monitor usage

Investigation (≤24 hours):
- Check logs
- Identify breach
- Assess impact

Remediation:
- Fix vulnerability
- Improve processes
- Document incident

--------------------------------------------------

7. Tools & Resources

Tools:
- Gitleaks (secret scanning)
- npm audit (dependencies)
- Snyk (SAST)

CI/CD:
- Automate security scans

Resources:
- OWASP Top 10
- SSL Labs
- SecurityHeaders.com
- MongoDB & Supabase docs
```
