import { useEffect, useRef } from "react";
import "../css/animation.css"

const ScrollAnimation = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const animatedElements = sectionsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-10"
            );

            entry.target.classList.add(
              "opacity-100",
              "translate-y-0"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      animatedElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const sections = [
    {
      id: "dashboard",
      title: "Dashboard",
      content: <p className="text-gray-600">Total Balance: $0</p>,
    },
    {
      id: "income",
      title: "Income Details",
      content: (
        <form>
          <input
            type="text"
            placeholder="Enter income source"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>
      ),
    },
    {
      id: "budget",
      title: "Budget Details",
      content: (
        <div>
          <p className="text-gray-600">
            Budget information goes here.
          </p>
        </div>
      ),
    },
    {
      id: "expense",
      title: "Expense Details",
      content: (
        <div>
          <p className="text-gray-600">
            Expense information goes here.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="
            opacity-0
            translate-y-10
            transition-all
            duration-1000
            ease-in-out
            bg-white
            shadow-lg
            rounded-2xl
            p-6
            max-w-3xl
            mx-auto
          "
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {section.title}
          </h2>

          {section.content}
        </section>
      ))}
    </div>
  );
};

export default ScrollAnimation;