import React, { Component } from 'react';
import '../styles/job-list.css';

class JobList extends Component {
    constructor(props){
        super(props);
        this.handleJobTitleClick = this.handleJobTitleClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
    }

    handleJobTitleClick(e){
        e.target.parentElement.lastChild.classList.contains("job-desc") && e.target.parentElement.lastChild.classList.toggle("desc-not-visible");
    }

    handleDescClick(e){
        e.target.parentElement.classList.add("desc-not-visible");
    }

    render() {
        return(
            <div className={"not-visible job-list-container"}>
                {this.props.jobs.map((job) =>{
                    return(
                        <div key={job.attributes.CONumber + "job-container"} className="job-container" onClick={this.handleJobTitleClick}>
                            <div className="job-title-desc">
                                <h4 key={job.attributes.CONumber + job.attributes.JobTitle} className="job-title">{job.attributes.JobTitle}</h4>
                                <p key={job.attributes.CONumber + job.attributes.Name} className="employer">{job.attributes.Name}</p>
                                <div className="job-desc desc-not-visible" onClick={this.handleDescClick}>
                                    <p
                                        key={job.attributes.CONumber}
                                        className="co-number"
                                    >
                                        CO Number: {job.attributes.CONumber}
                                    </p>
                                    <p
                                        key={job.attributes.CONumber + job.attributes.JobTitle + job.attributes.FT_PT}
                                        className="ft-pt"
                                    >
                                        FT/PT: {job.attributes.FT_PT}
                                    </p>
                                </div>
                            </div>
                            
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default JobList;