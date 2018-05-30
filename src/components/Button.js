import React from 'react';
import '../styles/reset-button.css';

const Button = (props) => (
    <button
        className="reset-button"
        style={{visibility: props.visibility}}
        onClick={props.onClick}
    >
        <b>{props.words}</b>
    </button>
)

export default Button;