# 🌸 BLOOM — Authentication Experience

> **"Your space. Your journey. Your beginning."**

An elegant, modern, responsive Login and Signup authentication website crafted with **React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide Icons**. Built with soft pastel aesthetics, botanical accents, glassmorphic depth, and subtle 3D interactions.

---

## ✨ Features

- 🌿 **Pastel Botanical Aesthetic**: Carefully balanced palette with Rose Pink (`#EAA8BE`), Pastel Pink (`#F4C7D5`), Light Blush (`#FCE8EF`), Botanical Green (`#496B4A`), Sage Green (`#A8BEA0`), and Soft Sky Blue (`#DCEAF5`).
- 🪟 **Glassmorphism & 3D Interactive Tilt**: Subtle 3D card tilt driven by cursor position on desktop, soft glow effects, and responsive glass blur.
- 🔐 **Dual Authentication Modes**:
  - **Interactive Demo Mode (Default)**: Fully testable out of the box with zero setup. Pre-seeded with demo account (`camille@bloom.com` / `Password123!`), one-click credentials autofill, real client session persistence, and simulated password resets.
  - **Supabase Production Mode**: Seamlessly switch to production authentication by setting your project environment variables.
- 🛡️ **Comprehensive Validation & Password Security**:
  - Real-time password strength meter (Weak, Medium, Strong) with animated requirement checklist.
  - Show / hide password toggles.
  - Confirm password validation.
  - Accessible error indicators and alerts.
- 📱 **Fully Responsive Layout**:
  - Two-column hero & login card on desktop.
  - Optimized single-column touch experience on tablets and smartphones.
- 🚪 **Protected Dashboard Route**: Authenticated member dashboard with profile editing, simulated password management, security notices, help & support, and logout confirmation.
- ♿ **Accessibility & Motion Comfort**: Full keyboard navigation, semantic labels, and `prefers-reduced-motion` compliance.

---

## 📂 Project Structure

```
project-wise/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthCard.tsx           # Glassmorphic card container with 3D tilt
│   │   ├── BackgroundOrbs.tsx     # Ambient floating pastel spheres & glow
│   │   ├── Button.tsx             # Reusable elevated button with states
│   │   ├── DemoBanner.tsx         # Demo mode indicator & one-click autofill
│   │   ├── Footer.tsx             # Botanical footer with copyright & links
│   │   ├── FormInput.tsx          # Reusable text/email input with icons & validation
│   │   ├── Navbar.tsx             # Header with brand logo & auth status modal
│   │   ├── PasswordInput.tsx      # Password input with show/hide toggle
│   │   ├── PasswordStrength.tsx   # Dynamic strength meter & checklist
│   │   ├── TermsModal.tsx         # Terms of Service & Privacy dialog
│   │   └── WelcomePanel.tsx       # Left-column hero illustration & features
│   ├── context/
│   │   └── AuthContext.tsx        # Centralized auth state (Supabase + Demo)
│   ├── hooks/
│   │   └── useAuth.ts             # Auth consumer hook
│   ├── lib/
│   │   └── supabase.ts            # Supabase client initializer & config detector
│   ├── pages/
│   │   ├── Dashboard.tsx          # Member dashboard with settings & logout
│   │   ├── ForgotPassword.tsx     # Password recovery with status feedback
│   │   ├── Login.tsx              # Split desktop login & landing experience
│   │   └── Signup.tsx             # Account registration with live validation
│   ├── routes/
│   │   └── ProtectedRoute.tsx     # Route guard with botanical loading spinner
│   ├── types/
│   │   └── auth.ts                # TypeScript interfaces for users & sessions
│   ├── App.tsx                    # Route definitions & page transition animations
│   ├── index.css                  # Tailwind directives & glassmorphic utilities
│   └── main.tsx                   # React root entry point
├── .env.example                   # Supabase environment variables template
├── index.html                     # HTML shell with Google Fonts & meta tags
├── package.json                   # Dependencies and build scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Bloom color tokens, shadows, and animations
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite bundler configuration
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.x or v20.x+)
- **npm** (v9.x or v10.x+)

### 2. Installation
Clone or navigate to the project directory and install dependencies:

```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:5173` to explore Bloom.

---

## 🔑 Demo Account Credentials

You can test the application immediately without configuring a database:

- **Email**: `camille@bloom.com`
- **Password**: `Password123!`

Or click the **"Autofill Demo Login"** button at the top of the login card. You can also register any new account on the Signup page; it will persist in local demo storage for your session.

---

## ⚡ Connecting Supabase (Optional for Production)

If you wish to link live Supabase authentication:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **Project Settings** > **API**.
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Restart your development server:
```bash
npm run dev
```

Bloom will automatically detect the credentials, change the badge to **"Supabase Active"**, and route all logins, signups, and password resets through your live database.

---

## 🛠️ Build & Deploy

### Production Build
```bash
npm run build
```

This compiles optimized assets into the `dist/` directory.

### Preview Build Locally
```bash
npm run preview
```

### Deploy to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` and follow the prompts.

### Deploy to Netlify
1. Drag and drop the `dist` folder into the Netlify Dashboard, or link your GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
