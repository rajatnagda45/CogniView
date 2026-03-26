---
trigger: manual
---

# Vibe Coding Workflow Guide - AI-Assisted Development Best Practices

## 🎯 Purpose
Complete guide for conducting audits on AI-generated or vibe-coded projects, with emphasis on identifying common patterns, fixing issues, and maintaining code quality throughout rapid development cycles.

---

## 🤖 1. What is Vibe Coding?

**Definition:**
Vibe Coding (AI-assisted or prompt-driven development) is using tools like ChatGPT, Claude, Cursor, v0.dev, or Bolt to rapidly generate code through natural language.

**Common Characteristics:**
* ✅ **Speed:** MVP in hours instead of days.
* ⚠️ **Inconsistency:** Fragmented patterns across different generations.
* ⚠️ **Redundancy:** AI often recreates similar components or logic.
* ⚠️ **Technical Debt:** High potential for "magic numbers" and outdated library patterns.

### Popular AI Coding Tools (2025-2026)
| Tool | Best For | Output Quality |
| :--- | :--- | :--- |
| **v0.dev** | shadcn/ui components | High |
| **Bolt.new** | Full-stack scaffolding | Medium |
| **Lovable.dev** | Production-ready apps | High |
| **Cursor** | Full-repo IDE context | High |
| **Claude Artifacts** | Isolated React components | Medium-High |

---

## 📋 2. Vibe Coding Audit Workflow

### 2.1 Initial Assessment (30 minutes)
**Step 1: Project Structure Analysis**
```bash
# Generate project tree
tree -I 'node_modules|.next|dist' -L 3 > structure.txt

# Count files by type to gauge scale
find . -type f -name "*.tsx" | wc -l
find . -type f -name "*.ts" | wc -l

Step 2: Dependency & Security Scan

Bash
# Check for bloat or duplicate packages
cat package.json | jq '.dependencies'

# Security and updates
npm audit
npm outdated
Step 3: Quality Quick Scan

Bash
# Check for TypeScript errors (The "Truth" test)
npx tsc --noEmit

# Find hidden technical debt
grep -r "TODO\|FIXME" src/ | wc -l
2.2 Deep Dive Categories
2.2.1 Component Reusability
AI tends to duplicate UI logic. Use this script to find potential duplicates by filename:

JavaScript
// analyze-duplicates.js
const fs = require('fs');
const path = require('path');

function findDuplicateComponents(dir) {
  const components = {};
  const walk = (directory) => {
    fs.readdirSync(directory).forEach(file => {
      const filepath = path.join(directory, file);
      if (fs.statSync(filepath).isDirectory()) walk(filepath);
      else if (file.endsWith('.tsx')) {
        const name = file.replace('.tsx', '');
        if (!components[name]) components[name] = [];
        components[name].push(filepath);
      }
    });
  };
  walk(dir);
  Object.entries(components).forEach(([name, paths]) => {
    if (paths.length > 1) console.log(`Duplicate: ${name} in ${paths.join(', ')}`);
  });
}
findDuplicateComponents('./src');
Refactor Strategy:

❌ BAD: Separate PrimaryButton, DangerButton.

✅ GOOD: Single Button component with a variant prop using cva or standard mapping.

2.2.2 State Management Audit
Issues: Prop drilling through 5+ levels or over-using useState for global concerns.
Solution: Move to Zustand for a lightweight store.

TypeScript
// store/useStore.ts
import { create } from 'zustand';
interface AppState {
  user: any;
  setUser: (user: any) => void;
}
export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
2.2.3 Styling Consistency
Identify Anti-Patterns:

Bash
# Find inline styles
grep -r "style={{" src/ | wc -l

# Find "Magic Numbers" in Tailwind
grep -r "w-\[.*px\]" src/
Strategy: Define a central tailwind.config.js and use CSS variables in :root for semantic colors (e.g., --color-primary-500).

2.2.4 API Integration Audit
Checklist:

[ ] No hardcoded API keys.

[ ] Fetching uses a library like TanStack Query for caching.

[ ] Loading/Error states exist for every network call.

Refactor (The Query Pattern):

TypeScript
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json()),
  staleTime: 1000 * 60 * 5, // 5 min cache
});
🔧 3. Automated Audit Tools
3.1 Setup Linting
Bash
npm install -D eslint prettier eslint-config-prettier @typescript-eslint/parser
Add to package.json: "lint": "eslint . --ext .ts,.tsx --fix"

3.2 Bundle & Performance
Bundle Analyzer: ANALYZE=true npm run build (requires @next/bundle-analyzer).

A11y: Install eslint-plugin-jsx-a11y to ensure AI-generated HTML is accessible.

📊 4. Performance Optimization
React.memo: Wrap expensive leaf components.

Lazy Loading: Use const Component = lazy(() => import('./Component')).

Images: Always use next/image with defined width/height to prevent layout shift.

🎯 5. Vibe Coding Best Practices
Iterative Refinement: Prompt -> Lint -> Fix Types -> Refactor to Hook -> Repeat.

Effective Prompts: "Create a reusable [X] using [Y Library] with TypeScript interfaces. Follow shadcn naming conventions."

✅ 6. Audit Completion Checklist
Code Quality
[ ] Run npm run lint.

[ ] TypeScript strict mode enabled and passing.

[ ] No duplicate components/logic.

[ ] Context/Zustand used instead of prop drilling.

Performance & Security
[ ] Lighthouse score > 90.

[ ] No API keys in client-side code.

[ ] .env files added to .gitignore.

[ ] Images use loading="lazy".

Documentation
[ ] README has setup instructions.

[ ] Environment variables documented.

[ ] Complex hooks have JSDoc comments.