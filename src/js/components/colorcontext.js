import React from 'react';

//Kontext skapas med tomma värden
const ColorContext = React.createContext({
  color: '',
  tsize: 'responsive-lbox-text',
  updateTextSize: function(){}
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
        tsize: 'responsive-lbox-text',
        updateTextSize: this.updateTextSize.bind(this)
      }
  }
  updateTextSize() {
      this.setState((prev) => {
          if(this.state.tsize === 'responsive-lbox-text'){
            console.log('yes')
            return {tsize: 'responsive-text'};
          }else{
            return {tsize: 'responsive-lbox-text'};
          }
      });
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
