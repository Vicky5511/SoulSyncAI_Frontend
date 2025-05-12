// "use client"

// import { useState, useCallback, useMemo, useEffect } from "react"
// import { BookOpen, Brain, CheckCircle2, Dumbbell, FileQuestion, Heart, Lightbulb, RefreshCw, Send } from "lucide-react"
// import "../styles/Recommendations.css"
// import Navbar from "@/components/Navbar"

// const initialForm = {
//   age: "",
//   gender: "",
//   feelings: [],
//   challenges: [],
//   mentalHealthRating: 5,
//   seeingTherapist: "",
//   openTo: [],
//   additionalInfo: "",
// }

// const feelings = ["Anxiety", "Depression", "Stress", "Loneliness", "Trouble focusing", "Low motivation"]
// const challenges = ["Study", "Family", "Relationship", "Work", "Financial"]
// const activities = ["Meditation", "Journaling", "Reading", "Exercise", "Talking", "Creative activities"]

// export default function Recommendations() {
//   const [formData, setFormData] = useState(() => {
//     // Load draft from localStorage
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("mw_form")
//       return saved ? JSON.parse(saved) : initialForm
//     }
//     return initialForm
//   })

//   const [recommendations, setRecommendations] = useState(null)
//   const [activeTab, setActiveTab] = useState("form")

//   // Persist draft
//   useEffect(() => {
//     localStorage.setItem("mw_form", JSON.stringify(formData))
//   }, [formData])

//   // Handle text and select inputs
//   const handleChange = useCallback((name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }, [])

//   // Handle checkbox arrays
//   const handleCheckboxChange = useCallback((name, value, checked) => {
//     setFormData((prev) => {
//       const list = prev[name]
//       return {
//         ...prev,
//         [name]: checked ? [...list, value] : list.filter((i) => i !== value),
//       }
//     })
//   }, [])

//   // Generate recommendations
//   // const generate = useCallback((data) => {
//   //   const recs = { books: [], exercises: [], apps: [] }

//   //   // Books
//   //   if (data.feelings.includes("Anxiety")) {
//   //     recs.books.push("The Anxiety and Phobia Workbook by Edmund J. Bourne")
//   //     recs.exercises.push("4-7-8 Breathing Technique")
//   //     recs.apps.push("Headspace - Guided meditation and mindfulness exercises")
//   //   }
//   //   if (data.feelings.includes("Depression")) {
//   //     recs.books.push("Feeling Good by Dr. David D. Burns")
//   //     recs.exercises.push("Gratitude Journaling")
//   //     recs.apps.push("Woebot - AI-powered cognitive behavioral therapy")
//   //   }
//   //   if (data.feelings.includes("Stress")) {
//   //     recs.books.push("Why Zebras Don't Get Ulcers by Robert Sapolsky")
//   //     recs.exercises.push("Progressive Muscle Relaxation")
//   //     recs.apps.push("Calm - Sleep, meditation and relaxation aid")
//   //   }
//   //   if (data.feelings.includes("Loneliness")) {
//   //     recs.books.push("Lost Connections by Johann Hari")
//   //     recs.exercises.push("Join a local community group or class")
//   //     recs.apps.push("Meetup - Find local groups with similar interests")
//   //   }
//   //   if (data.feelings.includes("Trouble focusing")) {
//   //     recs.books.push("Deep Work by Cal Newport")
//   //     recs.exercises.push("Pomodoro Technique")
//   //     recs.apps.push("Forest - Stay focused and plant real trees")
//   //   }
//   //   if (data.feelings.includes("Low motivation")) {
//   //     recs.books.push("Atomic Habits by James Clear")
//   //     recs.exercises.push("Daily goal-setting & reflection")
//   //     recs.apps.push("Habitica - Gamify your tasks and habits")
//   //   }

//   //   // Challenges
//   //   if (data.challenges.includes("Study")) {
//   //     recs.books.push("Make It Stick: The Science of Successful Learning by Peter C. Brown")
//   //     recs.exercises.push("Spaced repetition practice")
//   //   }
//   //   if (data.challenges.includes("Family")) {
//   //     recs.books.push("The Whole-Brain Child by Daniel J. Siegel")
//   //     recs.exercises.push("Family meeting rituals")
//   //   }
//   //   if (data.challenges.includes("Relationship")) {
//   //     recs.books.push("The 5 Love Languages by Gary Chapman")
//   //     recs.exercises.push("Active listening practice")
//   //   }
//   //   if (data.challenges.includes("Work")) {
//   //     recs.books.push("Burnout by Emily Nagoski and Amelia Nagoski")
//   //     recs.exercises.push("Boundary-setting exercises")
//   //   }
//   //   if (data.challenges.includes("Financial")) {
//   //     recs.books.push("Your Money or Your Life by Vicki Robin")
//   //     recs.exercises.push("Weekly expense tracking")
//   //   }

//   //   // Activities
//   //   if (data.openTo.includes("Meditation")) {
//   //     recs.exercises.push("Start with 5-minute guided meditations")
//   //   }
//   //   if (data.openTo.includes("Journaling")) {
//   //     recs.exercises.push("Morning pages - 3 pages of stream of consciousness writing")
//   //   }
//   //   if (data.openTo.includes("Exercise")) {
//   //     recs.exercises.push("10-minute morning yoga or stretching")
//   //   }
//   //   if (data.openTo.includes("Creative activities")) {
//   //     recs.exercises.push("15 minutes of daily creative practice (drawing, writing, music)")
//   //   }

