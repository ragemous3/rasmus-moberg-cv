import React from 'react'
import { ColorConsumer } from './colorcontext.js';


class Edu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const listStyles = {
      "listStyleType": "circle",
      "listStylePosition": "outside",
    };
    return (
      <ColorConsumer>{({ color }) => (
        <>
          <h1>Education</h1>
          <article>
            <div className="pb-4">
              <h3 className="h3-override-ml-nil">JavaScript education program 2018-2020</h3>
              <p className={`${color} responsive-text`}>
                Current education with a hands-on approach
                to programming.
              </p>
            </div>
            <div className="pb-4">
              <h3 className="h3-override-ml-nil">Preschool Teacher Education 2014-2017</h3>
              <p className={`${color} responsive-text`}>
                Three and a half year long education
                in didactics. The
                education itself gave me the ability
                to explain concepts thoroughly, plan projects and I also developed my leadership skills.
              </p>
              <ul className="pl-6 pt-4">
                <li style={listStyles}>Bachelors degree</li>
              </ul>
            </div>
            <div className="pb-4 pt-4">
              <h3 className="h3-override-ml-nil">Swedish armed forces 2013</h3>
              <p className={`${color} responsive-text`}>
                Even though i never went on
                working in the military it gave me discipline.
              </p>
              <ul className={`${color} responsive-text pl-6 pt-4`}>
                <li style={listStyles}>Military guard training</li>
                <li style={listStyles}>Survival training</li>
                <li style={listStyles}>AK5-C military license, tactical handgrenade military license </li>
                <li style={listStyles}>Basic training </li>
              </ul>
            </div>
          </article>
      </>
      )}</ColorConsumer>
    )
}
}


export {Edu as Part};
