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

/*
***********************************************************************************************
****************Asynkroniskt laddning med dynamisk kodsplittning*******************************
***********************************************************************************************
*/
//Calculating the height of Nav for different screens
const calculateNavHeight = () => {
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
  document.getElementById('contact-section').classList.remove('z-10', 'contact-center', 'p-12', 'bg-gradient-card');
  //hiding close-button
   var close = document.getElementById('close-card');
   close.classList.add('hidden');
   close.removeEventListener('click', resetProfile);
   //removing some fade effects
   document.getElementById('contact-inner').classList.remove('smooth-loaded')
   document.getElementById('profile-pic').classList.remove('profile-flash');

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
            var contact = document.getElementById('contact-section');
            contact.style.display = "flex";
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
          var contact = document.getElementById('contact-section');
          contact.style.display = 'inline-block';

            if(document.getElementById('navbar')){
              calculateNavHeight();
            }
        }

    }
    componentDidUpdate(){
      this.calculateFooter();

      if(this.content.current){
        this.content.current.addEventListener("animationstart", (e) => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
        },false);
        this.content.current.addEventListener('webkitAnimationStart', (e) => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
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
    this.showNav = this.showNav.bind(this);
  }
  showNav(e){
    var nav = document.getElementById('nav-linkz');
    e.stopPropagation();
    if(nav.classList.contains('hidden')){
      nav.classList.remove('hidden');
    }else{
      nav.classList.add('hidden');
    }
  }

  contactScroll(e){
    var image = document.getElementById('profile-pic');
    var contact = document.getElementById('contact-section');

    if(e.target.id === 'contact'){
      //document.body.clientWidth to handle iframes and user resizes
      if( document.defaultView.innerWidth >= 768 && window.screen.width >= 768){
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
          div.style.height = height + 'px';
          document.body.appendChild(div);
        }else{
          var prf = document.getElementById('prf-cover');
          prf.classList.remove('hidden');
          prf.classList.add('block');
        }

        //adding css to put card in the middle of the page;
      contact.classList.add('z-10', 'contact-center', 'p-12', 'bg-gradient-card');
      //close button;
      var close = document.getElementById('close-card');
      close.classList.remove('hidden');
      close.classList.add('block', 'profile-flash');
      close.addEventListener('click', resetProfile);
      document.getElementById('contact-inner').classList.add('smooth-loaded')
      image.classList.add('profile-flash');
    }else{
      //Scroll down to contact Edge/chrome/firefox
        if(contact.getBoundingClientRect().y > 297){
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });

        }else if(contact.getBoundingClientRect().top > 297){
          contact.scrollIntoView();
        }

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
    return (
      <>
        <nav id="navbar" className={`nav-bar border-box ${this.state.lazy} `}>
          <section id="nav-linkz" className="border-box nav-linkz nav-text ">
            <div className={`nav-link-box-first bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/">About Me</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/projects">Projects</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/education">Education</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent`}>
              <NavLink className={` border-box a-link `} to="/experience">Experience</NavLink>
            </div>
            <div className={`nav-link-box bg-transparent `}>
              <button id="contact"  className={` border-box a-link `} onClick={(e) => {this.contactScroll(e)}}>Contact</button>
            </div>
          </section>
          <section className="bg-ham" onClick={(e) => {this.showNav(e)}}>
            &nbsp;
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