//   //   // Remove duplicates
//   //   recs.books = [...new Set(recs.books)]
//   //   recs.exercises = [...new Set(recs.exercises)]
//   //   recs.apps = [...new Set(recs.apps)]

//   //   return recs
//   // }, [])

//   const generate = useCallback((data) => {
//   const recs = { books: new Set(), exercises: new Set(), apps: new Set() };

//   const getRandom = (arr, max) => {
//     const shuffled = [...arr].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, max);
//   };

//   const database = {
//     feelings: {
//       "Anxiety": {
//         books: [
//           "The Anxiety and Phobia Workbook by Edmund J. Bourne",
//           "Dare by Barry McDonagh",
//           "Unwinding Anxiety by Judson Brewer",
//           "Rewire Your Anxious Brain by Catherine Pittman",
//           "The Happiness Trap by Russ Harris"
//         ],
//         exercises: ["4-7-8 Breathing Technique", "Box Breathing", "Body Scan Meditation"],
//         apps: ["Headspace", "MindShift CBT", "Insight Timer"]
//       },
//       "Depression": {
//         books: [
//           "Feeling Good by Dr. David D. Burns",
//           "The Upward Spiral by Alex Korb",
//           "Reasons to Stay Alive by Matt Haig",
//           "Undoing Depression by Richard O’Connor"
//         ],
//         exercises: ["Gratitude Journaling", "CBT Thought Record", "Daily Affirmations"],
//         apps: ["Woebot", "Happify", "Moodpath"]
//       },
//       "Stress": {
//         books: [
//           "Why Zebras Don't Get Ulcers by Robert Sapolsky",
//           "Burnout by Emily Nagoski",
//           "Stress-Proof by Mithu Storoni"
//         ],
//         exercises: ["Progressive Muscle Relaxation", "Mindful Walking", "Grounding (5-4-3-2-1)"],
//         apps: ["Calm", "Sanvello", "Aura"]
//       },
//       "Loneliness": {
//         books: [
//           "Lost Connections by Johann Hari",
//           "Together by Vivek Murthy",
//           "Braving the Wilderness by Brené Brown"
//         ],
//         exercises: ["Join a local group", "Volunteering outreach", "Daily Gratitude Letter"],
//         apps: ["Meetup", "Finch", "Mind Journal"]
//       },
//       "Trouble focusing": {
//         books: [
//           "Deep Work by Cal Newport",
//           "Your Brain at Work by David Rock",
//           "The Now Habit by Neil Fiore"
//         ],
//         exercises: ["Pomodoro Technique", "Time blocking", "Focus sprint"],
//         apps: ["Forest", "Brain.fm", "Engross"]
//       },
//       "Low motivation": {
//         books: [
//           "Atomic Habits by James Clear",
//           "The War of Art by Steven Pressfield",
//           "Grit by Angela Duckworth"
//         ],
//         exercises: ["Daily goal-setting", "Vision Board", "Tiny Habits Tracker"],
//         apps: ["Habitica", "Fabulous", "Streaks"]
//       }
//     },
//     challenges: {
//       "Study": {
//         books: [
//           "Make It Stick by Peter C. Brown",
//           "Ultralearning by Scott Young",
//           "A Mind for Numbers by Barbara Oakley"
//         ],
//         exercises: ["Spaced repetition", "Mind mapping", "Task chunking"]
//       },
//       "Family": {
//         books: [
//           "The Whole-Brain Child by Daniel J. Siegel",
//           "How to Talk So Kids Will Listen by Adele Faber"
//         ],
//         exercises: ["Family meetings", "Shared reflection time", "Empathy journaling"]
//       },
//       "Relationship": {
//         books: [
//           "The 5 Love Languages by Gary Chapman",
//           "Hold Me Tight by Dr. Sue Johnson",
//           "Attached by Amir Levine"
//         ],
//         exercises: ["Active listening", "Love map questions", "Emotion naming"]
//       },
//       "Work": {
//         books: [
//           "Burnout by Emily Nagoski",
//           "Essentialism by Greg McKeown",
//           "Deep Work by Cal Newport"
//         ],
//         exercises: ["Boundary setting", "Calendar detox", "End-of-day journaling"]
//       },
//       "Financial": {
//         books: [
//           "Your Money or Your Life by Vicki Robin",
//           "The Psychology of Money by Morgan Housel"
//         ],
//         exercises: ["Weekly expense log", "Budget journaling", "Spending reflection"]
//       }
//     },
//     openTo: {
//       "Meditation": ["Start with 5-minute guided meditations", "Body scan", "Walking meditation"],
//       "Journaling": ["Morning pages", "Gratitude journaling", "CBT journaling"],
//       "Exercise": ["10-minute morning yoga", "Stretch & release", "Breathing with movement"],
//       "Creative activities": ["15-min creative flow", "Free drawing", "Music improvisation"]
//     }
//   };

