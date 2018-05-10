import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl, Source, Layer } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
import turf from '@turf/turf';
import { point, polygon } from '@turf/helpers';
import buffer from '@turf/buffer';
import intersect from '@turf/intersect';
import axios from 'axios';
import ZipList from '../components/ZipList';
import ResetButton from './ResetButton';
import Header from '../components/Header';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '../styles/WorkforceTouch.css';

const Map = ReactMapboxGl ({
    accessToken: 'pk.eyJ1IjoiZGVseW5rbyIsImEiOiJjaXBwZ3hkeTUwM3VuZmxuY2Z5MmFqdnU2In0.ac8kWI1ValjdZBhlpMln3w'
});

const triCountyBoundaryUrl = 'http://awdagis01.admin.co.jeffco.us/arcgis/rest/services/WorkforceTouch/WorkforceTouch/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

const tricountyZipCodeUrl = 'http://awdagis01.admin.co.jeffco.us/arcgis/rest/services/WorkforceTouch/WorkforceTouch/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';

class MapBoxMap extends Component {
    constructor(props){
        super(props);
        this.handleDrawCreate = this.handleDrawCreate.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.state = {
          mapCenter: [-105.41, 39.54],
          mapZoom: [9],
          zipCodes: [],
          jobs: [],
          resetButtonVisibility: 'hidden'
        };
    }

    handleLoad(map, evt){
        map.addSource('triCountyBoundary', {
            type: 'geojson',
            data: triCountyBoundaryUrl
        });

        map.addSource('triCountyZipCode', {
            type: 'geojson',
            data: tricountyZipCodeUrl
        });

        map.addLayer({
            "id": "triCountyBoundary", 
            "type": "line",
            "source": "triCountyBoundary",
            "layout": {},
            "paint": {
                "line-color": "#263F6A",
                "line-width": 2
            }
        });
    }

    handleDrawCreate(evt){

        const map = evt.target;

        const pointToBuffer = point([evt.features[0].geometry.coordinates[0], evt.features[0].geometry.coordinates[1]]);
        
        const bufferResult = buffer(pointToBuffer, 1, {units: 'miles'});

        let newZips = [];
        let jobList = [];

        axios.get(tricountyZipCodeUrl)
        .then((res) => {
            const zipCodes = res.data.features
            zipCodes.map((zipCode) => {
                zipCode.geometry.type = 'Polygon';
                const newPolygon = polygon(zipCode.geometry.coordinates);
                newPolygon.properties.ZIP = zipCode.properties.ZIP;
                newPolygon.properties.POSTALCITYNAME = zipCode.properties.POSTALCITYNAME;

                if (intersect(bufferResult, newPolygon)) {
                    newZips.push(newPolygon.properties.ZIP);
                    map.addSource('zipLayer' + newPolygon.properties.ZIP, {
                        type: 'geojson',
                        data: newPolygon
                    });
                    map.addLayer({
                        "id": 'zipLayer' + newPolygon.properties.ZIP,
                        "type": "line",
                        "source": 'zipLayer' + newPolygon.properties.ZIP,
                        "layout": {},
                        "paint": {
                            "line-color": "#263F6A",
                            "line-width": 3
                        }
                    });
                    axios.get(`http://awdagis01.admin.co.jeffco.us/arcgis/rest/services/WorkforceTouch/WorkforceTouch/MapServer/4/query?where=ZIP%3D%27${newPolygon.properties.ZIP}%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson`)
                    .then((res) => {
                        jobList.push({
                            ZIP: newPolygon.properties.ZIP,
                            city: newPolygon.properties.POSTALCITYNAME,
                            jobs: res.data.features
                        });
                    }).catch((err) => {
                        console.log(err);
                    });


                }
            })
        })
        .catch((err) => {
            console.log(err);
        });

        setTimeout(() => {
            newZips.sort()
            this.setState(() => {
                return {
                    zipCodes: newZips,
                    jobs: jobList,
                    resetButtonVisibility: ''
                };
            });
        }, 1000)

    }

    handleResetButtonClick(e) {
        e.preventDefault();
        console.log(document.getElementsByClassName('mapboxgl-map'));
        this.setState(() => {
            return {
                resetButtonVisibility: 'hidden',
                zipCodes: [],
                jobs: [],
            };
        });
    }

    render() {

        return (
            <div className="main-app">
                <ResetButton
                    visibility={this.state.resetButtonVisibility}
                    onClick={this.handleResetButtonClick}
                    map={Map}
                />
                <Header />
                <Map
                    center={this.state.mapCenter}
                    zoom={this.state.mapZoom}
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "100vh",
                        width: "67vw",
                        margin: 0,
                        top: 40,
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