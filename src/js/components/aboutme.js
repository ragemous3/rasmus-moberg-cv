import React, { useContext } from 'react'
import { ColorConsumer } from './colorcontext.js';


function AboutIt(){
  return(
      <>
        <AboutText />
      </>
  )
}
// ColorConsumer tar en "render-prop"
class AboutText extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(

          <>
            <div>
              <h1>About me</h1>
                <article className="pb-4">
                      <div className="pb-4 leading-loose text-shadow responsive-text">
                        My name is Rasmus Moberg, a junior web developer currently studying the fine arts
                        of javaScript. I'm also the owner of a freelance business currently available for hiring.
                        I've created this website for you - Take a look around! If you like what you see; I'm available as of now
                         for internship later in October.
                     </div>
                     <div className="pb-4 leading-loose text-shadow responsive-text">
                        To describe myself as a programmer I would say that I'm
                        knowledgeable and thorough for my level of experience and that I'm always looking for the best way
                        to solve any problem.
                        JavaScript is my main language and has so far gotten the highest grades
                        in all courses. I am however learning other languages to broaden my programmatic knowledge, I'm always up for a challenge.
                     </div>
                     <div className="pb-4 leading-loose text-shadow responsive-text">
                        As a person I would say the most defining things is that I'm empathetic, love to just talk about anything and
                        to try new things.
                      </div>
                </article>
                <article>
                  <h1>About this page</h1>
                    <div className="pb-4 leading-loose text-shadow responsive-text">
                      This page was created with react, some vanilla js, node(with express) as a server and
                      slimified with webpack.
                      The website works great in both mobile- and tabloid-format, and that can be checked out,
                      or simply by resizing your browser window.
                    </div>
                    <div className="pb-4 leading-loose text-shadow responsive-text">
                    You can check out the code for this website <a href="https://github.com/ragemous3/rasmus-moberg-cv" className="underline"> here</a>.
                    This site have a pretty great polyfill-cover for most browsers.
                    </div>
                </article>
              </div>
          </>

    )
    }
  }
export {AboutIt as Part};
