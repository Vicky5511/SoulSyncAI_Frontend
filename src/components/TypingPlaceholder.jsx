// TypingPlaceholder.jsx
import React, { useEffect, useState } from "react";

const TypingPlaceholder = () => {
  const [key, setKey] = useState(0);
  const message = "What's On Your Mind Today...";

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 10000); // Loop every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="typing-placeholder" key={key}>
      {message.split("").map((char, i) => (
        <span
          key={i}
          className={`letter${char === " " ? " space" : ""}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default TypingPlaceholder;
