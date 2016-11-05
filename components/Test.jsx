var React = require('react');


var TestComponent = React.createClass({

  clickMe : function(){

    alert('HELLLO WORLD!!!');

  },

  render : function() {
    return(
      <html>
        <head>
        </head>
        <body>

          <h1>

        Hello WorldMap!!

          </h1>

          <button onClick={this.clickMe}>Click Me</button>

    <script src="/bundle.js"></script>

        </body>
      </html>

    )
  }

});




module.exports = TestComponent;
