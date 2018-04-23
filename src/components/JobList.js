import React, { Component } from 'react';
import '../styles/job-list.css';

class JobList extends Component {
    constructor(props){
        super(props);
    }


    render() {
        return(
            <div className="job-list-container">
                {this.props.jobs.map((job) =>{
                    return(
                        <div key={job.attributes.CONumber + "job-container"} className="job-container">
                            <p key={job.attributes.CONumber} className="job">{job.attributes.JobTitle}</p>
                            <p key={job.attributes.CONumber + job.attributes.ZIP} className="job-zip">{job.attributes.ZIP}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default JobList;