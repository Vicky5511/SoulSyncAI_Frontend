// FeaturesSection.jsx
import "../../styles/FeaturesSection.css" // Import the CSS for styling
import { Book, Users, Brain, Shield } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="icon" style={{ color: "#3b82f6" }} />,
      title: "AI Therapy",
      description:
        "Engage in therapeutic conversations with our compassionate AI, designed to listen, understand, and provide guidance.",
    },
    {
      icon: <Book className="icon" style={{ color: "#8b5cf6" }} />,
      title: "Personal Diary",
      description:
        "Document your thoughts and feelings in a private, secure digital journal that helps track your mental wellness journey.",
    },
    {
      icon: <Users className="icon" style={{ color: "#14b8a6" }} />,
      title: "Community",
      description:
        "Connect with others in a safe, moderated space for peer support, shared experiences, and collective growth.",
    },
    {
      icon: <Shield className="icon" style={{ color: "#6366f1" }} />,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We prioritize your privacy and confidentiality above all else.",
    },
  ]

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>Features Designed for Your Wellbeing</h2>
          <p>
            SoulSync AI combines cutting-edge technology with compassionate design to support your mental health
            journey.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="p-6 pb-2">
                <div className="mb-4">{feature.icon}</div>
                <h3>{feature.title}</h3>
              </div>
              <div className="px-6 pb-6">
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
