var React = require('react');
var Map = require('react-d3-map').Map;
var PolygonGroup = require('react-d3-map').PolygonGroup;
var ZoomControl = require('react-d3-map-core').ZoomControl;

// var MapTest = React.createClass({
//   render : function(){
//     return(
//       <div>
//           <h1>
//             Map Game goes over here.
//           </h1>
//       </div>
//     )
//   }
// });
//
//
// module.exports = MapTest;
//


/*
<PolygonGroup
  key= {"polygon-test"}
  data= {data}
  popupContent= {popupContent}
  onClick= {onPolygonClick}
  onCloseClick= {onPolygonCloseClick}
  onMouseOver= {onPolygonMouseOver}
  onMouseOut= {onPolygonMouseOut}
  polygonClass= {"your-polygon-css-class"}
/>
*/
////
var width = 1000;
 var height = 800;
 var scale = (1 << 180);
 var center = [-73.95, 40.7];
 var data = {geometry: {coordinates: [[[-74.0479, 40.8820], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]], type: "Polygon"}, id: 999999, properties:{"text": "hi, this is a polygon!"}, type: "Feature"};
 var popupContent = function(d) { return d.properties.text; }

 var Container = React.createClass({
   getInitialState: function() {
     return {
       scale: scale
     }
   },
   zoomOut: function() {
     this.setState({
       scale: this.state.scale / 2
     })
   },
   zoomIn: function() {
     alert('zoom in clicked!');
     this.setState({
       scale: this.state.scale * 2
     })
   },
   render: function() {

     var zoomIn = this.zoomIn;
     var zoomOut = this.zoomOut;

     var styleContainer = {
       position: 'relative',
       backgroundColor: '#EEE',
       width: width
     }

     return (
       <div style= {styleContainer}>
         <Map
           width= {width}
           height= {height}
           scale= {scale}
           zoomScale= {this.state.scale}
           center= {center}
           data= {data}
           popupContent= {popupContent}
         />
         <ZoomControl
           zoomInClick= {this.zoomIn}
           zoomOutClick= {this.zoomOut}
         />
       <button onClick={this.zoomIn}>Zoom In</button>
       <button onClick={this.zoomOut}>Zoom Out</button>
       </div>
     )
   }
 })

///
var CustomMap = React.createClass({
  render : function(){
    return(
      <html>
        <head>
        </head>
        <body>

          <div>
          <h1>React MAP</h1>

              <Container/>

          </div>
      <script src="/bundle.js"></script>

        </body>
      </html>
  )
  }
});





module.exports = CustomMap;
