import React from 'react'
import { ColorConsumer } from './colorcontext.js';

class Accomplishments extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      languages: [
        'jS',
        'React',
        'C',
        'tS',
        'Craft3',
        'Node.js',
        'Webpack',
        'PHP',
        'Mysql',
        'MongoDB',
        'CSS3',
        'HTML5',
        'Twig',
        'Git',
        'BankID',
    ],
    text: [
      'Javascript: ⚡⚡⚡⚡⚡',
      'React: ⚡⚡⚡⚡',
      'C: ⚡⚡',
      'Typescript: ⚡⚡⚡',
      'Craft3: ⚡⚡⚡',
      'Node: ⚡⚡⚡⚡',
      'Webpack: ⚡⚡⚡⚡',
      'PHP: ⚡⚡',
      'Mysql: ⚡⚡',
      'MongoDB: ⚡⚡⚡',
      'CSS3: ⚡⚡⚡',
      'HTML5: ⚡⚡⚡⚡⚡',
      'Twig: ⚡⚡⚡',
      'Git: ⚡⚡⚡⚡⚡',
      'Bankid: ⚡⚡⚡⚡⚡',

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
      'hint--bottom',
    ],
  }
    this.clicker = this.clicker.bind(this)
  }
  clicker(e){
    let target = e.target
  }
  componentWillUnmount(){

  }
  render(){
    const listStyle = {
      "listStyleType": "circle",
      "listStylePosition": "outside",
    };
    return(
        <ColorConsumer>
          {({ color }) => (
          <>
          <h1>Experience</h1>
          <article>
            <h2>Languages, frameworks, environments and libraries</h2>
            <p className={`${color} responsive-text `}>Hover boxes to see profiency (1-5)</p>
            <section className="flex flex-1 flex-wrap mt-3 pb-4">
              {
                Array.from({length: this.state.languages.length }, (_, i) =>
                    <div key={`box${i}`}
                       className={`${this.state.tooltips[i]} border-box language-box  responsive-text text-shadow`}
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
          <article>
            <h2>Relevant work experience</h2>
              <div className=" responsive-text text-shadow ">
                <ul className="pl-6" style={listStyle}>
                  <li>
                    <h3 className="h3-override-ml-nil">Freelance company - 2019</h3>
                  </li>
                </ul>
                <p className={"pl-6  responsive-text "}>Founded 2019</p>
              </div>
              <div className=" responsive-text">
                <ul className="pl-6" style={listStyle}>
                  <li>
                    <h3 className={`${color} h3-override-ml-nil text-shadow`}>Consultant at Regnet Co - 2019</h3>
                  </li>
                </ul>
                <p className={`${color} responsive-text pl-6 text-shadow `}>
                  I've been consulted for programmatic bugs, hands on work with
                  implementing new features to websites
                  and other programmatic expertise.
                </p>
              </div>
          </article>
          <article className={`${color} pb-4 pt-4`}>
            <h2>Other work experience</h2>
              <div className="responsive-text text-shadow ">
                <ul className="pl-6" style={listStyle}>
                  <li>
                    <h3 className="h3-override-ml-nil">Personal assistent - 2018</h3>
                  </li>
                </ul>
                  <p className={`${color} responsive-text pl-6 `}>
                    As a personal assistent I learned
                    the value of building strong relationships.
                </p>
              </div>
              <div className="text-shadow pb-4">
                <ul className="pl-6" style={listStyle}>
                  <li>
                    <h3 className="h3-override-ml-nil">Preschool teacher - 2017-2018</h3>
                  </li>
                </ul>
                  <p className={`${color} responsive-text pl-6 `}>
                  The work as a preschool teacher has given me
                  leadership skills and trained my ability
                  to lead and plan under pressure.
                </p>
              </div>
              <div className=" text-shadow">
                <ul className="pl-6" style={listStyle}>
                  <li>
                    <h3 className={`h3-override-ml-nil`}>Caretaker - 2015 och 2016</h3>
                  </li>
                </ul>
                <p className={`${color} responsive-text pl-6 `}>
                  As a caretaker of a community college (folkhögskola), I got use for
                  my attention to detail.
                </p>
              </div>
          </article>
        </>

        )}</ColorConsumer>
    )
  }
}


export {Accomplishments as Part}
