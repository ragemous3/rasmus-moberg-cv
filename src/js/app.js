/*
****************************************
****************Import/export***********
****************************************
*/
  //Instead of babel-polyfill
  //core-js is the engine that uses preset-env to polyfill code. It uses babels "targets"
  //to import correct polyfills so that written code works as expected
  import "core-js/stable";
  import "regenerator-runtime/runtime" ;
  import 'hint.css';
  import React, { useState, useContext } from 'react';
  import ReactDOM from 'react-dom';
  // import { ColorProvider, ColorConsumer} from './components/colorcontext.js';
  import {BrowserRouter, Route, Link, Switch, NavLink} from "react-router-dom";
  import { Part } from './components/contact.js';
  import smoothscroll from 'smoothscroll-polyfill';



/*
***********************************************************************************************
****************Asynkroniskt laddning med dynamisk kodsplittning*******************************
***********************************************************************************************
*/

// kick off the polyfill!
smoothscroll.polyfill();

//Calculating the height of Nav for different screen-sizes. ()
const calculateNavHeight = () => {
  //this triggers two times. Yes it is not necessary!
  var navbar = document.getElementById('nav-linkz');
  var ham = document.getElementById('hamburger-id')

  if(document.defaultView.innerWidth <= 767 || window.screen.width <= 767){

    navbar.classList.remove('flex', 'flex-col', 'flex-1', 'flex-wrap', 'items-start', 'justify-between', 'p-6', 'pt-0');


  }else if(document.defaultView.innerWidth >= 768 || window.screen.width >= 768){
    //Profile-image scales as the screens get larger. This code puts the height
    //of the box where the image is located and applies it to the navbar.
    var contactSection = document.getElementById('contact-section').clientHeight;
    navbar.classList.remove('hidden');//if browser window is resizing full while menu is hidden
    navbar.style.height = contactSection + 'px';
    navbar.classList.add('flex', 'flex-col', 'flex-1', 'flex-wrap', 'items-start', 'justify-between', 'p-6', 'pt-0');
  }
}

//resetting scaled up contact-card to original position
const resetProfile = (e) => {
  let prfcover = document.getElementById('prf-cover');
  prfcover.classList.remove('block');
  prfcover.classList.add('hidden');

  //reseting contact-card;
  let contact = document.getElementById('contact-section');

  contact.classList.remove('z-10', 'main-card-bg', 'contact-center', 'general-shadow', 'p-4');

  //hiding close-button
   var close = document.getElementById('close-card');
   close.classList.add('hidden');
   close.removeEventListener('click', resetProfile);
   //removing some fade effects
   document.getElementById('contact-inner').classList.remove('smooth-loaded')
   document.getElementById('profile-pic').classList.remove('profile-flash');

}
const disableScrolling = (e) => {
  e.preventDefault();
  return false;
}

