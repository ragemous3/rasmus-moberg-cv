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
      <ColorConsumer>
        {({ tsize }) => (
          <>
            <div className="responsive-text">
              <h1>About me</h1>
                <article>
                    <p className={`leading-snug text-shadow ${ tsize }`}>
                      Hi!
                      My name is Rasmus Moberg, a programming student and a small business owner.
                      As you're reading this you're probably ask yourself why you should hire me.
                      The answer to that question is that you would've hired a straight A student.
                      As of now I've completed one job at the same time as I was studying, learning new Programming
                      languages in order to complete that job.
                      As a programmer I'm most skilled at javaScript but I will take a leap into more strict programming given the opportunity.
                      As you've read above my experience is limited, but if given a task with no preknowledge
                      I will find out how to do it -- ofcourse with a deadline that fits us both.
                      <br>
                      </br>
                      <br>
                      </br>
                      This page was created with react, some vanilla js, node(with express) as a server, slimified with webpack and styled with tailwind.js. It works on mobile and that can be checked out <a href="http://quirktools.com/screenfly/" className="underline">here</a>. You can check out the code for this website <a href="https://github.com/ragemous3/rasmus-moberg-cv" className="underline"> here</a>.
                    </p>
                </article>
              </div>
          </>
        )}
      </ColorConsumer>

    )
    }
  }
export {AboutIt as Part};
