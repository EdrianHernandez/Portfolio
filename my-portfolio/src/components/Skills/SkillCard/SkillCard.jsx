import React from 'react'
import './SkillCard.css'

const SkillCard = ({title, iconURL, isActive, onClick}) => {
  return (
    <div 
        className={`skills-card ${isActive ? "active" : ""}`}
        onClick={() => onClick()}
    >
        <div className="skills-icon">
            <img src={iconURL} alt={title} />
        </div>

        <span>{title}</span>
    </div>
  )
}

export default SkillCard