class FrontPage extends React.Component{
  constructor(props){
    super(props);

    //creating reference
    this.fp = React.createRef();
    //function binds
    this.onTouch = this.onTouch.bind(this);

    //disabling scrolling for android and ios, and all browsers
    let html = document.documentElement;
    let body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
        body.addEventListener('touchmove', disableScrolling);
        html.addEventListener('touchmove', disableScrolling);
  }
  onTouch(e){
    e.target.addEventListener('touchmove',  disableScrolling);
  }
  componentDidUpdate(){
    if(this.fp.current){
      //activates normal scrolling after page animation

      this.fp.current.addEventListener('animationend', (e) => {
        if(e.target.id == 'frontP-cover'){
          this.fp.current.style.display = 'none';
          let html = document.documentElement;
          let body = document.body;
          //enabling scrolling for both IOS and Android,
          html.style.overflow = "";
          body.style.overflow = "";
          //Enabling scrolling for IOS and Android
          e.target.removeEventListener('touchmove', disableScrolling);
          body.removeEventListener('touchmove', disableScrolling);
          html.removeEventListener('touchmove', disableScrolling);
        }
      })
      this.fp.current.addEventListener('webkitAnimationEnd', (e) => {
        if(e.target.id == 'frontP-cover'){
          this.fp.current.style.display = 'none';
        }
      })
    }
  }
  render(){

    //make page unscrollable
    var svgStyle = {
      'stroke': 'white',
      'fill': 'white'
    }
    return(
      <div id="frontP-cover" onTouchMove={(e) => {this.onTouch(e)}} className="front-page-cover" ref={this.fp}>
        <div className="front-page-inner" onTouchMove={(e) => {this.onTouch(e)}}>
          <h1 className="front-page-name ">
            Rasmus
          </h1>
            <svg className="the-underline" >

              <line x="20" x2="300" style={svgStyle} >
              </line>
              <circle style={svgStyle}>
              </circle>
            </svg>
          <h1 className="front-page-surname ">
            Moberg
          </h1>
          <h1 className="devel">
            Developer
          </h1>
        </div>
      </div>
    )
  }
}



  class LoadAsync extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        comp: [],
        lazy: 'smooth-loader'
      }

      this.middle = [];
      this.aside = [];
      this.mobileResizer = this.mobileResizer.bind(this);
      this.calculateFooter = this.calculateFooter.bind(this);
      this.content = React.createRef();
      this._isMounted = true;

    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.mobileResizer);
      this._isMounted = false;

    }
    componentDidMount(){

      //https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html <---- läs denna och fixa läckan!
      //man måste checka och "avcheka"  _isMounted för att förhindra memory-leak? fun
      this._isMounted = false;

      this.setState((prev) => {
        return {lazy: 'smooth-loaded'}
      })

      window.addEventListener('resize', this.mobileResizer);

    }

    componentWillMount(){
      if(this._isMounted === true && this.props.url){
        //Syntax supporter by babels '@babel/plugin-syntax-dynamic-import'
        import(/*webpackChunkName: "[request]"*/ /* webpackMode: "lazy" */ '' + this.props.url).then(({Part}) => {
          this.middle.push(<Part />);
            this.setState((prev) => {
              return{
                comp: this.middle
              }
            })
            }).catch((e) => {
                console.log(`Error With dynamic import! Error: ${e}`);
            })
        return true
      }else{
        return false;
      }
    }
    mobileResizer(e){
      //  window.screen.width  //true width of device
      //document.getElementById('hamburger-id').classList.remove('activated');
      var innerwidth = document.body.offsetWidth;
      var navbar = document.getElementById('nav-linkz');
      var ham = document.getElementById('ham-placeholder')

        if(innerwidth >= 614){
          ham.classList.add('hidden');
          navbar.classList.remove('hidden');
        }else if(innerwidth <= 613 || window.screen.width <= 613){ //resize
          ham.classList.remove('hidden');
          navbar.style.height = ""; //nullling previous height
        }

        if(document.defaultView.innerWidth <= 767 || window.screen.width <= 767){

          //kalkulera footer
          this.calculateFooter();
          //kalkulera navbaren
          calculateNavHeight();
          //If user resizes window when contact-page is up. Checking if it's ever been clicked
          if(document.getElementById('prf-cover')){
            resetProfile();
          }
          if(document.getElementById('contact-section')){
            if(this.props.url !== './components/home.js'){
              var contact = document.getElementById('contact-section');
              contact.style.display = "flex";
            }
            try{
              if(!this.props.chunkname){
                if(this.props.chunkname === "projects"){
                  main.classList.add('h-full')
                }else if(this.props.chunkname === "experience"){
                  main.classList.remove('h-full');

                }else{
                  main.classList.remove('h-full');
                }
              }
            }catch(e){
              console.log(e)
            }
          }
        }else{
          //contact is hidden at first page-load
          if(
            document.getElementById('contact-section') && this.props.url !== './components/home.js'){
            var contact = document.getElementById('contact-section');
            contact.style.display = 'inline-block';
            contact.classList.remove('before-card');
          }
          if(document.getElementById('navbar')){
            calculateNavHeight();
          }
        }

    }
    componentDidUpdate(){
      this.calculateFooter();
      if(this.content.current){
        this.content.current.addEventListener("animationstart", (e) => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        },false);
        this.content.current.addEventListener('webkitAnimationStart', (e) => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        })
      }

    }

    calculateFooter(){
      if(this.content.current){
        var contact = document.getElementById('contact-section').style;
        if(document.defaultView.innerWidth <= 767 || window.screen.width <= 767){
          var main = document.getElementById('main-page-structure');
          main.style.height = this.content.current.offsetHeight + 'px';
        }else{
          contact.top = "";
        }
      }
    }
    render(){
      return(
        <section id="main-box" className={` responsive-text border-box inline-block` }>
          {window.location.pathname === '/' &&
            <FrontPage />
          }
          {
            this.state.comp.map((Element, i) => {
              return <article ref={this.content}   className={`${this.state.lazy} main-text-box text-shadow pb-1333`} key={this.props.chunkname}>{Element}</article>
            })
          }
        </section>
      )
  }
}

