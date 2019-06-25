import React from 'react'
import { ColorConsumer } from './colorcontext.js';


class Edu extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidUpdate(){

  }
  render(){
    return (
      <ColorConsumer>
        {({ tsize }) => (
      <>
        <h2>Education</h2>
        <article>
          <div>
            <h3 className="h3-override-ml-nil">JavaScript education program 2018-2020</h3>
            <p className={` ${tsize}`}>
              Current education with a hands-on approach
              to programming.
            </p>
          </div>
          <div>
            <h3 className="h3-override-ml-nil">Preschool educations 2014-2017</h3>
            <p className={` ${tsize}`}>
              Three and a half year long education
              in didactics including a bachelor's degree. The
              education itself gave me the ability
              to explain concepts thoroughly.
            </p>
            <h3 className="h3-override-ml-nil">Bachelor</h3>
            <ul>
              <li className={` ${tsize}`}>Bachelor's degree in didactics </li>
              <li>Grade: A</li>
            </ul>
          </div>
        </article>
      </>
    )}
  </ColorConsumer>

    )
}
}


export {Edu as Part};
