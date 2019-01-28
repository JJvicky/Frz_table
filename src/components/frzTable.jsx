import React, { Component } from 'react';
import Title from './Title';
import BackDate from './BackDate';
import GoDate from './GoDate'
import '../Style/main.scss';
import '../Style/components.scss'


class FrzTable extends Component {
    constructor(props){
        super(props);
    }
    render() { 
        const slide = this.props.slide;
        const show = this.props.show;
        const speed = this.props.speed;
      
        console.log(speed);
        return ( <div className="frzTable">
        <Title />
        <BackDate slide = {slide} show= {show} speed={speed} />
        <GoDate slide = {slide} show= {show} speed={speed} whenClick = {this.props.whenClick}/>
        </div> );
    }
}
 
export default FrzTable;