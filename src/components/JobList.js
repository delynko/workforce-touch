import React from 'react';
import Job from './Job';
import '../styles/job-list.css';

const JobList = (props) => (
        <div className={"not-visible job-list-container"}>
            {props.jobs.map((job) =>{
                return(
                        <div key={job.attributes.CONumber + "job-container"} className="job-container">
                            <Job job={job.attributes}/>
                        </div>
                )
            })}
        </div>
)

export default JobList;