import React, { Component } from 'react';
import '../styles/reset-button.css';

class ResetButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: 'hidden'
        }
    }

    render() {
        return(
            <button
                className="reset-button"
                // style={{visibility: this.state.visibility}}
            >
                New Search
            </button>
        )
    }
}

export default ResetButton;