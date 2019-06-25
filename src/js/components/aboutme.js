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
              <h2 className="mb-4">About me</h2>
                <article>
                    <p className={`leading-snug text-shadow ${ tsize }`}>
                      Hi!
                      My name is Rasmus Moberg and got into programming last year and has pretty much coded since.
                      Programming goes pretty much hand in hand with my personality and whatever language you want me to learn i will learn it to complete the task at hand as i've done before. Im most skilled at javaScript but I will take a leap into more strict programming given the chance.
                      <br>
                      </br>
                      <br>
                      </br>
                      This page was created with react, some vanilla js, node(with express) as a server, slimified with webpack and styled with tailwind.js. It works and mobile and can be checket out <a href="http://www.responsinator.com" className="underline">here</a>. You can check out the code for this website <a href="https://github.com/ragemous3/rasmus-moberg-cv" className="underline"> here</a>.
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
