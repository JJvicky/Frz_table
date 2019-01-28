import React, { Component } from 'react';
import FrzTable from './components/frzTable';
import './Style/main.scss';

class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
    const slide = this.props.count.slide;
    const show = this.props.count.show;
    const speed = this.props.speed;
    const whenClick = this.props.whenClick;
        return (
            <div className="app">
            <FrzTable slide = {slide} show= {show} speed={speed} whenClick={whenClick}/>      
            </div> 
         );
    }
}
 
export default App;