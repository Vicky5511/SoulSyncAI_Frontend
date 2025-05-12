// ServiceSection.jsx
import "../../styles/FeaturesSection.css" // Reuse the same CSS for consistent design

const services = [
  {
    image: "https://static.vecteezy.com/system/resources/previews/017/776/465/non_2x/woman-during-a-mental-therapy-session-with-a-psychotherapist-or-psychologist-two-women-are-sitting-and-talking-mental-health-concept-illustration-vector.jpg",
    title: <>85% feel better after their first conversation<sup>1</sup></>,
    description: <>For 40% of cases that's the only help needed.<sup>2</sup></>,
    // tags: [
    //   "Anxiety",
    //   "Stress",
    //   "Navigating relationships",
    //   "Depression",
    //   "Work burnout",
    //   "Loneliness",
    //   "Negative self-talk",
    //   "Upset",
    // ],
  },
  {
    image: "https://docus.ai/og-images/homepage.jpg",
    title: "Available 24/7",
    description: (
      <>
        No appointments or waiting rooms. Instant replies even on weekends and at 4 A.M.
        <br />
        <strong>34%</strong> of sessions happen after midnight, when no traditional services are available.
      </>
    ),
  },
  {
    image: "https://www.traverselegal.com/wp-content/uploads/2024/05/AI-Data-Privacy-Security.jpeg",
    title: "No stigma. Completely anonymous.",
    description:
      "When talking to AI, people are not afraid of being judged and address their problems earlier.",
  },
  {
    image: "https://www.biz4group.com/blog/images/ai-wizard-a-virtual-friend-app/social-implications-and-benefits.jpg",
    title: "Safe",
    description: (
      <>
        AI detects when a person needs something more than a chatbot and redirects them to appropriate resources, such as a therapist or hotlines.
        <br />
        <strong>21%</strong> of users said they would not have anyone to talk to except AI.
      </>
    ),
  },
  {
    image: "https://theacademic.com/wp-content/uploads/2024/02/neliti_chatbot_adn_mental_health_4K_e72ae18d-5488-42d7-81a4-e2b9b1abbcad.png",
    title: "Hyper-realistic experience",
    description: (
      <>
        Unlike other chatbots, conversation with Elomia feels like talking to a real human being.
        {/* <div className="chat-example">
          <p>"I hate my job. I missed the deadline for yet another task. My boss isn't happy about this."</p>
          <p>"Why didn't you manage to do the assignment in time?"</p>
          <p>"Well, you already know what is going on with my family right now."</p>
        </div> */}
      </>
    ),
  },
];

export default function ServiceSection() {
  return (
    <section id="services" className="features-section">
         <div className="features-container">
      <div className="features-header">
      <h2 >
  Services
</h2>
        <p className="section-description">
          SoulSyncAI is a mental health chatbot that provides instant support and coping strategies for various emotional challenges.
        </p>
        <p className="section-description">
          It is designed to help users navigate their feelings and improve their mental well-being.
        </p>
      </div>
      <div className="features-grid">
        {services.map((service, idx) => (
          <div key={idx} className="feature-card">
            <img src={service.image} alt={typeof service.title === "string" ? service.title : `Service ${idx + 1}`} className="card-image" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.tags && (
              <div className="tags">
                {service.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
