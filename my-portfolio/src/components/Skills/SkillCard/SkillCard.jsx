import React from 'react'
import './SkillCard.css'

const SkillCard = ({ title, iconURL, isActive, onClick, id, ariaControls, refEl }) => {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      id={id}
      className={`skills-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick()}
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      aria-controls={ariaControls}
      aria-label={title}
      ref={refEl}
      onKeyDown={handleKey}
    >
      <div className="skills-icon">
        <img src={iconURL} alt="" aria-hidden={!isActive} />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default SkillCard