//   // Process feelings
//   data.feelings.forEach(f => {
//     const group = database.feelings[f];
//     if (group) {
//       getRandom(group.books, 2).forEach(b => recs.books.add(b));
//       getRandom(group.exercises, 2).forEach(e => recs.exercises.add(e));
//       getRandom(group.apps, 2).forEach(a => recs.apps.add(a));
//     }
//   });

//   // Process challenges
//   data.challenges.forEach(c => {
//     const group = database.challenges[c];
//     if (group) {
//       getRandom(group.books, 1).forEach(b => recs.books.add(b));
//       getRandom(group.exercises, 1).forEach(e => recs.exercises.add(e));
//     }
//   });

//   // Process preferences
//   data.openTo.forEach(p => {
//     const acts = database.openTo[p];
//     if (acts) {
//       getRandom(acts, 1).forEach(e => recs.exercises.add(e));
//     }
//   });

//   // Final output as arrays
//   return {
//     books: [...recs.books],
//     exercises: [...recs.exercises],
//     apps: [...recs.apps]
//   };
// }, []);


//   const handleSubmit = useCallback(
//     (e) => {
//       e.preventDefault()
//       const results = generate(formData)
//       setRecommendations(results)
//       setActiveTab("recommendations")
//     },
//     [formData, generate],
//   )

//   const handleReset = useCallback(() => {
//     setFormData(initialForm)
//     setRecommendations(null)
//     localStorage.removeItem("mw_form")
//   }, [])

//   // Form validity
//   const isValid = formData.age && formData.gender

//   // Memoize recommendations
//   const recs = useMemo(() => {
//     if (!recommendations) return null
//     return recommendations
//   }, [recommendations])

//   return (
//     <div > 
//         <Navbar />
//     <div className="wellness-container" >
//       <div className="wellness-content">
//         <div className="wellness-header">
//           <h1>Mental Wellness Assessment</h1>
//           <p>
//             Complete this form to receive personalized recommendations for books, exercises, and resources to support
//             your mental wellbeing.
//           </p>
//         </div>

//         <div className="tabs">
//           <div className="tabs-list">
//             <button
//               className={`tab-button ${activeTab === "form" ? "active" : ""}`}
//               onClick={() => setActiveTab("form")}
//             >
//               <FileQuestion className="tab-icon" />
//               <span>Assessment</span>
//             </button>
//             <button
//               className={`tab-button ${activeTab === "recommendations" ? "active" : ""}`}
//               onClick={() => setActiveTab("recommendations")}
//               disabled={!recommendations}
//             >
//               <Lightbulb className="tab-icon" />
//               <span>Recommendations</span>
//             </button>
//           </div>

//           <div className="tab-content">
//             {activeTab === "form" && (
//               <div className="card">
//                 <div className="card-header">
//                   <h2 className="card-title">Mental Wellness Assessment</h2>
//                   <p className="card-description">
//                     Share information about your current state to receive personalized recommendations.
//                   </p>
//                 </div>
//                 <div className="card-content">
//                   <form id="wellness-form" onSubmit={handleSubmit} className="form-content">
//                     <div className="form-grid">
//                       {/* Basic Information */}
//                       <div className="form-group">
//                         <label htmlFor="age">Age</label>
//                         <input
//                           id="age"
//                           type="number"
//                           value={formData.age}
//                           onChange={(e) => handleChange("age", e.target.value)}
//                           min="1"
//                           max="120"
//                           placeholder="Enter your age"
//                           className="input"
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label htmlFor="gender">Gender</label>
//                         <select
//                           id="gender"
//                           value={formData.gender}
//                           onChange={(e) => handleChange("gender", e.target.value)}
//                           className="select"
//                         >
//                           <option value="" disabled>
//                             Select your gender
//                           </option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Non-binary">Non-binary</option>
//                           <option value="Prefer not to say">Prefer not to say</option>
//                         </select>
//                       </div>
//                     </div>

//                     <hr className="separator" />

//                     {/* Mental Health Rating */}
//                     <div className="form-group">
//                       <div className="rating-header">
//                         <label htmlFor="mentalHealthRating">Mental Health Rating</label>
//                         <span className="rating-value">{formData.mentalHealthRating}</span>
//                       </div>
//                       <input
//                         id="mentalHealthRating"
//                         type="range"
//                         min="1"
//                         max="10"
//                         step="1"
//                         value={formData.mentalHealthRating}
//                         onChange={(e) => handleChange("mentalHealthRating", Number.parseInt(e.target.value))}
//                         className="slider"
//                       />
//                       <div className="slider-labels">
//                         <span>Struggling</span>
//                         <span>Neutral</span>
//                         <span>Thriving</span>
//                       </div>
//                     </div>

//                     <hr className="separator" />

