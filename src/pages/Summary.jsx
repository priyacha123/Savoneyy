import { useEffect, useRef } from "react";
import "./../css/animation.css";

const ScrollAnimation = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const animatedElements = sectionsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class when element is in view
            entry.target.classList.add("visible");

            // Stop observing after animation
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
      content: <p>Total Balance: $0</p>,
    },
    {
      id: "income",
      title: "Income Details",
      content: (
        <form>
          {/* Form fields */}
          <input type="text" placeholder="Enter income source" />
        </form>
      ),
    },
    {
      id: "budget",
      title: "Budget Details",
      content: (
        <div>
          {/* Budget content */}
          <p>Budget information goes here.</p>
        </div>
      ),
    },
    {
      id: "expense",
      title: "Expense Details",
      content: (
        <div>
          {/* Expense content */}
          <p>Expense information goes here.</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        /* Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Initial hidden state */
        .animate-on-show {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Visible animation */
        .animate-on-show.visible {
          animation: fadeIn 1s ease-in-out forwards;
        }

        section {
          padding: 20px;
          margin: 20px 0;
          border: 1px solid #ddd;
          border-radius: 10px;
        }
      `}</style>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="animate-on-show"
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <h2>{section.title}</h2>
          {section.content}
        </section>
      ))}
    </div>
  );
};

export default ScrollAnimation;