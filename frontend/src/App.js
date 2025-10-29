import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'; // Add this import
import './styles/App.css';

// Simplified API URL configuration for Render deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      console.log('Fetching from:', `${API_BASE_URL}/api/feedback`);
      const response = await fetch(`${API_BASE_URL}/api/feedback`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      alert('Failed to load feedbacks. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFeedbackSubmit = async (feedbackData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        await fetchFeedbacks();
        setActiveTab('list');
        alert('Feedback submitted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchFeedbacks();
          alert('Feedback deleted successfully!');
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        alert('Failed to delete feedback. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Student Feedback System</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'form' ? 'active' : ''} 
            onClick={() => setActiveTab('form')}
            disabled={loading}
          >
            Submit Feedback
          </button>
          <button 
            className={activeTab === 'list' ? 'active' : ''} 
            onClick={() => setActiveTab('list')}
            disabled={loading}
          >
            View Feedback
          </button>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
            disabled={loading}
          >
            Dashboard
          </button>
        </nav>
      </header>

      <main className="app-main">
        {loading && <div className="loading">Loading...</div>}
        
        {activeTab === 'form' && (
          <FeedbackForm onSubmit={handleFeedbackSubmit} loading={loading} />
        )}
        {activeTab === 'list' && (
          <FeedbackList 
            feedbacks={feedbacks} 
            onDelete={handleDeleteFeedback}
            loading={loading}
          />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard feedbacks={feedbacks} />
        )}
      </main>

      {/* Add Footer here */}
      <Footer />
    </div>
  );
}

export default App;