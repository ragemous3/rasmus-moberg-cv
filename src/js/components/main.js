import React, { useContext } from 'react'
import { ColorConsumer } from './colorcontext.js';


function Main(){
  return(
      <>
        <Card />
      </>
  )
}
// ColorConsumer tar en "render-prop"
class Card extends React.Component{
  constructor(props){
    super(props)
    this.fetchCV = this.fetchCV.bind(this);
  }
  fetchCV(e){
    e.preventDefault();

    // fetch(e.target.href, {
    //     cache:'no-cache',
    //     credentials:'same-origin'
    //   }).then(response => {
    //       console.log(response)
    //       var blob = new Blob(
    //       [response.body],
    //       {type: 'application/pdf'})
    //       return blob;
    //   }).then((body) => {
    //       var file = this.blobToFile(body, 'rasmusmcv.pdf')
    //       var a = document.createElement("a");
    //       window.download(file)
    //   })
    //   .catch((e) => {
    //     console.log(`${e}`)
    //   })

  }
  blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    var file = new File([theBlob], fileName);
    console.log('asdsad')
    return file;
  }
  render(){
    return(

      <ColorConsumer>
        {({ color }) => (
          <article className="main-profile border-box text-shadow">
            <div>
              <div className="inline-block ">
                <img src="../../img/profilbild.jpg" className={`main-image rounded ${color}`} alt="..." />
              </div>
              <div className="responsive-text">
                <h4 className=""><b>Rasmus Moberg</b></h4>
              </div>
              <div className="mt-3 w-1/2 responsive-text">
                  <ol>
                    <li>0722724429</li>
                    <li>rasmus.krister.moberg@gmail.com</li>
                    <li>Sköllerstagatan 27, 124 65 Bandhagen</li>
                    <li><a href="/getcv" className={`border border-solid rounded bg-greenlight`} download> Tanka ner mitt CV</a></li>
                  </ol>
              </div>
            </div>
          </article>
        )}
      </ColorConsumer>

    )
    }
  }
export {Main as Part};
