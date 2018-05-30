import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import { point, polygon } from '@turf/helpers';
import buffer from '@turf/buffer';
import intersect from '@turf/intersect';
import axios from 'axios';
import ZipList from '../components/ZipList';
import Button from './Button';
import Header from '../components/Header';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '../styles/WorkforceTouch.css';
import '../styles/button-container.css';

let mappy = "";

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
        this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
        this.state = {
          mapCenter: [-105.43, 39.53],
          mapZoom: [9],
          zipCodes: [],
          jobs: [],
          ButtonVisibility: 'hidden'
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

        mappy = map;

        map.getStyle().layers.map((layer) => {
            if (layer.id.includes('zipLayer')){
                map.removeLayer(layer.id);
            }           
        });

        

        const pointToBuffer = point([evt.features[0].geometry.coordinates[0], evt.features[0].geometry.coordinates[1]]);

        this.setState(() => {
            return {
                mapCenter: [evt.features[0].geometry.coordinates[0], evt.features[0].geometry.coordinates[1]],
                mapZoom: [12]
            }
        })
        
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

// do something with this source to remove it on "New Search Button click"


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
                        let onetsJobs = [];
                        let onets = [];
                        res.data.features.map((job) => {
                            onets.push(job.attributes.ONETCat)
                            onetsJobs.push({onet: job.attributes.ONETCat, job: job});
                        });
                        var unique = onets.filter((item, i, ar) => { return ar.indexOf(item) === i; });

                        unique.sort();

                        jobList.push({
                            ZIP: newPolygon.properties.ZIP,
                            city: newPolygon.properties.POSTALCITYNAME,
                            jobs: res.data.features,
                            onets: unique,
                            jobsOnets: onetsJobs
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
                    ButtonVisibility: '',
                };
            });
        }, 1000)
    }

    handleResetButtonClick(e) {
        console.log(mappy.getStyle().layers);
        mappy.getStyle().layers.map((layer) => {
            if (layer.id.includes('zipLayer')){
                mappy.removeLayer(layer.id);
            }           
        });
        console.log(mappy.getStyle().layers);
        this.setState(() => {
            return {
                ButtonVisibility: 'hidden',
                zipCodes: [],
                jobs: [],
                mapCenter: [-105.41, 39.54],
                mapZoom: [9],
            };
        });
    }

    handleRefreshButtonClick(){
        window.location.reload();
    }

    render() {

        return (
            <div className="main-app">
                <div className="button-container">
                    <Button
                        visibility={this.state.ButtonVisibility}
                        onClick={this.handleResetButtonClick}
                        words="New Search"
                        style={{right: 0}}
                    />
                    <Button
                        visibility={this.state.ButtonVisibility}
                        onClick={this.handleRefreshButtonClick}
                        words="Refresh for Next User"
                        style={{left: 0}}
                    />
                </div>
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