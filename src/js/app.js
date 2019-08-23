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
//Calculating the height of Nav for different screens
const calculateNavHeight = () => {
  //this triggers two times. Yes it is not necessary!

  if(document.defaultView.innerWidth <= 767 || window.screen.width <= 767){
    var navbar = document.getElementById('nav-linkz');
    navbar.classList.remove('flex', 'flex-col', 'flex-1', 'flex-wrap', 'items-start', 'justify-between', 'p-6', 'pt-0');
  }else if(document.defaultView.innerWidth >= 768 || window.screen.width >= 768){
    var navbar = document.getElementById('nav-linkz');
    var contactSection = document.getElementById('contact-section').clientHeight;
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
  document.getElementById('contact-section').classList.remove('z-10', 'main-card-bg', 'contact-center', 'p-12', 'general-shadow');
  //hiding close-button
   var close = document.getElementById('close-card');
   close.classList.add('hidden');
   close.removeEventListener('click', resetProfile);
   //removing some fade effects
   document.getElementById('contact-inner').classList.remove('smooth-loaded')
   document.getElementById('profile-pic').classList.remove('profile-flash');

}
class FrontPage extends React.Component{
  constructor(props){
    super(props);
    this.fp = React.createRef();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  componentDidUpdate(){
    if(this.fp.current){
      //activates normal scrolling after page animation

      this.fp.current.addEventListener('animationend', (e) => {
        if(e.target.id == 'frontP-cover'){
          this.fp.current.style.display = 'none';
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
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
      <div id="frontP-cover" className="front-page-cover" ref={this.fp}>
        <div className="front-page-inner">
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
      document.getElementById('hamburger-id').classList.remove('activated');
      var innerwidth = document.body.offsetWidth;
        if(innerwidth >= 614){
          let navbar = document.getElementById('nav-linkz')
          navbar.classList.remove('hidden');
        }else if(innerwidth <= 613 || window.screen.width <= 613){ //resize
          let navbar = document.getElementById('nav-linkz')
          navbar.classList.add('hidden');
          navbar.style.height = '';
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
        }else if(document.getElementById('contact-section')){
          //contact is hidden at first page-load
          if(this.props.url !== './components/home.js'){
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
*****************************NAV-BAR MED TILLHÖRANDE KOMPONENTER*******************************
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
    var nav = document.getElementById('nav-linkz');
    var ham = document.getElementById('hamburger-id')
      if(nav.classList.contains('hidden')){
        nav.classList.remove('hidden');
        nav.classList.add('smooth-loaded');
        ham.classList.add('activated');
      }else{
        nav.classList.add('hidden', );
        nav.classList.remove('smooth-loaded')
        ham.classList.remove('activated');
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
      contact.classList.add('z-10', 'contact-center', 'p-12', 'main-card-bg', 'general-shadow');
      //close button;
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
    if(document.body.offsetWidth >= 614){
        document.getElementById('nav-linkz').classList.remove('hidden');
    }else{
        document.getElementById('nav-linkz').classList.add('hidden');

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
          <section id="nav-linkz" className="border-box nav-linkz nav-text ">
            <div className={`nav-link-box-first bg-transparent`}>
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
          <section id="hamburger-id" className="bg-ham" onClick={(e) => {this.showNav(e)}}>
            <span>
            </span>
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
