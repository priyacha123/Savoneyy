import { Link } from 'react-router-dom';
import '../css/landingPage.css';

const navItems = ['Features', 'How it Works', 'Analytics', 'Testimonials'];

const metrics = [
  { label: 'Users onboarded', value: '120K+' },
  { label: 'Transactions tracked', value: '$48M' },
  { label: 'Growth this quarter', value: '+32%' },
];

const features = [
  {
    title: 'Smart income tracking',
    description:
      'Organize every stream in one calm dashboard with smooth filters, quick tagging, and instant visibility.',
  },
  {
    title: 'Budget planning that feels easy',
    description:
      'Turn complex monthly planning into a clean workflow with guided cards, totals, and progress indicators.',
  },
  {
    title: 'Insightful visual analytics',
    description:
      'Read trends fast with polished charts, category breakdowns, and elegant summaries inspired by the reference UI.',
  },
];

const testimonials = [
  {
    quote:
      'The interface feels premium and simple at the same time. Our customers instantly understand the product.',
    name: 'Ava Morgan',
    role: 'Product Lead, Northstar Labs',
  },
  {
    quote:
      'We launched faster because the landing page already tells the product story with clarity and trust.',
    name: 'Daniel Cruz',
    role: 'Founder, Ledger Bloom',
  },
];

export default function LandingPage() {
  return (
    <div className="lp-shell">
      <div className="lp-bg-orb lp-bg-orb-one" />
      <div className="lp-bg-orb lp-bg-orb-two" />

      <header className="lp-navbar">
        <div className="lp-brand">
          <div className="lp-brand-mark">S</div>
          <div>
            <p className="lp-brand-title">Savoney</p>
            <p className="lp-brand-subtitle">Finance made graceful</p>
          </div>
        </div>

        <nav className="lp-nav-links">
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="lp-nav-actions">
          <button className="lp-btn lp-btn-ghost">Sign in</button>
          <button className="lp-btn lp-btn-primary">Start free</button>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <div className="lp-hero-copy">
            <span className="lp-badge">Modern Fintech Landing Page</span>
            <h1>
              Build financial clarity with a landing page inspired by a sleek dashboard UI.
            </h1>
            <p>
              This React JSX layout borrows the clean blue palette, rounded cards, soft shadows,
              and data-first storytelling style seen in your reference video—reimagined as a
              conversion-focused landing page.
            </p>

            <div className="lp-hero-actions">
              <Link to="/dashboard" className="lp-btn lp-btn-primary lp-btn-large">
                Get started
              </Link>
              <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-large">
                Watch demo
              </Link>
            </div>

            <div className="lp-metrics">
              {metrics.map((metric) => (
                <div className="lp-metric-card" key={metric.label}>
                  <h3>{metric.value}</h3>
                  <p>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-dashboard-preview">
            <div className="lp-preview-topbar">
              <div className="lp-preview-chip active">Income</div>
              <div className="lp-preview-chip">Budget</div>
              <div className="lp-preview-chip">Expenses</div>
            </div>

            <div className="lp-preview-grid">
              <article className="lp-card lp-card-form">
                <div className="lp-card-header">
                  <span className="lp-card-dot" />
                  <h4>Income Details</h4>
                </div>
                <div className="lp-form-mock">
                  <div className="lp-input-mock" />
                  <div className="lp-input-mock" />
                  <div className="lp-input-row">
                    <div className="lp-input-mock small" />
                    <div className="lp-input-mock small" />
                  </div>
                  <div className="lp-submit-mock">Next</div>
                </div>
              </article>

              <article className="lp-card lp-card-history">
                <div className="lp-card-header">
                  <span className="lp-card-dot" />
                  <h4>Recent History</h4>
                </div>
                {[1, 2, 3, 4].map((row) => (
                  <div className="lp-history-row" key={row}>
                    <div>
                      <strong>Salary Source {row}</strong>
                      <p>Updated just now</p>
                    </div>
                    <span>+$2,400</span>
                  </div>
                ))}
              </article>

              <article className="lp-card lp-card-chart">
                <div className="lp-card-header">
                  <span className="lp-card-dot" />
                  <h4>Expense Chart</h4>
                </div>
                <div className="lp-chart-mock">
                  <div className="lp-bar bar-a" />
                  <div className="lp-bar bar-b" />
                  <div className="lp-bar bar-c" />
                  <div className="lp-bar bar-d" />
                  <div className="lp-bar bar-e" />
                </div>
                <div className="lp-chart-footer">
                  <div>
                    <strong>84%</strong>
                    <p>Budget efficiency</p>
                  </div>
                  <div>
                    <strong>$12.8K</strong>
                    <p>Tracked this month</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="lp-section" id="features">
          <div className="lp-section-heading">
            <span className="lp-badge muted">Why teams love it</span>
            <h2>Designed with the same calm, polished structure as the reference UI.</h2>
            <p>
              Rounded surfaces, layered shadows, soft gradients, and consistent spacing create a
              premium financial product feel without overwhelming the user.
            </p>
          </div>

          <div className="lp-feature-grid">
            {features.map((feature, index) => (
              <article className="lp-feature-card" key={feature.title}>
                <div className="lp-feature-icon">0{index + 1}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-section lp-highlight" id="analytics">
          <div className="lp-highlight-copy">
            <span className="lp-badge muted">Dashboard-inspired storytelling</span>
            <h2>Show product value before users even sign up.</h2>
            <p>
              The hero preview mirrors the reference video’s card-driven interface, while this
              section extends it with trust signals, clean messaging, and high-conversion layout.
            </p>
            <ul className="lp-check-list">
              <li>Sticky glass-style navigation bar</li>
              <li>Blue gradient CTAs with elegant hover states</li>
              <li>Responsive card layout for product snapshots</li>
              <li>Testimonial blocks for social proof</li>
            </ul>
          </div>

          <div className="lp-highlight-panel">
            <div className="lp-highlight-line" />
            <div className="lp-highlight-line short" />
            <div className="lp-highlight-stat">
              <span>Revenue pulse</span>
              <strong>+18.4%</strong>
            </div>
            <div className="lp-highlight-stat">
              <span>User confidence</span>
              <strong>4.9/5</strong>
            </div>
            <div className="lp-highlight-stat">
              <span>Operational clarity</span>
              <strong>All-in-one</strong>
            </div>
          </div>
        </section>

        <section className="lp-section" id="testimonials">
          <div className="lp-section-heading narrow">
            <span className="lp-badge muted">Testimonials</span>
            <h2>Simple words from teams that wanted a sharper first impression.</h2>
          </div>

          <div className="lp-testimonial-grid">
            {testimonials.map((item) => (
              <article className="lp-testimonial-card" key={item.name}>
                <p>“{item.quote}”</p>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-section lp-cta" id="how-it-works">
          <div>
            <span className="lp-badge">Launch-ready JSX</span>
            <h2>Drop this into your React project and customize the content in minutes.</h2>
            <p>
              The structure is already organized for a navbar, hero, features, analytics preview,
              testimonials, and a final conversion-focused CTA.
            </p>
          </div>
          <div className="lp-cta-actions">
            <button className="lp-btn lp-btn-primary lp-btn-large">Use this layout</button>
            <button className="lp-btn lp-btn-secondary lp-btn-large">Customize sections</button>
          </div>
        </section>
      </main>
    </div>
  );
}