//                     {/* Current Feelings */}
//                     <div className="form-group">
//                       <label className="section-label">Current Feelings</label>
//                       <div className="checkbox-grid">
//                         {feelings.map((feeling) => (
//                           <div key={feeling} className="checkbox-item">
//                             <input
//                               type="checkbox"
//                               id={`feeling-${feeling}`}
//                               checked={formData.feelings.includes(feeling)}
//                               onChange={(e) => handleCheckboxChange("feelings", feeling, e.target.checked)}
//                               className="checkbox"
//                             />
//                             <label htmlFor={`feeling-${feeling}`} className="checkbox-label">
//                               {feeling}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Challenges */}
//                     <div className="form-group">
//                       <label className="section-label">Current Challenges</label>
//                       <div className="checkbox-grid">
//                         {challenges.map((challenge) => (
//                           <div key={challenge} className="checkbox-item">
//                             <input
//                               type="checkbox"
//                               id={`challenge-${challenge}`}
//                               checked={formData.challenges.includes(challenge)}
//                               onChange={(e) => handleCheckboxChange("challenges", challenge, e.target.checked)}
//                               className="checkbox"
//                             />
//                             <label htmlFor={`challenge-${challenge}`} className="checkbox-label">
//                               {challenge} issues
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Therapist */}
//                     <div className="form-group">
//                       <label className="section-label">Are you currently seeing a therapist?</label>
//                       <div className="radio-group">
//                         <div className="radio-item">
//                           <input
//                             type="radio"
//                             id="therapist-yes"
//                             name="therapist"
//                             value="Yes"
//                             checked={formData.seeingTherapist === "Yes"}
//                             onChange={(e) => handleChange("seeingTherapist", e.target.value)}
//                             className="radio"
//                           />
//                           <label htmlFor="therapist-yes">Yes</label>
//                         </div>
//                         <div className="radio-item">
//                           <input
//                             type="radio"
//                             id="therapist-no"
//                             name="therapist"
//                             value="No"
//                             checked={formData.seeingTherapist === "No"}
//                             onChange={(e) => handleChange("seeingTherapist", e.target.value)}
//                             className="radio"
//                           />
//                           <label htmlFor="therapist-no">No</label>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Open to Trying */}
//                     <div className="form-group">
//                       <label className="section-label">I'm open to trying:</label>
//                       <div className="checkbox-grid">
//                         {activities.map((activity) => (
//                           <div key={activity} className="checkbox-item">
//                             <input
//                               type="checkbox"
//                               id={`activity-${activity}`}
//                               checked={formData.openTo.includes(activity)}
//                               onChange={(e) => handleCheckboxChange("openTo", activity, e.target.checked)}
//                               className="checkbox"
//                             />
//                             <label htmlFor={`activity-${activity}`} className="checkbox-label">
//                               {activity}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Additional Info */}
//                     <div className="form-group">
//                       <label htmlFor="additionalInfo" className="section-label">
//                         Additional Information
//                       </label>
//                       <textarea
//                         id="additionalInfo"
//                         placeholder="Share any additional context that might help us provide better recommendations..."
//                         value={formData.additionalInfo}
//                         onChange={(e) => handleChange("additionalInfo", e.target.value)}
//                         className="textarea"
//                       />
//                     </div>
//                   </form>
//                 </div>
//                 <div className="card-footer">
//                   <button type="button" onClick={handleReset} className="button button-outline">
//                     <RefreshCw className="button-icon" />
//                     Reset
//                   </button>
//                   <button type="submit" form="wellness-form" disabled={!isValid} className="button button-primary">
//                     <Send className="button-icon" />
//                     Get Recommendations
//                   </button>
//                 </div>
//               </div>
//             )}

//             {activeTab === "recommendations" && recs && (
//               <div className="card recommendations-card">
//                 <div className="card-header recommendations-header">
//                   <div className="header-with-icon">
//                     <Heart className="heart-icon" />
//                     <h2 className="card-title">Your Personalized Recommendations</h2>
//                   </div>
//                   <p className="card-description">
//                     Based on your responses, we've curated these resources to support your mental wellbeing.
//                   </p>
//                 </div>
//                 <div className="card-content recommendations-content">
//                   {/* Books Section */}
//                   {recs.books.length > 0 && (
//                     <div className="recommendation-section">
//                       <div className="section-title">
//                         <BookOpen className="section-icon" />
//                         <h3>Recommended Books</h3>
//                       </div>
//                       <div className="recommendation-list">
//                         {recs.books.map((book, idx) => (
//                           <div key={idx} className="recommendation-item">
//                             <CheckCircle2 className="check-icon" />
//                             <p>{book}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Exercises Section */}
//                   {recs.exercises.length > 0 && (
//                     <div className="recommendation-section">
//                       <div className="section-title">
//                         <Dumbbell className="section-icon" />
//                         <h3>Exercises & Practices</h3>
//                       </div>
//                       <div className="recommendation-list">
//                         {recs.exercises.map((exercise, idx) => (
//                           <div key={idx} className="recommendation-item">
//                             <CheckCircle2 className="check-icon" />
//                             <p>{exercise}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Apps Section */}
//                   {recs.apps.length > 0 && (
//                     <div className="recommendation-section">
//                       <div className="section-title">
//                         <Brain className="section-icon" />
//                         <h3>Helpful Apps</h3>
//                       </div>
//                       <div className="recommendation-list">
//                         {recs.apps.map((app, idx) => (
//                           <div key={idx} className="recommendation-item">
//                             <CheckCircle2 className="check-icon" />
//                             <p>{app}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="disclaimer">
//                     <p>
//                       <strong>Note:</strong> These recommendations are suggestions based on your responses and should
//                       not replace professional medical advice. If you're experiencing severe mental health issues,
//                       please consult with a healthcare professional.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="card-footer">
//                   <button onClick={() => setActiveTab("form")} className="button button-outline full-width">
//                     Return to Assessment
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }











// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { BookOpen, Brain, CheckCircle2, Dumbbell, FileQuestion, Heart, Lightbulb, RefreshCw, Send } from "lucide-react";
// import "../styles/Recommendations.css";
// import Navbar from "@/components/Navbar";

// const initialForm = {
//   name: "",
//   age: "",
//   occupation: "",
//   mood_description: "",
//   stress_description: "",
//   coping_description: "",
//   future_outlook: "",
//   mood_level: 3,
//   anxiety_level: 3,
//   stress_level: 3,
//   social_level: 3,
//   purpose_level: 3,
//   sleep_quality: 3,
//   exercise_frequency: 3,
//   support_network: 3,
// };

// export default function Recommendations() {
//   const [formData, setFormData] = useState(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("mw_form");
//       return saved ? JSON.parse(saved) : initialForm;
//     }
//     return initialForm;
//   });

//   const [report, setReport] = useState(null);
//   const [activeTab, setActiveTab] = useState("form");
//   const [error, setError] = useState(null);

//   // Persist form data to localStorage
//   useEffect(() => {
//     localStorage.setItem("mw_form", JSON.stringify(formData));
//   }, [formData]);

//   // Handle text, number, and select inputs
//   const handleChange = useCallback((name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   // Handle slider and radio inputs (ensure numeric values)
//   const handleNumericChange = useCallback((name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: Number(value),
//     }));
//   }, []);

//   // Submit form to Django API
//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setError(null);

//       try {
//         const response = await fetch("http://localhost:8000/api/assessment/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch recommendations");
//         }

//         const data = await response.json();
//         setReport(data.report);
//         setActiveTab("recommendations");
//       } catch (err) {
//         setError("An error occurred while fetching recommendations. Please try again.");
//         console.error(err);
//       }
//     },
//     [formData]
//   );

//   // Reset form
//   const handleReset = useCallback(() => {
//     setFormData(initialForm);
//     setReport(null);
//     setError(null);
//     localStorage.removeItem("mw_form");
//   }, []);

//   // Form validation
//   const isValid = formData.name && formData.age && formData.occupation;

//   return (
//     <div>
//       <Navbar />
//       <div className="wellness-container">
//         <div className="wellness-content">
//           <div className="wellness-header">
//             <h1>Psychological Assessment</h1>
//             <p>Complete this form to receive a personalized psychological assessment report.</p>
//           </div>

