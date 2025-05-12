

"use client"

import { useState, useEffect } from "react"
import api from "../api"
import styles from "../styles/ProfileComponent.module.css"  // CORRECTED IMPORT
import Navbar from "../components/Navbar"

const ProfileComponent = () => {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const username = localStorage.getItem("username")
  const [formData, setFormData] = useState({
    image: null,
    gender: "",
    age: "",
    education: "",
    married_status: "",
    country: "",
    city: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const response = await api.get("/api/accounts/profile/")
        setProfile(response.data)
        setFormData(response.data)
        // console.log(response.data)
        setIsEditing(false)
      } catch (err) {
        if (err.response?.status === 404) {
          setProfile(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const data = new FormData()
      data.append("gender", formData.gender)
      data.append("age", formData.age)
      data.append("education", formData.education)
      data.append("married_status", formData.married_status)
      data.append("country", formData.country)
      data.append("city", formData.city)
      if (formData.image instanceof File) {
        data.append("image", formData.image)
      }

      let response
      if (profile) {
        response = await api.put("/api/accounts/profile/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        response = await api.post("/api/accounts/profile/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      setProfile(response.data)
      setSuccess(profile ? "Profile updated successfully!" : "Profile created successfully!")
      setIsEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || "Error saving profile")
    }
  }

  const getEducationLabel = (code) => {
    const educationMap = {
      HS: "High School",
      UG: "Undergraduate",
      PG: "Postgraduate",
      OT: "Other",
    }
    return educationMap[code] || code
  }

  const getMaritalStatusLabel = (code) => {
    const statusMap = {
      S: "Single",
      M: "Married",
      D: "Divorced",
      W: "Widowed",
    }
    return statusMap[code] || code
  }

  const getGenderLabel = (code) => {
    const genderMap = {
      M: "Male",
      F: "Female",
      O: "Other",
    }
    return genderMap[code] || code
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className={styles["profile-container"]}>
          <div className={styles["loading-spinner"] } style={{color:"white"}}>Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className={styles["profile-container"]}>
        <h2 style={{color:"white"}}>User Profile</h2>
        {error && <div className={styles["error-message"]}>{error}</div>}
        {success && <div className={styles["success-message"]}>{success}</div>}

        {profile && !isEditing ? (
          <div className={styles["profile-view"]}>
            <div className={styles["profile-image"]}>
              {profile.image ? (
                <img src={`http://localhost:8000${profile.image}`} alt="Profile" />
              ) : (
                <img src="https://via.placeholder.com/250x250?text=No+Image" alt="No Profile" />
              )}
              <div className={styles["community-badge"]}>Community Member</div>
            </div>
            <div className={styles["profile-details"]}>
              <p className={styles["username"]}>{username}</p>
              <p><strong>Gender:</strong> {getGenderLabel(profile.gender)}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Education:</strong> {getEducationLabel(profile.education)}</p>
              <p><strong>Marital Status:</strong> {getMaritalStatusLabel(profile.married_status)}</p>
              <p><strong>Location:</strong> {profile.city}, {profile.country}</p>

              <div className={styles["profile-stats"]}>
                <div className={styles["stat-item"]}>
                  <span className={styles["stat-value"]}>{profile.total_posts}</span>
                  <span className={styles["stat-label"]}>Posts</span>
                </div>
                <div className={styles["stat-item"]}>
                  <span className={styles["stat-value"]}>{profile.total_comments}</span>
                  <span className={styles["stat-label"]}>Comments</span>
                </div>
                <div className={styles["stat-item"]}>
                  <span className={styles["stat-value"]}>{profile.total_likes}</span>
                  <span className={styles["stat-label"]}>Likes</span>
                </div>
              </div>
            </div>
            <button className={styles["edit-btn"]} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className={styles.forms} onSubmit={handleSubmit}>
            <div className={`${styles["form-group"]} ${styles["full-width"]}`}>
              <label>Profile Image:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {formData.image && (
                <div className={styles["image-preview"]}>
                  {typeof formData.image === "string" ? (
                    <img src={`http://localhost:8000${formData.image}`} alt="Current profile" />
                  ) : (
                    <img src={URL.createObjectURL(formData.image)} alt="Preview" />
                  )}
                </div>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label>Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className={styles["form-group"]}>
              <label>Education:</label>
              <select name="education" value={formData.education} onChange={handleChange} required>
                <option value="">Select Education</option>
                <option value="HS">High School</option>
                <option value="UG">Undergraduate</option>
                <option value="PG">Postgraduate</option>
                <option value="OT">Other</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Marital Status:</label>
              <select name="married_status" value={formData.married_status} onChange={handleChange} required>
                <option value="">Select Marital Status</option>
                <option value="S">Single</option>
                <option value="M">Married</option>
                <option value="D">Divorced</option>
                <option value="W">Widowed</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Country:</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </div>

            <div className={styles["form-group"]}>
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>

            <div className={styles["form-actions"]}>
              {profile && (
                <button type="button" className={styles["cancel-btn"]} onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              )}
              <button type="submit" className={styles["submit-btn"]}>
                {profile ? "Update Profile" : "Create Profile"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfileComponent

