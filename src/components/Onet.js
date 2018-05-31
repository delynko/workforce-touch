import React, { Component } from 'react';
import Job from './Job';
import jeffco from '../images/jeffco.png';
import admin from '../images/admin.png';
import ag from '../images/ag.png';
import art from '../images/art.png';
import book from '../images/book.png';
import business from '../images/business.png';
import computer from '../images/computer.png';
import construction from '../images/construction.png';
import engineering from '../images/engineering.png';
import food from '../images/food.png';
import legal from '../images/legal.png';
import maintenance from '../images/maintenance.png';
import management from '../images/management.png';
import medical from '../images/medical.png';
import personalservice from '../images/personalservice.png';
import production from '../images/production.png';
import protection from '../images/protection.png';
import repair from '../images/repair.png';
import sales from '../images/sales.png';
import science from '../images/science.png';
import socialservices from '../images/socialservices.png';
import transportation from '../images/transportation.png';
import '../styles/onet.css';

class Onet extends Component {
    constructor(props){
        super(props);
        this.handleOnetClick = this.handleOnetClick.bind(this);
    }

    handleOnetClick(e){
        e.target.nextElementSibling.classList.contains("job-container-not-visible") ? e.target.nextElementSibling.classList.remove("job-container-not-visible") : e.target.nextElementSibling.classList.add("job-container-not-visible");
    }

    render(){
        
        return(
            <div>
                {this.props.onets.map((onet) => {
                    return (
                        <div key={this.props.zip + "-" + onet}>
                            <button className="onet" onClick={this.handleOnetClick}>
                                <p className="onet-cat">{jobIcon(onet).category}</p>
                                <img src={jobIcon(onet).icon} className="job-icon" alt="industry icon"/>
                            </button>
                            <div className="job-container-not-visible">
                                {
                                    this.props.jobs.jobs.map((job) => {
                                        if (job.attributes.ONETCat === onet) {
                                            return (
                                                <div key={job.attributes.CONumber + "job-container"}>
                                                    <Job job={job.attributes} />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const jobIcon = (onet) => {
    var cat;
    switch(onet){
        case(29):
            cat = {
                category: "Healthcare Practitioners and Technical",
                icon: medical
            };
            break;
        case(31):
            cat = {
                category: "Healthcare Support",
                icon: medical
            };
            break;
        case(13):
            cat = {
                category: "Business and Financial Operations",
                icon: business
            };
            break;
        case(17):
            cat = {
                category: "Architecture and Engineering",
                icon: engineering
            };
            break;
        case(27):
            cat = {
                category: "Arts, Design, Entertainment, Sports and Media",
                icon: art
            };
            break;
        case(37):
            cat = {
                category: "Building and Grounds Cleaning and Maintenance",
                icon: maintenance
            };
            break;
        case(21):
            cat = {
                category: "Community and Social Services",
                icon: socialservices
            };
            break;
        case(15):
            cat = {
                category: "Computer and Mathematical",
                icon: computer
            };
            break;
        case(47):
            cat = {
                category: "Construction and Extraction",
                icon: construction
            };
            break;
        case(25):
            cat = {
                category: "Education, Training and Library",
                icon: book
            };
            break;
        case(45):
            cat = {
                category: "Farming Fishing and Forestry",
                icon: ag
            };
            break;
        case(35):
            cat = {
                category: "Food Preparation and Serving Related",
                icon: food
            };
            break;
        case(49):
            cat = {
                category: "Installation, Maintenance and Repair",
                icon: repair
            };
            break;
        case(23):
            cat = {
                category: "Legal",
                icon: legal
            };
            break;
        case(19):
            cat = {
                category: "Life, Physical and Social Science",
                icon: science
            };
            break;
        case(11):
            cat = {
                category: "Management",
                icon: management
            };
            break;
        case(43):
            cat = {
                category: "Office and Administrative Support",
                icon: admin
            };
            break;
        case(39):
            cat = {
                category: "Personal Care and Service",
                icon: personalservice
            };
            break;
        case(51):
            cat = {
                category: "Production",
                icon: production
            };
            break;
        case(33):
            cat = {
                category: "Protective Service",
                icon: protection
            };
            break;
        case(41):
            cat = {
                category: "Sales and Related",
                icon: sales
            };
            break;
        case(53):
            cat = {
                category: "Transportation and Material Moving",
                icon: transportation
            };
            break;
        default:
            cat = {
                category: "Unknown",
                icon: jeffco
            };
            break;
    }
    return cat;
};

export default Onet;