//           <div className="tabs">
//             <div className="tabs-list">
//               <button
//                 className={`tab-button ${activeTab === "form" ? "active" : ""}`}
//                 onClick={() => setActiveTab("form")}
//               >
//                 <FileQuestion className="tab-icon" />
//                 <span>Assessment</span>
//               </button>
//               <button
//                 className={`tab-button ${activeTab === "recommendations" ? "active" : ""}`}
//                 onClick={() => setActiveTab("recommendations")}
//                 disabled={!report}
//               >
//                 <Lightbulb className="tab-icon" />
//                 <span>Report</span>
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === "form" && (
//                 <div className="card">
//                   <div className="card-header">
//                     <h2 className="card-title">Psychological Assessment Form</h2>
//                     <p className="card-description">Provide details to receive a tailored report.</p>
//                   </div>
//                   <div className="card-content">
//                     <form id="wellness-form" onSubmit={handleSubmit} className="form-content">
//                       <div className="form-grid">
//                         {/* Personal Information */}
//                         <div className="form-group">
//                           <label htmlFor="name">Name</label>
//                           <input
//                             id="name"
//                             type="text"
//                             value={formData.name}
//                             onChange={(e) => handleChange("name", e.target.value)}
//                             placeholder="Enter your name"
//                             className="input"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="age">Age</label>
//                           <input
//                             id="age"
//                             type="number"
//                             value={formData.age}
//                             onChange={(e) => handleChange("age", e.target.value)}
//                             min="18"
//                             max="100"
//                             placeholder="Enter your age"
//                             className="input"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label htmlFor="occupation">Occupation</label>
//                           <input
//                             id="occupation"
//                             type="text"
//                             value={formData.occupation}
//                             onChange={(e) => handleChange("occupation", e.target.value)}
//                             placeholder="Enter your occupation"
//                             className="input"
//                           />
//                         </div>
//                       </div>

//                       <hr className="separator" />

//                       {/* Written Responses */}
//                       <div className="form-group">
//                         <label htmlFor="mood_description">Mood Description</label>
//                         <textarea
//                           id="mood_description"
//                           placeholder="Describe your mood over the past week..."
//                           value={formData.mood_description}
//                           onChange={(e) => handleChange("mood_description", e.target.value)}
//                           className="textarea"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="stress_description">Stress Description</label>
//                         <textarea
//                           id="stress_description"
//                           placeholder="What are your main sources of stress?"
//                           value={formData.stress_description}
//                           onChange={(e) => handleChange("stress_description", e.target.value)}
//                           className="textarea"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="coping_description">Coping Strategies</label>
//                         <textarea
//                           id="coping_description"
//                           placeholder="How do you cope with difficult situations?"
//                           value={formData.coping_description}
//                           onChange={(e) => handleChange("coping_description", e.target.value)}
//                           className="textarea"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="future_outlook">Future Outlook</label>
//                         <textarea
//                           id="future_outlook"
//                           placeholder="How do you feel about your future?"
//                           value={formData.future_outlook}
//                           onChange={(e) => handleChange("future_outlook", e.target.value)}
//                           className="textarea"
//                         />
//                       </div>

//                       <hr className="separator" />

//                       {/* Assessment Scales */}
//                       <div className="form-group">
//                         <label htmlFor="mood_level">Mood Level (1: Very Negative, 5: Very Positive)</label>
//                         <input
//                           id="mood_level"
//                           type="range"
//                           min="1"
//                           max="5"
//                           step="1"
//                           value={formData.mood_level}
//                           onChange={(e) => handleNumericChange("mood_level", e.target.value)}
//                           className="slider"
//                         />
//                         <div className="slider-labels">
//                           <span>Very Negative</span>
//                           <span>Neutral</span>
//                           <span>Very Positive</span>
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="anxiety_level">Anxiety Level (1: Very High, 5: Very Low)</label>
//                         <input
//                           id="anxiety_level"
//                           type="range"
//                           min="1"
//                           max="5"
//                           step="1"
//                           value={formData.anxiety_level}
//                           onChange={(e) => handleNumericChange("anxiety_level", e.target.value)}
//                           className="slider"
//                         />
//                         <div className="slider-labels">
//                           <span>Very High</span>
//                           <span>Moderate</span>
//                           <span>Very Low</span>
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="stress_level">Stress Level (1: Very High, 5: Very Low)</label>
//                         <input
//                           id="stress_level"
//                           type="range"
//                           min="1"
//                           max="5"
//                           step="1"
//                           value={formData.stress_level}
//                           onChange={(e) => handleNumericChange("stress_level", e.target.value)}
//                           className="slider"
//                         />
//                         <div className="slider-labels">
//                           <span>Very High</span>
//                           <span>Moderate</span>
//                           <span>Very Low</span>
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="social_level">Social Connection (1: Very Poor, 5: Very Good)</label>
//                         <input
//                           id="social_level"
//                           type="range"
//                           min="1"
//                           max="5"
//                           step="1"
//                           value={formData.social_level}
//                           onChange={(e) => handleNumericChange("social_level", e.target.value)}
//                           className="slider"
//                         />
//                         <div className="slider-labels">
//                           <span>Very Poor</span>
//                           <span>Moderate</span>
//                           <span>Very Good</span>
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="purpose_level">Sense of Purpose (1: Very Low, 5: Very High)</label>
//                         <input
//                           id="purpose_level"
//                           type="range"
//                           min="1"
//                           max="5"
//                           step="1"
//                           value={formData.purpose_level}
//                           onChange={(e) => handleNumericChange("purpose_level", e.target.value)}
//                           className="slider"
//                         />
//                         <div className="slider-labels">
//                           <span>Very Low</span>
//                           <span>Moderate</span>
//                           <span>Very High</span>
//                         </div>
//                       </div>

//                       <hr className="separator" />

//                       {/* Additional Factors */}
//                       <div className="form-group">
//                         <label>Sleep Quality</label>
//                         <div className="radio-group">
//                           {["Very Poor", "Poor", "Fair", "Good", "Excellent"].map((option, idx) => (
//                             <div key={option} className="radio-item">
//                               <input
//                                 type="radio"
//                                 id={`sleep_quality-${option}`}
//                                 name="sleep_quality"
//                                 value={idx + 1}
//                                 checked={formData.sleep_quality === idx + 1}
//                                 onChange={(e) => handleNumericChange("sleep_quality", e.target.value)}
//                                 className="radio"
//                               />
//                               <label htmlFor={`sleep_quality-${option}`}>{option}</label>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label>Exercise Frequency</label>
//                         <div className="radio-group">
//                           {["Rarely/Never", "Once a week", "2-3 times a week", "4-5 times a week", "Daily"].map(
//                             (option, idx) => (
//                               <div key={option} className="radio-item">
//                                 <input
//                                   type="radio"
//                                   id={`exercise_frequency-${option}`}
//                                   name="exercise_frequency"
//                                   value={idx + 1}
//                                   checked={formData.exercise_frequency === idx + 1}
//                                   onChange={(e) => handleNumericChange("exercise_frequency", e.target.value)}
//                                   className="radio"
//                                 />
//                                 <label htmlFor={`exercise_frequency-${option}`}>{option}</label>
//                               </div>
//                             )
//                           )}
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label>Support Network</label>
//                         <div className="radio-group">
//                           {["Very Limited", "Limited", "Moderate", "Strong", "Very Strong"].map((option, idx) => (
//                             <div key={option} className="radio-item">
//                               <input
//                                 type="radio"
//                                 id={`support_network-${option}`}
//                                 name="support_network"
//                                 value={idx + 1}
//                                 checked={formData.support_network === idx + 1}
//                                 onChange={(e) => handleNumericChange("support_network", e.target.value)}
//                                 className="radio"
//                               />
//                               <label htmlFor={`support_network-${option}`}>{option}</label>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                   <div className="card-footer">
//                     <button type="button" onClick={handleReset} className="button button-outline">
//                       <RefreshCw className="button-icon" />
//                       Reset
//                     </button>
//                    <button type="submit" form="wellness-form" disabled={!isValid} className="button button-primary">
//   <Send className="button-icon" />
//   Get Report
// </button>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "recommendations" && (
//                 <div className="card recommendations-card">
//                   <div className="card-header recommendations-header">
//                     <div className="header-with-icon">
//                       <Heart className="heart-icon" />
//                       <h2 className="card-title">Your Assessment Report</h2>
//                     </div>
//                     <p className="card-description">Here is your personalized psychological assessment report.</p>
//                   </div>
//                   <div className="card-content recommendations-content">
//                     {error && <p className="error-message">{error}</p>}
//                     {report ? (
//                       <pre >{report}</pre>
//                     ) : (
//                       <p>No report available. Please complete the assessment.</p>
//                     )}
//                     <div className="disclaimer">
//                       <p>
//                         <strong>DISCLAIMER:</strong> This assessment is not a substitute for professional psychological
//                         evaluation. Consult a mental health professional for severe concerns.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="card-footer">
//                     <button onClick={() => setActiveTab("form")} className="button button-outline full-width">
//                       Return to Assessment
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useState, useCallback, useEffect } from "react";
import { BookOpen, Brain, CheckCircle2, Dumbbell, FileQuestion, Heart, Lightbulb, RefreshCw, Send } from "lucide-react";
import "../styles/Recommendations.css";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";

