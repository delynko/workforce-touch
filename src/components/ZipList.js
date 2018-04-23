import React, { Component } from 'react';
import JobList from './JobList';
import '../styles/zip-list.css';

class ZipList extends Component {
    constructor(props){
        super(props);
        this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    handleTitleClick(){
        console.log(this.props.jobs);    
    }

    render(){        
        
        return (
            <div className="zip-list">
                <p
                    onClick={this.handleTitleClick}
                >
                    {this.props.title}
                </p>
                {this.props.jobs.map((zip)=>{
                    return(
                        <div key={zip.ZIP + '-container'} className={zip.ZIP + '-container'}>
                            <h1>Jobs in {zip.ZIP}</h1>
                            <JobList jobs={zip.jobs} />
                        </div>
                    )
                })}

            </div>
        )

        
    }
}

export default ZipList;