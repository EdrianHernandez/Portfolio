import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <h5 id="contact-heading">Contact</h5>
      <p style={{maxWidth:'540px', lineHeight:'1.6', fontSize:'.95rem'}}>
        Let's build something great together. Reach out via <a href="mailto:edrian@example.com">email</a> or connect on <a href="https://github.com/EdrianHernandez" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </section>
  )
}

export default Contact
