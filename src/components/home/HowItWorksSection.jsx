// HowItWorksSection.jsx
import "../../styles/work.css" // Reuse the same CSS for consistent design

export default function HowItWorksSection() {
  const steps = [
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Share How You Feel"
          className="icon"
          style={{ width: 48, height: 48 }}
        />
      ),
      title: "1. Share How You Feel",
      description:
        "Start a conversation with SoulSyncAI. Whether it’s stress, anxiety, or anything else, just type it out.",
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/5997/5997681.png"
          alt="Get Instant AI Support"
          className="icon"
          style={{ width: 48, height: 48 }}
        />
      ),
      title: "2. Get Instant AI Support",
      description:
        "Our AI provides thoughtful responses and coping strategies - trained with emotional intelligence in mind.",
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176297.png"
          alt="Track Your Progress"
          className="icon"
          style={{ width: 48, height: 48 }}
        />
      ),
      title: "3. Track Your Progress",
      description:
        "With the diary and mood tracking, you’ll get insights over time - helping you grow mentally stronger.",
    },
    {
      icon: (
        <img
          src="https://media.istockphoto.com/id/1159741374/vector/creative-icon-of-a-half-brain-half-lightbulb-representing-ideas-creativity-knowledge.jpg?s=612x612&w=0&k=20&c=UggbJ9Wp1K3cGVR8x7zROTUZr9VHxe6vqU_3tgCRpCI="
          alt="Track Your Progress"
          className="icon"
          style={{ width: 48, height: 48 }}
        />
      ),
      title: "4. Understand Your Mind",
      description:
        "Complete a short psychological assessment to uncover insights about your emotional and mental well-being. It’s to help you know yourself better.",
    },
  ]

  return (
    <section id="how-it-works" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>How SoulSyncAI Works</h2>
          <p>
            SoulSyncAI is designed to make mental wellness simple, supportive, and accessible-anytime you need it.
          </p>
        </div>
        <div className="features-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="feature-card">
              <div className="p-6 pb-2">
                <div className="mb-4">{step.icon}</div>
                <h3>{step.title}</h3>
              </div>
              <div className="px-6 pb-6">
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
