import React from 'react'
import './SkillsInfoCard.css'

const SkillsInfoCard = ({ heading, skills, panelId = 'skill-panel', labelledBy }) => {
    return (
        <div
            className="skills-info-card"
            role="tabpanel"
            id={panelId}
            aria-labelledby={labelledBy}
            aria-label={heading}
        >
            <h6>{heading}</h6>
            <div className="skills-info-content">
                {skills.map((item, index) => (
                    <React.Fragment key={`skill_${index}`}>
                        <div className="skill-info">
                            <p>{item.skill}</p>
                            <p className="percentage">{item.percentage}</p>
                        </div>
                        <div className="skill-progress-bg" aria-hidden="true">
                            <div className="skill-progress" style={{ width: item.percentage }} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SkillsInfoCard
