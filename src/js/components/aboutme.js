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
          <article className="border-box text-shadow ">
            <div className="responsive-text">
              <h2 className="mb-4">About me</h2>
                <article>
                    <p className={`leading-snug text-shadow ${ tsize }`}>
                        Hello! My name is Rasmus Moberg. I started studying programming
                        last year at 25 years old still figuring out what I wanted todo with
                        my life. After a bit of research i found programming goes
                        hand in hand with my personality. Basically I really enjoy the dopamine
                        rushes i get from solving problems, finding smart solutions and learning new things!
                        <br></br>
                        <br></br>
                        I have so far gotten highest grades (VG in swedish) in every test i've done in
                        programming so do not hesitate to contact me.
                    </p>
                </article>
              </div>
          </article>
        )}
      </ColorConsumer>

    )
    }
  }
export {AboutIt as Part};
