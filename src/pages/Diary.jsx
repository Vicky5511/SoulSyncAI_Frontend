import React, { useState, useEffect } from "react";
import api from "../api"; // Your axios instance
import '../styles/Diary.css'; // Import CSS
import { PencilIcon, Trash2Icon, PlusCircleIcon, XIcon, SaveIcon, BookOpenIcon } from 'lucide-react';
import Navbar from "../components/Navbar";

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  const [editingEntry, setEditingEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  // GET: Fetch all diary entries
  const fetchDiaryEntries = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/diary/entries/");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // POST: Create a new diary entry
  const createDiaryEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    try {
      await api.post("/api/diary/entries/", newEntry);
      setNewEntry({ title: "", content: "" });
      setShowForm(false);
      fetchDiaryEntries();
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };

  // PUT: Update an existing diary entry
  const updateDiaryEntry = async () => {
    if (!editingEntry) return;
    try {
      await api.put(`/api/diary/entries/${editingEntry.id}/`, editingEntry);
      setEditingEntry(null);
      fetchDiaryEntries();
    } catch (error) {
      console.error("Error updating diary entry:", error);
    }
  };

  // DELETE: Remove a diary entry
  const deleteDiaryEntry = async (id) => {
    try {
      await api.delete(`/api/diary/entries/${id}/`);
      fetchDiaryEntries();
    } catch (error) {
      console.error("Error deleting diary entry:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Navbar />
    
    <div className="diary-page">
   
      
      <div className="diary-container">
        <div className="diary-header">
          <div className="diary-title-container">
            <BookOpenIcon className="diary-book-icon" />
            <h1 className="diary-title">My Personal Journal</h1>
          </div>
          
          <button 
            className={`diary-add-toggle ${showForm ? 'active' : ''}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                <XIcon size={18} />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <PlusCircleIcon size={18} />
                <span>New Entry</span>
              </>
            )}
          </button>
        </div>
        
        {/* Create Entry Form */}
        {showForm && (
          <div className="diary-form-container">
            <div className="diary-form">
              <h2 className="diary-form-title">Create New Entry</h2>
              <input
              style={{ color: "black" }}
                type="text"
                placeholder="Title your thoughts..."
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="diary-input"
              />
              <textarea
                placeholder="What's on your mind today?"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="diary-textarea"
              />
              <button
                onClick={createDiaryEntry}
                className="diary-save-btn"
              >
                <SaveIcon size={16} />
                <span>Save Entry</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Edit Entry Form */}
        {editingEntry && (
          <div className="diary-edit-container">
            <div className="diary-form">
              <h2 className="diary-form-title">Edit Entry</h2>
              <input
              style={{ color: "black", border: "1px solid black" }}
                type="text"
                value={editingEntry.title}
                onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                className="diary-input"
              />
              <textarea
                value={editingEntry.content}
                onChange={(e) => setEditingEntry({ ...editingEntry, content: e.target.value })}
                className="diary-textarea"
              />
              <div className="diary-edit-actions">
                <button
                  onClick={updateDiaryEntry}
                  className="diary-update-btn"
                >
                  <SaveIcon size={16} />
                  <span>Update</span>
                </button>
                <button
                  onClick={() => setEditingEntry(null)}
                  className="diary-cancel-btn"
                >
                  <XIcon size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Entries Display */}
        <div className="diary-entries-section">
          {isLoading ? (
            <div className="diary-loading">
              <div className="diary-spinner"></div>
              <p>Loading your journal entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="diary-empty">
              <BookOpenIcon size={48} className="diary-empty-icon" />
              <p>Your journal is empty. Start writing your thoughts!</p>
            </div>
          ) : (
            <div className="diary-entries-grid">
              {entries.map((entry) => (
                <div key={entry.id} className="diary-entry-card">
                  <div className="diary-entry-content">
                    <h3 className="diary-entry-title">{entry.title}</h3>
                    <p className="diary-entry-text">{entry.content}</p>
                    <div className="diary-entry-date">{formatDate(entry.created_at)}</div>
                  </div>
                  <div className="diary-entry-actions">
                    <button
                      onClick={() => setEditingEntry(entry)}
                      className="diary-edit-btn"
                      aria-label="Edit entry"
                    >
                      <PencilIcon size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteDiaryEntry(entry.id)}
                      className="diary-delete-btn"
                      aria-label="Delete entry"
                    >
                      <Trash2Icon size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DiaryEntries;
