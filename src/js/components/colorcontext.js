  import React from 'react';

  //Initiala kontexten skapas
  const ColorContext = React.createContext({
    color: '',
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
          color: 'greyscale',
          tsize: 'responsive-text',
          updateTextSize: this.updateTextSize.bind(this),
          onHover: this.onHover.bind(this)
        }
    }
    updateTextSize() {
        this.setState((prev) => {
            if(this.state.tsize === 'text-2xl'){
              return {tsize: 'responsive-text'};
            }else{
              return {tsize: 'text-2xl'};
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
