import React, { useContext } from 'react'
import { ColorConsumer } from './colorcontext.js';


function Main(){
  return(
      <>
        <Card />
      </>
  )
}
// ColorConsumer tar en "render-prop"
class Card extends React.Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
    document.getElementById('contact-section').classList.remove('hidden');
  }
  render(){
    //            <article className="main-profile border-box">

    return(
      <ColorConsumer>
        {({ color }) => (
          <aside id="contact-section" className={`main-card border-box smooth-loaded hidden`}>
            <div className="block main-image">
              <figure id="profile-carrier">
                <img id="profile-pic" src="../../img/profilbild.jpg" className={`rounded  border-box `} alt="A picture of Rasmus" />
              </figure>
            </div>
              <div className="responsive-text main-card-text">
                <h4 className="text-shadow"><b>Rasmus Moberg</b></h4>
                  <address className="text-shadow not-italic block contact-profile-text">
                    <p id="phone" className="typewriter-text contact-text-box">0722724429
                    </p>
                    <p id="adress" className="typewriter-text contact-text-box">
                      Sköllerstagatan 27,
                    </p>
                    <p className="typewriter-text text-sm">124 65,</p>
                    <p className="typewriter-text text-sm">Bandhagen</p>
                    <div className="leading-snug pt-3 flex flex-1 flex-row">
                      <a href="https://www.linkedin.com/in/rasmus-moberg-0aba88174/" target="_blank">
                        <svg className="m-1 floatAsideClick  i-linkedin PointerCursor">
                        </svg>
                      </a>
                      <a href="mailto:rasmus.krister.moberg@gmail.com"  className="hint--bottom" aria-label="rasmus.krister.moberg@gmail.com">
                        <svg className="m-1 floatAsideClick  i-gmail PointerCursor">
                        </svg>
                      </a>
                      <a href="/getcv"  download>
                        <svg className="m-1 floatAsideClick i-cv PointerCursor">
                        </svg>
                      </a>
                    </div>
                  </address>
              </div>
          </aside>
        )}
      </ColorConsumer>
    )
    }
  }

export {Main as Part};
