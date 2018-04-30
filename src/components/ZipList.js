import React, { Component } from 'react';
import JobList from './JobList';
import '../styles/zip-list.css';

class ZipList extends Component {
    constructor(props){
        super(props);
        this.handleJobsInClick = this.handleJobsInClick.bind(this);
    }

    handleJobsInClick(e){
        e.target.nextElementSibling.classList.contains("not-visible") ? e.target.nextElementSibling.classList.remove("not-visible") : e.target.nextElementSibling.classList.add("not-visible");       
    }

    render(){

        
                
        return (
            <div className="zip-list">
                {this.props.jobs.map((zip)=>{
                    return(
                        <div key={zip.ZIP + '-container'} className={zip.ZIP + '-container'}>
                            <h2
                                onClick={this.handleJobsInClick}
                                id={zip.ZIP + '-container'}
                            >
                            Jobs in {zip.ZIP} ({zip.city})
                            </h2>
                            <JobList
                                jobs={zip.jobs}
                                zip={zip.ZIP}
                            />
                        </div>
                    )
                })}

            </div>
        )

        
    }
}

export default ZipList;