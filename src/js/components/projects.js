import React from 'react'
// Göra om till "about this site"

function Projects(){
  const listStyle = {
    "listStyleType": "circle",
    "listStylePosition": "outside",
  };
  return (
    <section className="responsive-text">
      <h1>Projects</h1>
      <h3 className="h3-override-ml-nil"><a  target="_blank" href="https://elektropartner.nu/">Elektropartner</a></h3>
      <ul className="pl-6" style={listStyle}>
        <li><p className="responsive-text">Consultant job for regnet Co. Creation of a subpage system with Craft 3 CMS.</p></li>
      </ul>
      <h3 className="h3-override-ml-nil">JSON-format HTML to javaScript</h3>
      <ul className="pl-6" style={listStyle}>
        <li><p className="responsive-text">Two Prototypes has been built of a
          browser-style javaScript engine that turns HTML-instructions in json-format,
          into HTML and outputs it to target destination.
        </p></li>
      </ul>
    </section>
  )

}


export {Projects as Part};
