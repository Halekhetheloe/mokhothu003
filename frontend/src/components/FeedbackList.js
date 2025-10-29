import React from 'react';

const FeedbackList = ({ feedbacks, onDelete, loading }) => {
  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="feedback-list-container">
        <h2>Course Feedback</h2>
        <p className="loading">Loading feedbacks...</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="feedback-list-container">
        <h2>Course Feedback</h2>
        <p className="no-feedback">No feedback submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <h2>Course Feedback ({feedbacks.length})</h2>
      <div className="feedback-list">
        {feedbacks.map(feedback => (
          <div key={feedback._id || feedback.id} className="feedback-item">
            <div className="feedback-header">
              <h3>{feedback.courseCode}</h3>
              <span className="rating-stars">
                {getRatingStars(feedback.rating)}
                <span className="rating-number">({feedback.rating}/5)</span>
              </span>
            </div>
            
            <div className="feedback-body">
              <p className="comments">{feedback.comments}</p>
            </div>
            
            <div className="feedback-footer">
              <span className="student-name">By: {feedback.studentName}</span>
              <span className="feedback-date">
                {formatDate(feedback.createdAt || feedback.date)}
              </span>
            </div>
            
            <button 
              className="delete-btn"
              onClick={() => onDelete(feedback._id || feedback.id)}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;