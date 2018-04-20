import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl, Source, Layer } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import ZipList from '../components/ZipList'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '../styles/WorkforceTouch.css';
import triCountyBoundary from '../data/tricountyboundary'

const Map = ReactMapboxGl ({
    accessToken: 'pk.eyJ1IjoiZGVseW5rbyIsImEiOiJjaXBwZ3hkeTUwM3VuZmxuY2Z5MmFqdnU2In0.ac8kWI1ValjdZBhlpMln3w'
})

class MapBoxMap extends Component {
    constructor(props){
        super(props);
        this.handleDrawCreate = this.handleDrawCreate.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.state = {
          title: 'Jobs Flow Here',
          mapCenter: [-105.41, 39.54],
          mapZoom: [9],
          zipCodes: [],
          jobs: []
        };
    }

    handleLoad(map, evt){
        map.addSource('county', {
            type: 'geojson',
            data: triCountyBoundary
        });

        map.addLayer({
            "id": "county",
            "type": "line",
            "source": "county",
            "layout": {},
            "paint": {
                "line-color": "#263F6A",
                "line-width": 2
            }
        });
    }

    handleDrawCreate(evt){
        const map = evt.target;
        
        map.fitBounds(map.getBounds(evt));

        this.setState(() => {
            return {
                zipCodes: ['80020', '80323', '80401'],
                jobs: [{zip: '80020', jobTitle: 'Mechanic'}, {zip: '80323', jobTitle: 'IT Specialist'}, {zip: '80401', jobTitle: 'Cashier'}]
            };
        });
    }

    render() {

        return (
            <div className="main-app">
                <Map
                    center={this.state.mapCenter}
                    zoom={this.state.mapZoom}
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "100vh",
                        width: "69vw",
                        margin: 0
                    }}
                    onStyleLoad={this.handleLoad}
                    >
                    <DrawControl 
                        position='top-right'
                        controls={{
                            line_string: false,
                            polygon: false,
                            trash: false,
                            combine_features: false,
                            uncombine_features: false
                        }}
                        onDrawCreate={this.handleDrawCreate}
                    />
                    <ZoomControl 
                        position='top-left'
                    />
                </Map>
                <ZipList title={this.state.title} zip_codes={this.state.zipCodes} jobs={this.state.jobs}/>
            </div>
        );
    }
}

export default MapBoxMap;