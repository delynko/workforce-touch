import React, { Component } from 'react';
import '../styles/reset-button.css';

class ResetButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <button
                className="reset-button"
                style={{visibility: this.props.visibility}}
                onClick={this.props.onClick}
            >
                <b>New Search</b>
            </button>
        )
    }
}

export default ResetButton;