const initialForm = {
  name: "",
  age: "",
  occupation: "",
  mood_description: "",
  stress_description: "",
  coping_description: "",
  future_outlook: "",
  mood_level: 3,
  anxiety_level: 3,
  stress_level: 3,
  social_level: 3,
  purpose_level: 3,
  sleep_quality: 3,
  exercise_frequency: 3,
  support_network: 3,
};

export default function Recommendations() {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mw_form");
      return saved ? JSON.parse(saved) : initialForm;
    }
    return initialForm;
  });

  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const [error, setError] = useState(null);

  // Persist form data to localStorage
  useEffect(() => {
    localStorage.setItem("mw_form", JSON.stringify(formData));
  }, [formData]);

  // Handle text, number, and select inputs
  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle slider and radio inputs (ensure numeric values)
  const handleNumericChange = useCallback((name, value) => {
    const numericValue = Number(value);
    console.log(`Updating ${name} to ${numericValue}`); // Debug log
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  }, []);

  // Submit form to Django API
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);

      try {
        const response = await fetch("http://localhost:8000/api/assessment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setReport(data.report);
        setActiveTab("recommendations");
      } catch (err) {
        setError("An error occurred while fetching recommendations. Please try again.");
        console.error(err);
      }
    },
    [formData]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setFormData(initialForm);
    setReport(null);
    setError(null);
    localStorage.removeItem("mw_form");
  }, []);

  // Form validation
  const isValid = formData.name && formData.age && formData.occupation;

  return (
    <div>
      <Navbar />
      <div className="wellness-container">
        <div className="wellness-content">
          <div className="wellness-header">
            <h1>Psychological Assessment</h1>
            <p>Complete this form to receive a personalized psychological assessment report.</p>
          </div>

          <div className="tabs">
            <div className="tabs-list">
              <button
                className={`tab-button ${activeTab === "form" ? "active" : ""}`}
                onClick={() => setActiveTab("form")}
              >
                <FileQuestion className="tab-icon" />
                <span>Assessment</span>
              </button>
              <button
                className={`tab-button ${activeTab === "recommendations" ? "active" : ""}`}
                onClick={() => setActiveTab("recommendations")}
                disabled={!report}
              >
                <Lightbulb className="tab-icon" />
                <span>Report</span>
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "form" && (
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">Psychological Assessment Form</h2>
                    <p className="card-description">Provide details to receive a tailored report.</p>
                  </div>
                  <div className="card-content">
                    <form id="wellness-form" onSubmit={handleSubmit} className="form-content">
                      <div className="form-grid">
                        {/* Personal Information */}
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            style={{ color: "black", border:" 1px solid #cbd5e1"}}

                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your name"
                            className="input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="age">Age</label>
                          <input
                            style={{ color: "black" }}
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                            min="18"
                            max="100"
                            placeholder="Enter your age"
                            className="input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="occupation">Occupation</label>
                          <input
                            style={{ color: "black",border:" 1px solid #cbd5e1" }}

                            id="occupation"
                            type="text"
                            value={formData.occupation}
                            onChange={(e) => handleChange("occupation", e.target.value)}
                            placeholder="Enter your occupation"
                            className="input"
                          />
                        </div>
                      </div>

                      <hr className="separator" />

                      {/* Written Responses */}
                      <div className="form-group">
                        <label htmlFor="mood_description">How would you describe your mood over the past week?
</label>
                        <textarea
                          id="mood_description"
                          placeholder="Describe your mood over the past week..."
                          value={formData.mood_description}
                          onChange={(e) => handleChange("mood_description", e.target.value)}
                          className="textarea"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="stress_description">What are your main sources of stress right now?
</label>
                        <textarea
                          id="stress_description"
                          placeholder="What are your main sources of stress?"
                          value={formData.stress_description}
                          onChange={(e) => handleChange("stress_description", e.target.value)}
                          className="textarea"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="coping_description">What strategies do you use to cope with difficult situations or emotions?
</label>
                        <textarea
                          id="coping_description"
                          placeholder="How do you cope with difficult situations?"
                          value={formData.coping_description}
                          onChange={(e) => handleChange("coping_description", e.target.value)}
                          className="textarea"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="future_outlook">How do you feel about your future?
</label>
                        <textarea
                          id="future_outlook"
                          placeholder="How do you feel about your future?"
                          value={formData.future_outlook}
                          onChange={(e) => handleChange("future_outlook", e.target.value)}
                          className="textarea"
                        />
                      </div>

                      <hr className="separator" />

                      {/* Assessment Scales */}
                      <div className="form-group">
                        <label htmlFor="mood_level">Mood Level (1: Very Negative, 5: Very Positive)</label>
                        <input
                          id="mood_level"
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={formData.mood_level || 3}
                          onChange={(e) => handleNumericChange("mood_level", e.target.value)}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>Very Negative</span>
                          <span>Neutral</span>
                          <span>Very Positive</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="anxiety_level">Anxiety Level (1: Very High, 5: Very Low)</label>
                        <input
                          id="anxiety_level"
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={formData.anxiety_level || 3}
                          onChange={(e) => handleNumericChange("anxiety_level", e.target.value)}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>Very High</span>
                          <span>Moderate</span>
                          <span>Very Low</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="stress_level">Stress Level (1: Very High, 5: Very Low)</label>
                        <input
                          id="stress_level"
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={formData.stress_level || 3}
                          onChange={(e) => handleNumericChange("stress_level", e.target.value)}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>Very High</span>
                          <span>Moderate</span>
                          <span>Very Low</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="social_level">Social Connection (1: Very Poor, 5: Very Good)</label>
                        <input
                          id="social_level"
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={formData.social_level || 3}
                          onChange={(e) => handleNumericChange("social_level", e.target.value)}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>Very Poor</span>
                          <span>Moderate</span>
                          <span>Very Good</span>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="purpose_level">Sense of Purpose (1: Very Low, 5: Very High)</label>
                        <input
                          id="purpose_level"
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={formData.purpose_level || 3}
                          onChange={(e) => handleNumericChange("purpose_level", e.target.value)}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>Very Low</span>
                          <span>Moderate</span>
                          <span>Very High</span>
                        </div>
                      </div>

                      <hr className="separator" />

                      {/* Additional Factors */}
                      <div className="form-group">
                        <label>Sleep Quality</label>
                        <div className="radio-group">
                          {["Very Poor", "Poor", "Fair", "Good", "Excellent"].map((option, idx) => (
                            <div key={option} className="radio-item">
                              <input
                                type="radio"
                                id={`sleep_quality-${option}`}
                                name="sleep_quality"
                                value={idx + 1}
                                checked={formData.sleep_quality === idx + 1}
                                onChange={(e) => handleNumericChange("sleep_quality", e.target.value)}
                                className="radio"
                              />
                              <label htmlFor={`sleep_quality-${option}`}>{option}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Exercise Frequency</label>
                        <div className="radio-group">
                          {["Rarely/Never", "Once a week", "2-3 times a week", "4-5 times a week", "Daily"].map(
                            (option, idx) => (
                              <div key={option} className="radio-item">
                                <input
                                  type="radio"
                                  id={`exercise_frequency-${option}`}
                                  name="exercise_frequency"
                                  value={idx + 1}
                                  checked={formData.exercise_frequency === idx + 1}
                                  onChange={(e) => handleNumericChange("exercise_frequency", e.target.value)}
                                  className="radio"
                                />
                                <label htmlFor={`exercise_frequency-${option}`}>{option}</label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Support Network</label>
                        <div className="radio-group">
                          {["Very Limited", "Limited", "Moderate", "Strong", "Very Strong"].map((option, idx) => (
                            <div key={option} className="radio-item">
                              <input
                                type="radio"
                                id={`support_network-${option}`}
                                name="support_network"
                                value={idx + 1}
                                checked={formData.support_network === idx + 1}
                                onChange={(e) => handleNumericChange("support_network", e.target.value)}
                                className="radio"
                              />
                              <label htmlFor={`support_network-${option}`}>{option}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <button type="button" onClick={handleReset} className="button button-outline">
                      <RefreshCw className="button-icon" />
                      Reset
                    </button>
                    <button type="submit" form="wellness-form" disabled={!isValid} className="button button-primary">
                      <Send className="button-icon" />
                      Get Report
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "recommendations" && (
                <div className="card recommendations-card">
                  <div className="card-header recommendations-header">
                    <div className="header-with-icon">
                      <Heart className="heart-icon" />
                      <h2 className="card-title">Your Assessment Report</h2>
                    </div>
                    <p className="card-description">Here is your personalized psychological assessment report.</p>
                  </div>
                  <div className="card-content recommendations-content">
                    {error && <p className="error-message">{error}</p>}
                    {report ? (
                      <div className="report-text">
                        <ReactMarkdown>{report}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>No report available. Please complete the assessment.</p>
                    )}
                    <div className="disclaimer">
                      <p>
                        <strong>DISCLAIMER:</strong> This assessment is not a substitute for professional psychological
                        evaluation. Consult a mental health professional for severe concerns.
                      </p>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button onClick={() => setActiveTab("form")} className="button button-outline full-width">
                      Return to Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}