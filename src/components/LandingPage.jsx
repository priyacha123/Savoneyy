import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Compass,
  Globe,
  MessageSquare,
  Video,
  Menu,
  X,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function SavoneyMinimalLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f9fc] text-slate-700 font-sans antialiased flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-600">
              <Wallet className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Savoney
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8 text-sm font-medium text-slate-500">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-sky-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <SignedOut>
                  <SignInButton />
                  {/* <SignUpButton /> */}
                </SignedOut>
              </button>
              <SignedOut>
                <SignInButton mode="modal" asChild>
                  <button
                    type="button"
                    className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  >
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-sm px-6 py-4 space-y-4"
          >
            <nav className="flex flex-col gap-3 text-sm font-medium text-slate-500">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-sky-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  >
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="md:col-span-7 space-y-8">
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700">
                  Modern Finance Platform
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Your Simple{" "}
                  <span className="text-sky-500">Financial Partner</span>
                </h1>
                <p className="max-w-xl text-base sm:text-lg leading-8 text-slate-500">
                  Achieve financial clarity effortlessly. Track expenses, manage
                  budgets, and grow your wealth with a clean, intuitive
                  experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <SignedOut>
                  <SignInButton mode="modal" asChild>
                    <button
                      type="button"
                      className="group inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    >
                      Create Account
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </SignInButton>
                </SignedOut>
                <button
                  type="button"
                  className="inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold px-6 py-3.5 rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
                <div className="flex items-start justify-between">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-500">
                    <Wallet className="w-8 h-8 stroke-[1.8]" />
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Balance
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900">
                      $4,350
                    </h3>
                  </div>
                </div>

                {/* Chart */}
                <div className="mt-10">
                  <div className="flex items-end gap-3 h-40">
                    {["h-[35%]", "h-[55%]", "h-[45%]", "h-[75%]", "h-full"].map(
                      (height, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-2xl transition-all duration-300 hover:opacity-80 cursor-default ${i < 3 ? `bg-sky-${100 + i * 100}` : i === 3 ? "bg-sky-400" : "bg-sky-500 shadow-lg shadow-sky-400/30"}`}
                          style={{ height }}
                        />
                      ),
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 text-xs font-medium text-slate-400">
                    {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-slate-200/60 bg-white/50"
        >
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Compass,
                  title: "Smart Budgeting",
                  desc: "Categorize transfers and expenses automatically without overcomplicating your workflow.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Accounts",
                  desc: "Bank-grade protection keeps your financial information safe and private at all times.",
                },
                {
                  icon: TrendingUp,
                  title: "Fast Transactions",
                  desc: "Add, edit, filter, and manage records instantly from a single streamlined dashboard.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="w-fit p-3 rounded-2xl bg-sky-50 text-sky-500 border border-sky-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="mt-5 space-y-2">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            {["About", "Terms", "Privacy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Globe, label: "Website" },
              { icon: MessageSquare, label: "Community" },
              { icon: Video, label: "Videos" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-sky-500 hover:border-sky-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
