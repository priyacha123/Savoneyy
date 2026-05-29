import { useEffect } from "react";

export function AnimatedSections() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-show");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-10 p-6">
      {["Dashboard", "Income Details", "Budget Details", "Expense Details"].map(
        (title, i) => (
          <section
            key={i}
            className="animate-on-show opacity-0 translate-y-6 transition-all duration-700 bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600 mt-2">Sample content...</p>
          </section>
        )
      )}
    </div>
  );
}