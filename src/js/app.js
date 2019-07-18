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
const calculateNavHeight = () => {
  if(document.defaultView.innerWidth <= 767 || window.screen.width <= 767){
    var navbar = document.getElementById('nav-linkz');
    navbar.classList.remove('flex', 'flex-col', 'flex-1', 'flex-wrap', 'items-start', 'justify-between', 'p-6', 'pt-0');
  }else if(document.defaultView.innerWidth >= 767 || window.screen.width >= 767){
    var navbar = document.getElementById('nav-linkz');
    var contactSection = document.getElementById('contact-section').offsetHeight;
    navbar.style.height = contactSection + 'px';
    console.log('calculation made');
        navbar.classList.add('flex', 'flex-col', 'flex-1', 'flex-wrap', 'items-start', 'justify-between', 'p-6', 'pt-0');
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

          //kalkulera navbaren
          //kalkulera footer
          this.calculateFooter();
          calculateNavHeight();

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
      var id = document.getElementById('contact-section');

      if(id.getBoundingClientRect().y > 297){
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });

      }else if(id.getBoundingClientRect().top > 297){
        var main = Array(document.getElementById('main-page-structure'));
        id.scrollIntoView();
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

  componentDidMount(){
    if(document.body.offsetWidth >= 614){
        document.getElementById('nav-linkz').classList.remove('hidden');
    }else{
        document.getElementById('nav-linkz').classList.add('hidden');
    }

  }
  render(){
    //z-10 fixed
    return (
          <>
            <nav id="navbar" className="nav-bar border-box">
              <section id="nav-linkz" className="border-box nav-linkz smooth-loaded nav-text ">
                <div className={`nav-link-box-first `}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/" onClick={(e) => {this.contactScroll(e)}}>About Me</NavLink>
                </div>
                <div className={`nav-link-box `}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/projects" onClick={(e) => {this.contactScroll(e)}}>Projects</NavLink>
                </div>
                <div className={`nav-link-box `}>
                  <button id="contact" className={`nav-link-buttons border-box a-link `} onClick={(e) => {this.contactScroll(e)}}>Contact</button>
                </div>
                <div className={`nav-link-box `}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/education" onClick={(e) => {this.contactScroll(e)}}>Education</NavLink>
                </div>
                <div className={`nav-link-box `}>
                  <NavLink className={`nav-link-buttons border-box a-link`} to="/experience" onClick={(e) => {this.contactScroll(e)}}>Experience</NavLink>
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
    this.onTheLoad = this.onTheLoad.bind(this);
  }

  onTheLoad(e){
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
                  return (<div id="card-wrap" onLoad={(e) => { this.onTheLoad(e) }} className="inline-block align-top main-card-wrapper" key={`Contact${i}`}>{Element}</div>);
              })
            }
        </BrowserRouter>
    )
  }
}
ReactDOM.render(<Routes />, document.getElementById('root'));
