/*
****************************************
****************Import/export***********
****************************************
*/
  import React, { useState, useContext } from 'react';
  import ReactDOM from 'react-dom';
  import('hint.css')
  import { ColorProvider, ColorConsumer} from './components/colorcontext.js';
  import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
  import  {Help} from './helpers.js'
  import { Part } from './components/contact.js'
  /*
  ***********************************************************************************************
  ****************Asynkroniskt laddning med dynamisk kodsplittning*******************************
  ***********************************************************************************************
  */
  class LoadAsync extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        comp: [],
        lacy: 'smooth-loader'
      }
      this.middle = [];
      this.aside = [];
      this.mobileResizer = this.mobileResizer.bind(this);
    }
    componentDidMount(){
      window.addEventListener('resize', this.mobileResizer);
      this.setState((prev) => {
        return {
          lazy: 'smooth-loaded'
        }
      })
    }
    mobileResizer(e){

      if(window.screen.width >= 614 && document.defaultView.innerWidth >= 614){
        document.getElementById('nav-linkz').classList.remove('hidden');
      }else{
        document.getElementById('nav-linkz').classList.add('hidden');
      }
      var main = document.getElementById('main-page-structure');



        if(document.defaultView.innerWidth <= 767 || window.screen.width <= 767){
          if(document.getElementById('contact-section')){
            var contact = document.getElementById('contact-section');
            contact.style.display = "flex";
            try{
              console.log(this.props.chunkname)
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
        }

    }
    componentWillMount(){

      if(this.props.url){
        //Syntax supporter by babels '@babel/plugin-syntax-dynamic-import'
        import(/*webpackChunkName: "[request]"*/ /* webpackMode: "lazy" */ `${this.props.url}`).then(({Part}) => {
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
    render(){
      return(
        <section id="main-box" className={`border-box inline-block ${this.state.lazy}` }>
          {
            this.state.comp.map((Element, i) => {
              return <div key={i}>{Element}</div>
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
    image.classList.remove('profile-flash');
    if(document.getElementById('contact-section') && e.target.id === 'contact'){
      var id = document.getElementById('contact-section').getBoundingClientRect();
      console.log(id)
      if(id.y > 297){
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }else{
        image.classList.add('profile-flash');
      }
    }else{
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  render(){
    //z-10 fixed
    return (
      <ColorConsumer>
        {({ tsize,  updateTextSize }) => (
          <>
            <nav className="nav-bar border-box text-shadow">
              <section id="nav-linkz" className="border-box nav-linkz smooth-loaded nav-text hidden">
                <div className={`nav-link-box`}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/" onClick={(e) => {this.contactScroll(e)}}>About Me</NavLink>
                </div>
                <div className={`nav-link-box`}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/projects" onClick={(e) => {this.contactScroll(e)}}>Projects</NavLink>
                </div>
                <div className={`nav-link-box`}>
                  <button id="contact" className={`nav-link-buttons border-box a-link text-shadow`} onClick={(e) => {this.contactScroll(e)}}>Contact</button>
                </div>
                <div className={`nav-link-box-adjustment nav-link-box`}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/education" onClick={(e) => {this.contactScroll(e)}}>Education</NavLink>
                </div>
                <div className={`nav-link-box-adjustment nav-link-box`}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/experience" onClick={(e) => {this.contactScroll(e)}}>Experience</NavLink>
                </div>
                <article className="small-icons wrap border-box p-3">
                    <div className="flex flex-1 flex-auto">
                      <button id="txtSize" className="hint--right" aria-label="Change text size" onClick={(e) => {
                        updateTextSize()
                      }}>
                      </button>
                  </div>
                </article>
              </section>
              <section className="bg-ham" onClick={(e) => {this.showNav(e)}}>
                &nbsp;
              </section>
            </nav>
          </>
        )}
      </ColorConsumer>
    )
  }
}

/*
***********************************************************************************************
************************************"MELLANKOMPONENTER"****************************************
***********************************************************************************************

  I den här sektionen så görs större css-förändringar.
  "whatClass"-attributen bestämmer vad utseendet på wrappern ska ha för varje
  enskild komponent förutom nav-bar ska ha för klass och därmed bestämmer den utseende av sidan.

  "chunkname" är vad komponenten ska heta när den laddas in i browsern.
  Hjälpsamt vid debugging för att veta att man får rätt komponent till
  rätt URL.

  Alla komponenter här syftar egentligen bara till att rendera detta:
  <LoadAsync chunkname="main" whatClass="main-page-structure border-box" url="./components/main.js" />

*/
//typewriter-text
function Contact(props){
  //   { <LoadAsync chunkname="contact" whatClass={props.cls ? props.cls : 'border-box'} url="./components/contact.js" />}
  return (
    <>
     <Part />
    </>
  )
}
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
***************************************Footer**************************************************
***********************************************************************************************
*/
function Footer(){
  return(
    <footer className="footer">
        <div id="footer-content">
          &nbsp;
        </div>
    </footer>
  )
}
/*
***********************************************************************************************
***************************************Contact-info********************************************
***********************************************************************************************
*/
function Aside(){
  return(
    <>
      <LoadAsync chunkname="Contacts" url="./components/contact.js" clsname="align-top inline-block" />
    </>
  )
}

/*
***********************************************************************************************
*****************************Routing med react-router******************************************
***********************************************************************************************
*/

const Routes = (
  <ColorProvider>
    <BrowserRouter>
      <Nav />
        <section id="main-page-structure" className="main-page-structure pb-1333 border-box align-top">
          <Switch>
            <Route path="/" exact={true} component={AboutMe} />
            <Route exact path="/experience" component={Knowledge}/>
            <Route exact path="/education" component={Education}/>
            <Route exact path="/projects" component={Projects}/>
            <Route render={() => {return <LoadAsync chunkname="error" url={'./components/404.js'} />}} />
          </Switch>
        </section>
      <Contact />
    </BrowserRouter>
  </ColorProvider>
)

ReactDOM.render(Routes, document.getElementById('root'));
