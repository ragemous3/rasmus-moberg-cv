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
        aside:
          [<div>
            <Contact />
          </div>],
        bool:true,
        lacy: 'smooth-loader'
      }
      this.middle = [];
      this.aside = [];
    }
    componentDidMount(){
      this.setState((prev) => {
        return {
          lazy: 'smooth-loaded'
        }
      })
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
      console.log(this.props)
      return(
          <section id="renderhere" className="main-page-structure border-box">
              <section id="main-box" className={`align-top border-box inline-block p-3` }>
                  {
                    this.state.comp.map((Element, i) => {
                    return <div className={`z-0  ${this.state.lazy}`} key={i}>{Element}</div>;
                  })
                 }
              </section>
              <aside className={`${this.props.chunkname === 'aboutme' && this.state.lazy} w-1/2 border-box m-0 inline-block p-3`} id="aside-contact">
                {
                this.state.aside.map((Aside, i ) => {
                  console.log('rerendered')
                  return <div key={`asidecontact${i}`}>{Aside}</div>
                })
                }
            </aside>
          </section>
      )
  }
}
/*
<aside className={`${this.state.lazy} w-1/2 border-box m-0 inline-block p-3`} id="aside-contact">

</aside>
*/
// {
//     this.state.aside.map((Aside, i ) => {
//       console.log('rerendered')
//       return <div key={`asidecontact${i}`}>{Aside}</div>
//     })
// }
/*
***********************************************************************************************
*****************************NAV-BAR MED TILLHÖRANDE KOMPONENTER*******************************
***********************************************************************************************
*/

function ZmallMenu(){


  return(
    <figure className="hamburger-menu mb-3 mt-3" >
        <NavLinkz cls={'responsive-nav-text text-shadow hamburgers-relatives'} cls2={'p-3'} />
    </figure>
  )
}

  function NavLinkz(props){
  return(
    <>
    <div className={props.cls}>
      <div className={`nav-link-buttons top-left ${props.cls3 || ''}`}>
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/">About Me</NavLink>
      </div>
      <div className={`nav-link-buttons top-right ${props.cls3 || ''}`}>
        <NavLink className={`nav-link-buttons mt-20 border-box a-link ${props.cls2 || ''}`} to="/experience">Experience</NavLink>
      </div>
      <div className={`nav-link-buttons bot-left ${props.cls3 || ''}`}>
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/education">Education</NavLink>
      </div>
      <div className={`nav-link-buttons bot-right ${props.cls3 || ''}`}>
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/projects">Projects</NavLink>
      </div>
    </div>
    </>
  )
}
class Nav extends React.Component{
  constructor(props){
    super(props)

  }

  render(){

    return (
      <ColorConsumer>
        {({ tsize,  updateTextSize }) => (
          <>
            <ZmallMenu />
              <nav className="nav-bar z-10 fixed responsive-nav-text responsive-nav border-box text-shadow">
                  <section className="wrap border-box">
                      <article className="">
                      <NavLinkz className="nav-figure" />
                      </article>
                  </section>
                  <button id="txtSize" className="hint--right" aria-label="Change text size" onClick={(e) => {
                      updateTextSize()
                    }}>
                  </button>
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
import { Part } from './components/contact.js'

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
      <LoadAsync chunkname="Projects" url="./components/projects.js" />
    </>
  )
}
/*
***********************************************************************************************
***************************************Footer**************************************************
***********************************************************************************************
*/
function Aside(){
  return(
    <aside className={`smooth-loaded w-1/2 border-box m-0 inline-block p-3`} id="aside-contact">
      <Contact />
    </aside>
  )
}

/*
***********************************************************************************************
*****************************Routing med react-router******************************************
***********************************************************************************************
*/

const routes = (
  <ColorProvider>
    <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact={true} component={AboutMe} />
          <Route exact path="/experience" component={Knowledge}/>
          <Route exact path="/education" component={Education}/>
          <Route exact path="/projects" component={Projects}/>
          <Route render={() => {return <LoadAsync chunkname="error" url={'./components/404.js'} />}} />
        </Switch>
    </BrowserRouter>
  </ColorProvider>
)

ReactDOM.render(routes, document.getElementById('root'));
