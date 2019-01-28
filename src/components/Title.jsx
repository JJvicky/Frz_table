import React, { Component } from 'react';
import '../Style/main.scss';
import '../Style/components.scss'

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