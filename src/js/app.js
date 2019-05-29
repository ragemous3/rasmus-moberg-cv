/*
****************************************
****************Import/export***********
****************************************
*/
  import React, { useState, useContext } from 'react';
  import ReactDOM from 'react-dom';
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
        lacy: 'smooth-loader'
      }
      this.middle = [];
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
      }else{
        return null;
      }
    }
    render(){
      return(

            <section className={this.props.whatClass || ''}>
                {this.state.comp.map((Element, i) => {
                  return <div className={`z-0 ${this.state.lazy}`}key={i}>{Element}</div>;
                })}
            </section>
      )
  }
}

/*
***********************************************************************************************
*****************************NAV-BAR MED TILLHÖRANDE KOMPONENTER*******************************
***********************************************************************************************
*/

function Hamburger(){

    const Dropper = () =>{
      return(
        <div className='hamburger-dropper'>
          <NavLinkz cls={'flex flex-1 flex-row'} cls2={'p-3 text-black mb-3'} />
        </div>
      )
    }
  return(
    <figure className="hamburger-menu" >
      <img src="/dist/img/hamburger.png" />
      <Dropper />
    </figure>
  )
}

function NavLinkz(props){
  return(
    <div className={props.cls}>
      <div className="top-left">
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/">Contact</NavLink>
      </div>
      <div className="top-right">
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/experience">Experience</NavLink>
      </div>
      <div className="bot-left">
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/education">Education</NavLink>
      </div>
      <div className="bot-right">
        <NavLink className={`mt-20 border-box a-link ${props.cls2 || ''}`} to="/projects">Projects</NavLink>
      </div>
    </div>
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
          <section>
            <Hamburger />
              <nav className="nav-bar responsive-nav-text responsive-nav border-box text-shadow">
                  <section className="wrap border-box">
                      <article className="">
                      <NavLinkz cls={'nav-figure'}/>
                      </article>
                  </section>
                  <button id="txtSize" onClick={(e) => {
                      updateTextSize()
                    }}>
                  </button>
              </nav>
          </section>
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

function Homepage(){
      return (
      <>
          {<LoadAsync chunkname="main" whatClass="main-page-structure border-box" url="./components/main.js" />}
      </>
      )
}
function Knowledge(){
  return (
    <>
    <LoadAsync chunkname="experience" whatClass="main-page-structure border-box" url="./components/experience.js" />
    </>
  )
}
function Education(){
  return (
    <>
      <LoadAsync chunkname="education" whatClass="main-page-structure" url="./components/education.js" />
    </>
  )
}
function Projects(){
  return (
    <>
      <LoadAsync chunkname="Projects" whatClass="main-page-structure" url="./components/projects.js" />
    </>
  )
}

const routes = (
  <ColorProvider>
    <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact={true} component={Homepage} />
          <Route exact path="/experience" component={Knowledge}/>
          <Route exact path="/education" component={Education}/>
          <Route exact path="/projects" component={Projects}/>
          <Route render={() => {return <LoadAsync chunkname="error" url={'./components/404.js'} />}} />
        </Switch>
    </BrowserRouter>
  </ColorProvider>
)

ReactDOM.render(routes, document.getElementById('root'));


/*
  Inlämningsuppgift - Hur jag löst uppgiften

  Först kort om varför jag har gjort som jag gjort:

      Varför jag inte gjort någon index.js är för jag anser
      att det blir onödigt mycket lager på lager för en sådan liten
      applikation.


      Strukturen på sidan är
      konstruerad runt navigering med dynamisk kodsplittning som returnerar promises.

      Varför jag har gjort det på det viset är för att jag inte vill skicka
      över för mycket data till browsern varje gång en url-förändring görs.
      Varför det är asynkroniskt är för att jag vill förhindra att data krockar
      med annan data eller att ordningen blir fel.

      Jag har därför delat upp all JSX i komponenter som renderas genom LoadAsync
      varje gång en url-förändring görs.

      Allting som genereras på sidan går via LoadAsync-komponenten.
      Förutom Nav-baren då.

      Min webpack-config för devservern ligger i "server/config-mappen"
      Det här är för att jag vill kunna använda mina egna serverlösningar
      för att skicka filer. T.ex. pdf-filen. Bara för att hålla backendprogrammeringen
      färsk egentligen.

  ● Skriv i ES6
   - Jag har skrivit i Es06 där jag känt att det varit nödvändigt.

  ○ Använd React Komponenter
    - Både skrivit funktions- och klasskomponenter
  ● Använda minst en eventhanterare
    - En knapp finns för att ändra text använder sig av både,
    state, events och context.

  ● Använda minst en livscykel metod utöver render() och constructor() dvs

    ComponentDidMount och componentWillMount används för att applicera klass
    och för lena övergångar i ASYNC-komponenten. Den komponenten i sig finns
    där för att skapa asynkroniskt kodsplitta utan att skriva in manuellt
    i webpack-filen.

  ● Använda minst en context (Frivilligt vad denna ska göra men det ska kunna
  ändras genom tex. ett knapptryck)

    context används för att ändra text på sidan. Kolla in colorcontext.js.
    Svingo kod.

  ● Använda minst en React Component utöver index.js och App.js som du själv
  skapat

    Jag badar i komponents.

  ○ Använd props (Skicka med till den nya komponenten)

    props används när jag ska skicka över klassnamn till Navigeringslänkarna.

  ● Använda minst ett React element som du själv skapat.

    Inte skrivit i koden men jag kan ge ett exempel här:

      const Element = React.createElement(
        'button', <--- type
        {id: 'txtSize',
        onClick: (e) => {     <---------attributer
            updateTextSize()
        }},
        'barn-nod',
        React.createElement('p') <-- annat barn
      );

  ● En webpack fil (Se Webpack)

    Jupp.

  ● En babelfil (Se Babel)

    skriver babelconfigen i webpack-config istället.

*/
