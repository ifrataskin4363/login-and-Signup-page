# 🛡️ AURA — Enterprise Identity & Access Platform

> **"Next-generation Identity & Access for modern teams."**

A modern, responsive, high-performance Login and Signup authentication platform built with **React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide Icons**. Features an enterprise white-and-blue design language, frosted glassmorphism, responsive 3D card tilt, client-side demo persistence, and full production readiness for **Vercel** and **Supabase**.

---

## ✨ Features

- 💎 **Professional White & Blue Palette**: Clean, crisp enterprise aesthetic with luminous whites (`#FFFFFF`, `#F8FAFC`), deep navy slates (`#0F172A`, `#1E293B`), royal blue accents (`#2563EB`, `#1D4ED8`), electric sky highlights (`#38BDF8`), and soft glowing ambient mesh backgrounds.
- 🪟 **Glassmorphism & 3D Interactive Card Tilt**: Smooth 3D perspective tilt driven by cursor position with spring damping physics, accessible reduced-motion support, and crisp borders.
- 🔐 **Dual Authentication Modes**:
  - **Interactive Demo Mode (Default)**: Fully testable out of the box with zero external configuration. Pre-seeded with an administrator account (`alex@aura.io` / `Password123!`), one-click demo credentials autofill, real client session persistence, dynamic registration, and simulated password resets.
  - **Supabase Cloud Mode**: Instant switch to production database authentication by supplying your project environment variables.
- 🛡️ **Comprehensive Validation & Password Security**:
  - Real-time password strength meter (Weak, Medium, Strong) with an animated requirement checklist.
  - Show / hide password toggles.
  - Confirm password matching validation.
  - Clean error banners and accessible form field hints.
- 📱 **100% Fully Responsive Layout**:
  - Two-column hero & authentication card on desktop.
  - Optimized single-column layout on mobile devices and tablets.
- 🚪 **Protected Dashboard Route**: Authenticated member console with profile editing, simulated password management, security notices, deployment guides, and logout confirmation modal.
- ⚡ **Vercel Ready**: Pre-configured with `vercel.json` SPA rewrite rules so client-side routes (`/login`, `/signup`, `/dashboard`, `/forgot-password`) never produce 404s on page refresh.

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies:
```bash
npm install
```

### 2. Start the development server:
```bash
# In Windows PowerShell:
npm.cmd run dev

# Or in standard bash / macOS / Linux:
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### 3. Demo Credentials:
- **Email:** `alex@aura.io`
- **Password:** `Password123!`
- Or simply click **"Autofill Demo Login"** on the Sign In page.

---

## 🌐 Deploy to Vercel (End-to-End)

AURA is configured for seamless zero-config deployment on [Vercel](https://vercel.com).

### Method 1: Deploy via GitHub / Git (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. *(Optional)* If using Supabase, add the following under **Environment Variables**:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key-here`
5. Click **Deploy**. Your site is live with a global CDN!

### Method 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI globally (if not already installed)
npm install -g vercel

# 2. Log in and deploy
vercel

# 3. For production release:
vercel --prod
```

> **Note on Client Routing**: The included `vercel.json` ensures that deep links (e.g. `your-app.vercel.app/dashboard` or `your-app.vercel.app/signup`) route to `index.html` without 404 errors.

---

## 📂 Project Architecture

```
project-wise/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthCard.tsx           # Glassmorphic card container with 3D tilt
│   │   ├── BackgroundOrbs.tsx     # Ambient royal blue & sky luminous spheres
│   │   ├── Button.tsx             # Elevated button with loading & icon states
│   │   ├── DemoBanner.tsx         # Demo mode indicator & one-click autofill
│   │   ├── Footer.tsx             # Enterprise footer with status & security indicators
│   │   ├── FormInput.tsx          # Reusable input with icons & validation
│   │   ├── Navbar.tsx             # Header with brand logo & system status modal
│   │   ├── PasswordInput.tsx      # Password input with show/hide toggle
│   │   ├── PasswordStrength.tsx   # Dynamic strength meter & requirement checklist
│   │   ├── TermsModal.tsx         # Terms of Service & Privacy dialog
│   │   └── WelcomePanel.tsx       # Enterprise value proposition hero panel
│   ├── context/
│   │   └── AuthContext.tsx        # Centralized auth state (Supabase + Demo)
│   ├── hooks/
│   │   └── useAuth.ts             # Auth consumer hook
│   ├── lib/
│   │   └── supabase.ts            # Supabase client initializer & config check
│   ├── pages/
│   │   ├── Dashboard.tsx          # Authenticated enterprise member console
│   │   ├── ForgotPassword.tsx     # Password recovery workflow
│   │   ├── Login.tsx              # Sign In page with demo autofill
│   │   └── Signup.tsx             # Account registration page with live validation
│   ├── routes/
│   │   └── ProtectedRoute.tsx     # Route guard for authenticated paths
│   ├── types/
│   │   └── auth.ts                # TypeScript interfaces
│   ├── App.tsx                    # Routing & animated transitions
│   ├── index.css                  # Tailwind directives & glass utilities
│   └── main.tsx                   # React root mount
├── vercel.json                    # Vercel SPA rewrite configuration
├── tailwind.config.js             # Brand white & blue palette tokens
└── package.json                   # Dependencies and scripts
```

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` (or `npm.cmd run dev`) | Starts local Vite development server |
| `npm run build` | Compiles TypeScript and builds production bundle to `dist/` |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs Oxlint linter for fast code checks |

---

## 🛡️ License

MIT License. Crafted for modern SaaS and cloud applications.
