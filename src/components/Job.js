import React, { Component } from 'react';
import '../styles/job.css';

class Job extends Component {
    constructor(props){
        super(props);
        this.handleDescClick = this.handleDescClick.bind(this);
        this.handleJobDivClick =this.handleJobDivClick.bind(this);
    }

    handleDescClick(e){
        e.target.parentElement.classList.add("desc-not-visible");
    }

    handleJobDivClick(e){
        e.target.parentElement.lastChild.classList.contains("job-desc") && e.target.parentElement.lastChild.classList.toggle("desc-not-visible");
    }

    render(){
        return (
            <span className="job" onClick={this.handleJobDivClick}>
                <div className="job-title-desc">
                    <h4 
                        key={this.props.job.CONumber + this.props.job.JobTitle}
                        className="job-title">{this.props.job.JobTitle}
                    </h4>
                    <p
                        key={this.props.job.CONumber + this.props.job.Name}
                        className="employer">{this.props.job.Name}
                    </p>
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

            </span>
        )
    }
}



export default Job;