import React from 'react'
import { ColorConsumer } from './colorcontext.js';



function Accomplishments(){
    return(
      <ColorConsumer>
        {({ tsize }) => (
       <section className="responsive-lbox-text ">
        <article>
          <h2>Languages, frameworks, environments and libraries</h2>
          <section className="flex flex-1 flex-wrap content-around mt-3">
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              React
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              HTML5
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              CSS3
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              Node
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              PHP
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
            javaScript
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              Craft 3 CMS
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box text-shadow">
              Mysql
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box">
              MongoDB
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box">
              TypeScript
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box">
              Twig
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box">
              Webpack
            </div>
            <div className="w-1/4 p-2 text-center m-1 language-box">
              c#
            </div>
          </section>
        </article>
        <article className="mt-3">
          <h2>Relevant work experience</h2>
          <section className="w-5/6">
            <div className="w-2/4 p-2 text-shadow">
                <h3 className="h3-override-ml-nil">Freelance company - 2019</h3>
                <p className={` ${tsize}`}>Founded 2019</p>
            </div>
            <div className="w-2/4 p-2">
              <h3 className="h3-override-ml-nil">Konsult hos Regnet AB - 2019</h3>
              <p className={` ${tsize}`}>
                I am consulted for programmatic bugs, hands on work with
                implementing new features to websites
                and other programmatic expertise. Mainly around problems
                applicable to javaScript and webpack.
              </p>
            </div>
          </section>
        </article>
        <article className="mt-3">
          <h2>Other work experience</h2>
          <section className="w-5/6">
            <div className="w-2/4 p-2">
              <h3 className="h3-override-ml-nil">Personal assistent - 2018</h3>
                <p className={`${tsize}`}>
                As a personal assistent I learned
                the value of building strong relationships
              </p>
            </div>
            <div className="w-2/4 p-2 text-shadow">
              <h3 className="h3-override-ml-nil">preschool teacher - 2017-2018</h3>
                <p className={`${tsize}`}>
                The work as a preschool teacher has given me
                leadership skills and trained my ability
                to lead and plan under pressure.
              </p>
            </div>
            <div className="w-2/4 p-2 text-shadow">
              <h3 className={`h3-override-ml-nil`}>Caretaker - 2015 och 2016</h3>
              <p className={` ${tsize}`}>
                As a caretaker, I learned to
                Understand the importance of maintaining
                housing and the execution of such work.
              </p>
            </div>
          </section>
        </article>
       </section>
     )}
   </ ColorConsumer>
    )
}

export {Accomplishments as Part}
