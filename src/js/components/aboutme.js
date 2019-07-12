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
                      My name is Rasmus Moberg, a programming student and a small freelance-business owner.
                      As you're reading this you're probably ask yourself why you should hire me.
                      The answer to that question is that you would've hired a person that
                      does what it takes to get the job done, a straight A student and a future
                      investment. I've completed one job at the same time as I was studying, learning new programming
                      languages in order to complete that job. If you would like to know more about me as a person
                      feel free to contact me!
                      <br>
                      </br>
                      <br>
                      </br>
                    </p>
                    <h1 className="pt-6">About this page</h1>
                    <p className="responsive-text">
                      This page was created with react, some vanilla js, node(with express) as a server and
                      slimified with webpack.
                      It works on most mobile and that can be checked out <a href="http://quirktools.com/screenfly/" className="underline">here</a>.
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
