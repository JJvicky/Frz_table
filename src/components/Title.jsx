import React, { Component } from 'react';
import '../Style/main.css';
import '../Style/components.css'

class Title extends Component {
    state = {  }
    render() { 
        return (
            <div className="title">
            <h2>低價月曆</h2>
            <div className="bar bg-grey-info"><span></span></div>
            </div>
        );
    }
}
 
export default Title;