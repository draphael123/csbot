import React from 'react';
import './LoadingSkeleton.css';

export function AnswerSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-card">
        <div className="skeleton-header">
          <div className="skeleton-title"></div>
          <div className="skeleton-badge"></div>
        </div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-results">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-result-item">
            <div className="skeleton-result-header">
              <div className="skeleton-number"></div>
              <div className="skeleton-relevance"></div>
            </div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

