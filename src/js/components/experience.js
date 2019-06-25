import React from 'react'
import { ColorConsumer } from './colorcontext.js';


class Accomplishments extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      languages: [
        'javaScript',
        'React',
        'C#',
        'TypeScript',
        'Craft3 CMS',
        'Node.js',
        'Webpack',
        'PHP',
        'Mysql',
        'MongoDB',
        'CSS3',
        'HTML5',
        'Twig',
        'bankID'
    ],
    text: [
      '⚡⚡⚡⚡⚡',
      '⚡⚡⚡⚡',
      '⚡',
      '⚡⚡',
      '⚡⚡',
      '⚡⚡⚡⚡',
      '⚡⚡⚡',
      '⚡⚡',
      '⚡⚡',
      '⚡⚡⚡',
      '⚡⚡⚡',
      '⚡⚡⚡⚡⚡',
      '⚡⚡⚡',
      '⚡⚡⚡',
    ],
    tooltips: [
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
      'hint--bottom',
    ],
  }
    this.clicker = this.clicker.bind(this)
  }
  clicker(e){
    let target = e.target
    console.log(target.textContent)

  }
  render(){
    return(
      <ColorConsumer>
        {({ tsize }) => (
        <>
        <article>
          <h2>Languages, frameworks, environments and libraries</h2>
          <section className="flex flex-1 flex-wrap content-around mt-3">
            {
              Array.from({length: this.state.languages.length}, (_, i) =>
                  <div key={`box${i}`}
                     className={`${this.state.tooltips[i]} language-box text-shadow`}
                     aria-label={this.state.text[i]}
                     onClick={(e) => this.clicker(e)}
                   >
                   {this.state.languages[i]}
                  </div>
                )
            }
          </section>
          <article className="hidden-info-box">

            <i url=""></i>
              <div id="info-box-content">
              </div>
          </article>
        </article>
        <article className="mt-3">
          <h2>Relevant work experience</h2>
            <div className="  text-shadow">
                <h3 className="h3-override-ml-nil">Freelance company - 2019</h3>
                <p className={` ${tsize}`}>Founded 2019</p>
            </div>
            <div className=" ">
              <h3 className="h3-override-ml-nil">Konsult hos Regnet AB - 2019</h3>
              <p className={` ${tsize}`}>
                I am consulted for programmatic bugs, hands on work with
                implementing new features to websites
                and other programmatic expertise. Mainly around problems
                applicable to javaScript and webpack.
              </p>
            </div>
        </article>
        <article className="mt-3">
          <h2>Other work experience</h2>
            <div className=" ">
              <h3 className="h3-override-ml-nil">Personal assistent - 2018</h3>
                <p className={`${tsize}`}>
                As a personal assistent I learned
                the value of building strong relationships
              </p>
            </div>
            <div className="  text-shadow">
              <h3 className="h3-override-ml-nil">Preschool teacher - 2017-2018</h3>
                <p className={`${tsize}`}>
                The work as a preschool teacher has given me
                leadership skills and trained my ability
                to lead and plan under pressure.
              </p>
            </div>
            <div className="  text-shadow">
              <h3 className={`h3-override-ml-nil`}>Caretaker - 2015 och 2016</h3>
              <p className={` ${tsize}`}>
                As a caretaker, I learned to
                Understand the importance of maintaining
                housing and the execution of such work.
              </p>
            </div>
        </article>
       </>
     )}
   </ ColorConsumer>
    )
  }
}


export {Accomplishments as Part}
