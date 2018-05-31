import React, { Component } from 'react';
import Onet from './Onet';
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
                        <div key={zip.ZIP + '-container'} className={'zip-jobs-container'}>
                            <h3
                                className={'zip-title'}
                                onClick={this.handleJobsInClick}
                            >
                                Jobs in {zip.ZIP} ({zip.city})
                            </h3>
                            {
                                this.props.jobs.map((j) => {
                                    if (j.ZIP === zip.ZIP) {
                                        return (
                                            <div className="not-visible" key={zip.ZIP + "onets"}>
                                                <Onet onets={j.onets} jobs={j} zip={zip.ZIP} />
                                            </div>
                                        )   
                                    }
                                })
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ZipList;