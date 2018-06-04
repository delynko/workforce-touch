import React, { Component } from 'react';
import jeffco from '../images/JeffersonCounty_Final_Vertical.png';
import '../styles/intro.css';
import draw from '../images/draw.png'
import layers from '../images/layers.png'

class Intro extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="remove-intro" id="remove-intro">
                <p className="intro-p-tag"><img src={jeffco} alt="Jeffco Logo" title="Jeffco Logo" /></p>
                <h2 className="intro-welcome"><br/><b>Welcome to the Jefferson County Workforce Job Search Application!</b></h2>
                <br/>
                <p className="intro-p-tag">This interactive map will allow you to select a location on the map and see a list of jobs that are within the closest ZIP codes.</p>
                <p className="intro-p-tag" id="get-started"><br/>To get started, much like a smart phone, use two fingers to zoom to a location on a map. Once there, simply tap the <img src={draw} alt="Draw Marker Icon" title="Draw Marker Icon"/> icon (upper left), then tap a location on the map.</p>
                <p class="intro-p-tag"><br/>A list of ZIP codes will appear on the right side of the screen. Tap any of these to see the jobs in a ZIP code. Then, tap a job title to get more information about that position.</p>
            </div>
        )
    }
}

export default Intro;