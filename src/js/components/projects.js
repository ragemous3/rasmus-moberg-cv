import React from 'react'
import { ColorConsumer } from './colorcontext.js';
// Göra om till "about this site"

function Projects(){
  const listStyle = {
    "listStyleType": "circle",
    "listStylePosition": "outside",
  };
  return (
    <ColorConsumer>{({ color }) => (
      <section className={`responsive-text `}>
        <h1>Projects</h1>
        <article className="pb-4">
          <h3 className="h3-override-ml-nil"><a className="underline" target="_blank" href="https://elektropartner.nu/">Elektropartner</a></h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li><p className={`${color} responsive-text`}>Consultant job for regnet Co. Creation of a subpage system with Craft 3 CMS.</p></li>
          </ul>
          <h3 className="h3-override-ml-nil">JSON-format HTML to javaScript</h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li>
              <p className={`${color} responsive-text`}>
                Two Prototypes has been built of a
                browser-style javaScript engine that turns HTML-instructions in json-format
                into HTML and outputs it to target destination.
              </p>
           </li>
          </ul>
          <h3 className="h3-override-ml-nil">BANKID</h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li>
              <p className={`${color} responsive-text`}>
                Server communication with Swedish Bank identification-system using vanilla nodejs sockets.
              </p>
           </li>
            <li >
              <p className={`${color} responsive-text`}>Stack:  MongoDB, Nodejs, javaScript.</p>
            </li>
          </ul>
          <h3 className="h3-override-ml-nil">Learning C</h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li>
              <p className={`${color} responsive-text`}>
                I'd figure why not take the leap into the foundation! Think I'll wait
                to try assembly though.
              </p>
            </li>
          </ul>
        </article>
        <article className="pb-4 pt-4">
          <h2>School Projects</h2>
          <h3 className="h3-override-ml-nil">Movie Fan page</h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li>
              <p className={`${color} responsive-text`}>
                Stack:  MongoDB, Nodejs, javaScript, movieDB-api. No plugins.
              </p>
            </li>
          </ul>
          <h3 className="h3-override-ml-nil">Webshop</h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li>
              <p className={`${color} responsive-text`}>
                Stack:  MYSQL, PHP, javaScript. No plugins.
            </p>
            </li>
          </ul>
          <h3 className="h3-override-ml-nil">The classic TODO-list</h3>
          <ul className="pl-6 pb-4" style={listStyle}>
            <li>
              <p className={`${color} responsive-text`}>
                Stack:  MYSQL, PHP, javaScript. No plugins.
              </p>
          </li>
          </ul>
          <p className={`${color} responsive-text h3-override-ml-nil`}>...and loads of small apps</p>
        </article>
      </section>
    )}
  </ColorConsumer>
  )

}


export {Projects as Part};
