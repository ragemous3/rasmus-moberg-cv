import React, { useContext } from 'react'
// import { ColorConsumer } from './colorcontext.js';


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
    this.state = {
      lazy: 'smooth-loader'
    }
    this.mailCopy = this.mailcopy.bind(this);
    this.onLoading = this.onLoading.bind(this);
  }
  mailcopy(e){
    var el = document.createElement('input');
    el.style.height = 1 + 'px';
    el.style.width = 1 + 'px';
    el.value = 'rasmus.john.moberg@gmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('mailtoer').setAttribute('aria-label', 'Email Copied!');

      setTimeout(function(){
         document.getElementById('mailtoer').setAttribute('aria-label', 'Click to copy email to clipboard!');
       }, 3000);

  }
  onLoading(){
    this.setState(() => {
      return {lazy: 'smooth-loaded'}
    });
  };
  render(){
    return(
          <aside id="contact-section" onLoad={(e) => this.onLoading(e)} className={` main-card border-box ${this.state.lazy}`}>
            <div id="close-card" className="close-card general-shadow">
              <img  className="close-image" src="../../img/close32.png"  alt="close card" />
            </div>
            <article id="contact-inner" className="inner-card h-full">
              <div className="relative block main-image object-center">

                <figure id="profile-carrier ">
                  <img id="profile-pic" src="../../img/profilbild.jpg" className={`general-shadow border-box `} alt="A picture of Rasmus" />
                </figure>
              </div>
                <div className="responsive-text main-card-text smooth-">
                  <h4 className="text-shadow pt-4"><b>Rasmus Moberg</b></h4>
                    <address className="text-shadow not-italic block ">
                      <p id="phone" className=" contact-text-box">0722724429
                      </p>
                      <p id="adress" className=" contact-text-box">
                        Sköllerstagatan 27,
                      </p>
                      <p className=" text-sm">124 65, Bandhagen</p>
                      <div className="leading-snug pt-3 flex flex-1 flex-row">
                        <a href="https://www.linkedin.com/in/rasmus-moberg-0aba88174/" target="_blank">
                          <svg className="m-1 mb-0 floatAsideClick  i-linkedin PointerCursor">
                          </svg>
                        </a>
                        <a  id="mailtoer" onClick={(e) => {this.mailCopy()}} className="hint--bottom" aria-label="Click to copy email to clipboard!">
                          <svg className="m-1 mb-0 floatAsideClick  i-gmail PointerCursor">
                          </svg>
                        </a>
                        <a href="/getcv"  download>
                          <svg className="m-1 mb-0 floatAsideClick i-cv PointerCursor">
                          </svg>
                        </a>
                      </div>
                    </address>
                </div>
              </article>
          </aside>
    )
    }
  }

export {Main as Part};
