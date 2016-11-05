var React = require('react');
var WorldMap = require('../client/react-world-map');
var IconButton = require('material-ui/IconButton');
var ActionHome = require('material-ui/svg-icons/action/home');

var clickedArea;

var CustomMap2 = React.createClass({

  getInitialState : function(){
    return{
      areaLocation : 'None'
    }
  },
  randomAlert : function(){
    alert('Testing if it works.');
  },

  listeningHere : function(){


    window.addEventListener('WorldMapClicked', function(e){

      console.log('map was clicked, current selection is: ', e.detail.clickedState)

      clickedArea = e.detail.clickedState;

    });

    this.setState({
      areaLocation : clickedArea
    });
  },

  render : function(){
    return(

      <html>
        <head>
          <title>Eloify</title>
        </head>
        <body>
      
            <h1> Simple Map - Double Click To Get Continent. </h1>
              <h2>Location : {this.state.areaLocation}</h2>
          <div onClick={this.listeningHere}>
              <WorldMap width='77%' height='44%' />
          </div>

    <script src="/bundle.js"></script>
        </body>
      </html>
    )
  }
});



      // window.addEventListener('WorldMapClicked', function(e) {console.log('map was clicked, current selection is: ', e.detail.clickedState)});

module.exports = CustomMap2;
