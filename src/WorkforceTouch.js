import React, { Component } from 'react';
import Map from './components/Map';
import Header from './components/Header';

class WorkforceTouch extends Component {
  render(){
    return (
      <div className="WorkforceTouch">
        <Header />
        <Map className="map-component"/>
      </div>
      
    )
  }
}

export default WorkforceTouch;
