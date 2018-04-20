import React, { Component } from 'react';
import '../styles/zip-list.css';

class ZipList extends Component {
    constructor(props){
        super(props);
        
    }

    render(){

        
        
        return (
            <div className="zip-list">
                <p>{this.props.title}</p>
                {this.props.zip_codes.map((zip) => {
                    return (
                        <div className={zip + "jobs"} key={zip + "jobs"}>
                            <p>Jobs in {zip}</p>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default ZipList;