

Testa applikationen med "npm run dev"

Applikationen är mobilanpassad till ungefär 300 pixlar vid.

I app.js finns kort förklaring på hur jag lagt upp strukturen.
Jag har också lagt in lite kommentarer här och var där Strukturen
är av intresse att förklara

Hur har jag löst uppgiften?

● Skriv i ES6
  Jag har skrivit i både ES6 och ES5 beroende på när det varit nödvändigt
  att göra så.

○ Använd React Komponenter
  - Både skrivit funktion- och klasskomponenter

● Använda minst en eventhanterare

  - En knapp finns för att ändra text använder sig av både,
  state, events och context.

● Använda minst en livscykel metod utöver render() och constructor() dvs

  ComponentDidMount och componentWillMount används för att applicera klass
  och för lena övergångar i ASYNC-komponenten. Den komponenten i sig finns
  där för att skapa asynkroniskt kodsplitta utan att skriva in manuellt
  i webpack-filen.

● Använda minst en context (Frivilligt vad denna ska göra men det ska kunna
ändras genom tex. ett knapptryck)

  context används för att ändra text på sidan. Kolla in colorcontext.js.
  Svingo kod.

● Använda minst en React Component utöver index.js och App.js som du själv
skapat

  Jag badar i komponents :D :) :D

○ Använd props (Skicka med till den nya komponenten)

  props används när jag ska skicka över klassnamn till Navigeringslänkarna.

● Använda minst ett React element som du själv skapat.

  Inte skrivit i koden men jag kan ge ett exempel här:

    const Element = React.createElement(
      'button', <--- type
      {id: 'txtSize',
      onClick: (e) => {     <---------attributer
          updateTextSize()
      }},
      'barn-text-nod',
      React.createElement('p') <-- annat barn
    );

● En webpack fil (Se Webpack)

  Jupp.

● En babelfil (Se Babel)

  Skriver babelconfigen i webpack-config istället.



*******************NOTERA*********************

  Builden fungerar och outputar filer både med metod att serva från
  servern in-memory men också static. Builden tappar lite css av någon
  anledning vilket jag inte han lösa riktigt. Static-pathsen är inte heller
  riktigt integrerade med servern.
