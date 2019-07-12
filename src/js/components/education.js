import React from 'react'
// import { ColorConsumer } from './colorcontext.js';



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
      <>
        <h1>Education</h1>
        <article>
          <div>
            <h3 className="h3-override-ml-nil">JavaScript education program 2018-2020</h3>
            <p className="responsive-text">
              Current education with a hands-on approach
              to programming.
            </p>
          </div>
          <div>
            <h3 className="h3-override-ml-nil">Preschool Teacher Education 2014-2017</h3>
            <p className="responsive-text">
              Three and a half year long education
              in didactics including a bachelor's degree. The
              education itself gave me the ability
              to explain concepts thoroughly.
            </p>
            <ul className="pl-6 pt-3">
              <li style={listStyles}>Bachelors degree</li>
            </ul>
          </div>
          <div>
            <h3 className="h3-override-ml-nil">Swedish armed forces 2013</h3>
            <p className="responsive-text">
              Even though i never went on
              working in the military it gave me discipline.
            </p>
            <ul className="pl-6 pt-3">
              <li style={listStyles}>Military guard training</li>
              <li style={listStyles}>Survival training</li>
              <li style={listStyles}>Basic training</li>
            </ul>
          </div>
        </article>
      </>

    )
}
}


export {Edu as Part};