/*
***********************************************************************************************
*****************************NAV-BAR DYNAMICS MODERBOARD***************************************
***********************************************************************************************
*/

class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      lazy: 'smooth-loader'
    }
    this.contactScroll = this.contactScroll.bind(this);
    this.closeOnEscape.bind(this);
    this.showNav = this.showNav.bind(this);
  }
  showNav(e){
    var navbar = document.getElementById('nav-linkz');
    var ham = document.getElementById('hamburger-id');
    if(navbar.classList.contains('hidden')){
      navbar.classList.remove('hidden');
      navbar.classList.add('smooth-loaded');
      ham.classList.remove('activated');
    }else{
      navbar.classList.add('hidden', );
      navbar.classList.remove('smooth-loaded')
      ham.classList.add('activated');
    }
  }
  closeOnEscape(e){
    if(e.key == 'Escape' || e.key == 'Esc'){
      document.removeEventListener('keydown', this.closeOnEscape);
      resetProfile(e);
    }
  }
  contactScroll(e){
    var image = document.getElementById('profile-pic');
    image.classList.remove('profile-flash');
    var contact = document.getElementById('contact-section');
    var main = document.getElementById('main-page-structure');
      //document.body.clientWidth to handle iframes and user resizes
      if(e.target.id === 'contact' && document.defaultView.innerWidth >= 768 && window.screen.width >= 768){
      //if there are no cover. Create it and put it out on the screen;
        //in case of employer hides nav and resizing browser window
        if(!document.getElementById('prf-cover')){
        //  Get the computed heights of all elements;
          var body = document.body;
          var html = document.documentElement;
          //get the heighest calculated height!
          var height = Math.max(body.scrollHeight, body.offsetHeight,
                   html.clientHeight, html.scrollHeight, html.offsetHeight);

          var div = document.createElement('div');
          div.id = 'prf-cover';
          div.classList.add('profile-cover', 'block');
          //apply the highest height
          div.style.height = height + 'px';
          document.body.appendChild(div);
        }else{
          var prf = document.getElementById('prf-cover');
          prf.classList.remove('hidden');
          prf.classList.add('block');
        }

      //adding css to put card in the middle of the page;
      contact.classList.add('p-4','z-10', 'contact-center', 'main-card-bg', 'general-shadow');

      //close button of contact-card;
      var close = document.getElementById('close-card');
      close.classList.remove('hidden');
      close.classList.add('block', 'profile-flash');
      close.addEventListener('click', resetProfile);
      //adding close-effect on escape-button;
      document.addEventListener('keydown', this.closeOnEscape);
      document.getElementById('contact-inner').classList.add('smooth-loaded')
      image.classList.add('profile-flash');
    }else{
      //Scroll down to contact Edge/chrome/firefox
        var rect = contact.getBoundingClientRect();
        if(e.target.id === 'contact'){

          if(rect.y < 400  || rect.top < 400){
            contact.classList.add('before-card');
            image.classList.add('profile-flash');
          }else{
            contact.scrollIntoView({left: 0, behavior: "smooth"});
          }
        }else{
          //prevent bad looking rendering when getting other components;
          if(e.target.pathname === location.pathname){
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });

          }
          contact.classList.remove('before-card');
          image.classList.remove('profile-flash');
        }
   }
 }

  componentDidMount(){
    this.setState(() => {
      return {lazy: 'smooth-loaded2'}
    })
    //If lower than 614px hide the navbar
    var ham = document.getElementById('ham-placeholder');
    if(document.body.offsetWidth >= 614){
      ham.classList.add('hidden');
    }else{
      ham.classList.remove('hidden');
    }

  }
  render(){
    /*
    //In case a The first page should be other than "aboutme"-me
    <div className={`nav-link-box-first bg-transparent`}>
      <NavLink className={` border-box a-link `} to="/"  onClick={(e) => {this.contactScroll(e)}}>Home</NavLink>
    </div>

    */
    return (
      <>
        <nav id="navbar" className={`nav-bar border-box ${this.state.lazy} `}>
          <article className="hamburger-placeholder" id="ham-placeholder">
            <section id="hamburger-id" className="bg-ham" onClick={(e) => {this.showNav(e)}}>
              <svg viewBox="0 0 100 100">
                  <path
                    d="
                       M 50,16
                       l 0,72
                       M 20,60
                       l 30,28
                       M 80,60
                       l -30,28"
                    stroke="#0096dd"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
            </section>
          </article>
          <section id="nav-linkz" className="border-box nav-linkz nav-text ">
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/about"  onClick={(e) => {this.contactScroll(e)}}>About Me</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/projects"  onClick={(e) => {this.contactScroll(e)}}>Projects</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/education"  onClick={(e) => {this.contactScroll(e)}}>Education</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/experience"  onClick={(e) => {this.contactScroll(e)}}>Experience</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent `}>
              <button id="contact"  className={` border-box a-link `} onClick={(e) => {this.contactScroll(e)}}>Contact</button>
            </div>
          </section>
        </nav>
      </>
    )
  }
}

/*
***********************************************************************************************
************************************"MELLANKOMPONENTER"****************************************
***********************************************************************************************
*/

function AboutMe(props){
  return (
  <>
   {<LoadAsync chunkname="aboutme" url="./components/aboutme.js" />}
  </>
  )
}
function Home(props){
  return (
    <>
      {<LoadAsync chunkname="aboutme" url="./components/home.js" />}
    </>
  )
}
function Knowledge(){
  return (
    <>
      <LoadAsync chunkname="experience" url="./components/experience.js" />
    </>
  )
}
function Education(){
  return (
    <>
      <LoadAsync chunkname="education" url="./components/education.js" />
    </>
  )
}
function Projects(){
  return (
    <>
      <LoadAsync chunkname="projects" url="./components/projects.js" />
    </>
  )
}

/*
***********************************************************************************************
*****************************Routing with react-router******************************************
***********************************************************************************************
*/
class Routes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contact: []
    }
    this.onContactLoad = this.onContactLoad.bind(this);

  }



  onContactLoad(e){
    calculateNavHeight();
  }

  componentWillMount(){
    import(/*webpackChunkName: "[request]"*/ /* webpackMode: "lazy" */ './components/contact.js').then(({Part}) => {
      this.setState((prev) => {
        return{
          contact: [<Part />]
        }
      })
          }).catch((e) => {
              console.log(`Error With dynamic import! Error: ${e}`);
        })
  }

  render(){
    return(
        <BrowserRouter>
          <Nav />
            <section id="main-page-structure" className="main-page-structure border-box align-top">
              <Switch>
                <Route exact={true} path="/"  component={AboutMe} />
                <Route exact={true} path="/about"  component={AboutMe} />
                <Route exact={true} path="/experience" component={Knowledge}/>
                <Route exact={true} path="/education" component={Education}/>
                <Route exact={true} path="/projects" component={Projects}/>
                <Route render={() => {return <LoadAsync chunkname="error" url={'./components/404.js'} />}} />
              </Switch>
            </section>
            {

              this.state.contact.map((Element, i) => {
                  return (<div id="card-wrap" onLoad={(e) => { this.onContactLoad(e) }} className="inline-block align-top main-card-wrapper" key={`Contact${i}`}>{Element}</div>);
              })
            }
        </BrowserRouter>
    )
  }
}
ReactDOM.render(<Routes />, document.getElementById('root'));
