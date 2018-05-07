import React, { Component } from 'react';
import '../styles/job.css';
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


class Job extends Component {
    constructor(props){
        super(props);
        this.handleDescClick = this.handleDescClick.bind(this);
    }

    handleDescClick(e){
        e.target.parentElement.classList.add("desc-not-visible");
    }

    render(){
        return (
            <span className="job">
                <div className="job-title-desc">
                    <h4 key={this.props.job.CONumber + this.props.job.JobTitle} className="job-title">{this.props.job.JobTitle}</h4>
                    <p key={this.props.job.CONumber + this.props.job.Name} className="employer">{this.props.job.Name}</p>
                    <div className="job-desc desc-not-visible" onClick={this.handleDescClick}>
                        <p
                            key={this.props.job.CONumber}
                            className="co-number"
                        >
                            CO Number: {this.props.job.CONumber}
                        </p>
                        <p
                            key={this.props.job.CONumber + this.props.job.JobTitle + this.props.job.FT_PT}
                            className="ft-pt"
                        >
                            FT/PT: {this.props.job.FT_PT}
                        </p>
                    </div>
                </div>
                <div>
                    <img src={jobIcon(this.props.job.ONETCat)} />
                </div>

            </span>
        )
    }
}

const jobIcon = (onet) => {
    var icon;
    switch(onet){
        case(29):
            icon = medical;
            break;
        case(31):
            icon = medical;
            break;
        case(13):
            icon = business;
            break;
        case(17):
            icon = engineering;
            break;
        case(27):
            icon = art;
            break;
        case(37):
            icon = maintenance;
            break;
        case(21):
            icon = socialservices;
            break;
        case(15):
            icon = computer;
            break;
        case(47):
            icon = construction;
            break;
        case(25):
            icon = book;
            break;
        case(45):
            icon = ag;
            break;
        case(35):
            icon = food;
            break;
        case(49):
            icon = repair;
            break;
        case(23):
            icon = legal;
            break;
        case(19):
            icon = science;
            break;
        case(11):
            icon = management;
            break;
        case(43):
            icon = admin;
            break;
        case(39):
            icon = personalservice;
            break;
        case(51):
            icon = production;
            break;
        case(33):
            icon = protection;
            break;
        case(41):
            icon = sales;
            break;
        case(53):
            icon = transportation;
            break;
        default:
            icon = jeffco;
            break;
    }
    return icon;
};

export default Job;