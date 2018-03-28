import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './App.css';


const Map = ReactMapboxGl ({
  accessToken: 'pk.eyJ1IjoiZGVseW5rbyIsImEiOiJjaXBwZ3hkeTUwM3VuZmxuY2Z5MmFqdnU2In0.ac8kWI1ValjdZBhlpMln3w'
});

class App extends Component {

  constructor(props){
    super(props);
    this.handleDraw = this.handleDraw.bind(this);
    this.state = {
      title: 'Coordinates',
      coordinates: [-95, 37],
      zoom: 4
    };
  }

  handleDraw(evt){
    console.log(evt);
    this.setState(()=> {
      return {
        coordinates: [evt.features[0].geometry.coordinates[0], evt.features[0].geometry.coordinates[1]],
        zoom: 10
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Map
          center={[this.state.coordinates[0], this.state.coordinates[1]]}
          zoom={[this.state.zoom]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "50vw",
            margin: 0
          }}
          >
          <ZoomControl 
            position='top-left'
          />
          <DrawControl
            position='top-right'
            controls={{
              line_string: false,
              polygon: false,
              trash: false,
              combine_features: false,
              uncombine_features: false
            }}
            onDrawCreate={this.handleDraw} 
          />

        </Map>
        <Coordinates title={this.state.title} coordinates={this.state.coordinates} />
      </div>
    );
  }
}

const Coordinates = (props) => (
  <div>
    <h3>{props.title}: {props.coordinates[0]}, {props.coordinates[1]} </h3>
  </div>
)

export default App;
