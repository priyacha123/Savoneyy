import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Compass,
  Globe,          // Replaces Facebook
  MessageSquare,  // Replaces Instagram
  Video           // Replaces Youtube
} from 'lucide-react';

export default function SavoneyMinimalLanding() {
  return (
    <div className="min-h-screen bg-[#f0f6fa] text-slate-700 font-sans antialiased flex flex-col justify-between selection:bg-sky-200 selection:text-sky-900">
      
      {/* 1. Minimal Header / Navbar */}
      <header className="max-w-6xl mx-auto w-full px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sky-600">
          <Wallet className="w-6 h-6 stroke-[2.5]" />
          <span className="text-xl font-bold tracking-tight text-slate-800">Savoney</span>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-sky-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-sky-600 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors">
              Log In
            </button>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all shadow-sm shadow-sky-500/10">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Hero Grid */}
      <main className="max-w-6xl mx-auto w-full px-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-8 pb-16">
        
        {/* Left Column: Copy & Form Action */}
        <div className="md:col-span-7 space-y-6 text-left">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-800 leading-[1.15]">
            Savoney: Your Simple <br />
            <span className="text-sky-500">Financial Partner</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed">
            Achieve financial clarity effortlessly. Track, budget, and grow your wealth with minimal steps.
          </p>

          <div className="pt-2">
            <button className="group bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center gap-2 text-sm">
              Create Account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Clean Vector Minimal Art Frame */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[360px] aspect-[4/3] bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-sky-500">
                <Wallet className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Balance</span>
                <p className="text-2xl font-bold text-slate-800">$4,350</p>
              </div>
            </div>

            {/* Simulating the minimal vector line chart */}
            <div className="h-16 flex items-end justify-between gap-1 mt-4 px-2">
              <div className="w-full bg-sky-100 rounded-t-md h-[40%] transition-all hover:bg-sky-200" />
              <div className="w-full bg-sky-100 rounded-t-md h-[65%] transition-all hover:bg-sky-200" />
              <div className="w-full bg-sky-200 rounded-t-md h-[50%] transition-all hover:bg-sky-300" />
              <div className="w-full bg-sky-500 rounded-t-md h-[90%] shadow-sm" />
            </div>
          </div>
        </div>
      </main>

      {/* 3. Core Features Minimal Row */}
      <section id="features" className="max-w-6xl mx-auto w-full px-6 py-8 border-t border-slate-200/50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-500 mt-0.5 border border-sky-100">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Smart Budgeting</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Categorize transfers and expenses automatically without thinking.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-500 mt-0.5 border border-sky-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Secure Account</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Bank-grade isolation guarantees your transaction logs remain your eyes only.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-500 mt-0.5 border border-sky-100">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Fast Transactions</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Add, search, filter, or edit records instantly on a single smooth view.
              </p>
            </div>
          </div>

        </div>
      </section>

     {/* 4. Minimal Footer */}
<footer className="max-w-6xl mx-auto w-full px-6 py-6 border-t border-slate-200/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
  <div className="flex gap-6">
    <a href="#about" className="hover:text-slate-600 transition-colors">About</a>
    <a href="#terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
    <a href="#privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
  </div>
  <div className="flex items-center gap-4 text-slate-400">
    <a href="#" className="hover:text-sky-500 transition-colors" aria-label="Website"><Globe className="w-4 h-4" /></a>
    <a href="#" className="hover:text-sky-500 transition-colors" aria-label="Community"><MessageSquare className="w-4 h-4" /></a>
    <a href="#" className="hover:text-sky-500 transition-colors" aria-label="Videos"><Video className="w-4 h-4" /></a>
  </div>
</footer>

    </div>
  );
}