import React from 'react'
import './Skills.css'
import { SKILLS } from '../../utils/data'
import SkillCard from './SkillCard/SkillCard.jsx'
import SkillsInfoCard from './SkillsInfoCard/SkillsInfoCard.jsx'

const Skills = () => {

  const [selectedSkill, setSelectedSkill] = React.useState(SKILLS[0])
  const tabRefs = React.useRef([])

  const getTabId = (title) => `skill-tab-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`
  const panelId = 'skill-panel'

  const handleSelectedSkill = (data) => {
    setSelectedSkill(data)
  }

  const handleKeyDown = (e) => {
    const keys = ['ArrowRight','ArrowLeft','Home','End']
    if(!keys.includes(e.key)) return
    e.preventDefault()
    const currentIndex = SKILLS.findIndex(s => s.title === selectedSkill.title)
    let nextIndex = currentIndex
    if(e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % SKILLS.length
    if(e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + SKILLS.length) % SKILLS.length
    if(e.key === 'Home') nextIndex = 0
    if(e.key === 'End') nextIndex = SKILLS.length - 1
    const nextSkill = SKILLS[nextIndex]
    setSelectedSkill(nextSkill)
    const el = tabRefs.current[nextIndex]
    if(el) {
      el.focus({ preventScroll: true })
      // Smooth center scroll on narrow screens
      if(window.matchMedia('(max-width: 680px)').matches) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }

  React.useEffect(() => {
    // Ensure active tab is visible when selection changes on narrow horizontal scroll layout
    const activeIndex = SKILLS.findIndex(s => s.title === selectedSkill.title)
    const el = tabRefs.current[activeIndex]
    if(el && window.matchMedia('(max-width: 680px)').matches) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [selectedSkill])

  return (
  <section className="skills-container" id="skills">
      <h5>Technical Proficiency</h5>

      <div className="skills-content">
        <div
          className="skills"
          role="tablist"
          aria-label="Skill categories"
          onKeyDown={handleKeyDown}
        >
          {SKILLS.map((item, idx) => {
            const isActive = selectedSkill.title === item.title
            const id = getTabId(item.title)
            return (
              <SkillCard
                key={item.title}
                id={id}
                iconURL={item.icon}
                title={item.title}
                isActive={isActive}
                onClick={() => handleSelectedSkill(item)}
                ariaControls={panelId}
                refEl={el => tabRefs.current[idx] = el}
              />
            )
          })}
        </div>

        <div className="skills-info">
          <SkillsInfoCard
            heading={selectedSkill.title}
            skills={selectedSkill.skills}
            panelId={panelId}
            labelledBy={getTabId(selectedSkill.title)}
          />
        </div>
      </div>
    </section>
  )
}

export default Skills