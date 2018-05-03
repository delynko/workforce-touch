import React, { Component } from 'react';
import Job from './Job';
import '../styles/job-list.css';

class JobList extends Component {
    constructor(props){
        super(props);
        this.handleJobTitleClick = this.handleJobTitleClick.bind(this);
    }

    handleJobTitleClick(e){
        e.target.parentElement.lastChild.classList.contains("job-desc") && e.target.parentElement.lastChild.classList.toggle("desc-not-visible");
    }

    
    render() {
        return(
            <div className={"not-visible job-list-container"}>
                {this.props.jobs.map((job) =>{
                    return(
                        <div key={job.attributes.CONumber + "job-container"} className="job-container" onClick={this.handleJobTitleClick}>
                            <Job job={job.attributes}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default JobList;