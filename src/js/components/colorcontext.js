  import React from 'react';
  /*
    Unused code but safekept for sentimental reasons  (It's a great piece of code)
  */


  //Initiala kontexten skapas
  const ColorContext = React.createContext({
    color: 'dampcolor',
    bg: 'body-bg',
    tsize: 'responsive-lbox-text',
    updateTextSize: function(){},
    onHover: function(){}
  });

  /*
      Children är egentligen
      prop till föräldern vilket gör att man kan skriva såhär:
     <ColorContext.Provider>{this.props.children} </ColorContext.Provider>.

     Vid varje rendering av komponent i "app.js" använder man alltså
     klassen "ColorProvider" för att wrappa allt man vill ska få tillgång
     till kontexten och Consumer(förmågan att prenumerera)

  */
  class ColorProvider extends React.Component{
    constructor(props){
      super(props)
        this.state = {
          color: 'dampcolor',
          tsize: 'responsive-text',
          updateColor: this.updateColor.bind(this),
          onHover: this.onHover.bind(this)
        }
    }
    updateColor() {
      let body = document.body;

      if(body.classList.contains('body-bg')){
          body.classList.remove('body-bg');
          body.classList.add('body-bg-darker');
      }else{
        body.classList.remove('body-bg-darker');
        body.classList.add('body-bg');
      }
        this.setState((prev) => {
            if(this.state.color === 'dampcolor'){
              return {
                color: 'brightcolor',
              };
            }else{
              return {
                color: 'dampcolor',
              };
            }
        });
    }
    onHover(){
      //Make hovereffects here.
    }
    render() {
      return (
        <ColorContext.Provider value={this.state}>
          {this.props.children}
        </ColorContext.Provider>
      );
    }
  }

  /*
    Exporterar "Consumer" vilket är en react-komponent som
    ger andra FUNKTION-komponenter makten att prenumerera på kontextens
    förändringar.
  */

  const ColorConsumer = ColorContext.Consumer;

  export   { ColorConsumer, ColorProvider, ColorContext }
