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
  render(){
    return(
      <ColorConsumer>
        {({ color }) => (
          <article className="main-profile border-box">
            <div className="">
              <div className="inline-block">
                <img src="../../img/profilbild.jpg" className={`inline-block main-image rounded ${color}`} alt="..." />
              </div>
              <div className="responsive-text">
                <h4 className="text-shadow"><b>Rasmus Moberg</b></h4>
              </div>
              <address className="mt-3 w-1/3 text-shadow not-italic">
                <p id="phone"  className="text-sm leading-snug">0722724429</p>
                <a id="email" href="mailto:rasmus.krister.moberg@gmail.com"className="text-sm leading-snug">rasmus.krister.moberg@gmail.com</a>
                <p id="adress" className="text-sm leading-snug">Sköllerstagatan 27, 124 65 Bandhagen</p>
                <a href="">Min linkedin</a>
                <p id="dwl" className="text-sm leading-snug pt-3"><a href="/getcv" className={`border border-solid rounded bg-greenlight text-base bg-grad-bgcol`} download> Tanka ner mitt CV</a></p>
              </address>
            </div>
          </article>
        )}
      </ColorConsumer>

    )
    }
  }
export {Main as Part};
