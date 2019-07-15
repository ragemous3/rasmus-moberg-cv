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
                <article>
                    <p className={`leading-snug text-shadow responsive-text`}>

                      My name is Rasmus Moberg, a programming student and a freelance-business owner based in Stockholm.
                      I've created this website for you - Take a look around! If you like what you see; i'm available as of now
                      now for internship later in october and also for smaller jobs, such as a website).
                      <br>
                      </br>
                      <br>
                      </br>
                      To describe myself as a programmer I would say that I'm
                      thorough for my level of experience(junior) and always manage
                      to solve everything I want to do. JavaScript is my main language and has so far gotten the highest grades
                      in all courses. I am however looking forward to learning other languages and broaden my programmatic knowledge, I'm always up for a challenge.
                      <br>
                      </br>
                      <br>
                      </br>
                      As a person I would say the most defining things is that I'm empathetic, love to just talk about anything
                      and end to try new things.
                    </p>
                    <h1 className="pt-6">About this page</h1>
                    <p className="leading-snug responsive-text">
                      This page was created with react, some vanilla js, node(with express) as a server and
                      slimified with webpack.
                      It has a mobile-format and a tabloid-format, and that can be checked out <a href="http://quirktools.com/screenfly/" className="underline">here</a>,
                      or simply just resize your browser window.
                      You can check out the code for this website <a href="https://github.com/ragemous3/rasmus-moberg-cv" className="underline"> here</a>.
                      I've not tested all browser but this site should have a pretty great polyfill-cover for most browsers.
                    </p>
                </article>
              </div>
          </>

    )
    }
  }
export {AboutIt as Part};
