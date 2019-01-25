import React, { Component } from 'react';
import Title from './Title';
import BackDate from './BackDate';
import GoDate from './GoDate'
import '../Style/main.css';
import '../Style/components.css'


class FrzTable extends Component {
    constructor(props){
        super(props);
        this.refBox = React.createRef();
        // 使用者在這裡修改想要的屬性
        this.state = {  
            count :{
                slide: 2,
                show: 3,
                speed: 1
            },
            speed: .3,
            whenClick: function($element) {
                 console.log($element);
            }
        }
    }
    render() { 
        const {slide, show, speed} = this.state.count;
        return ( <div className="frzTable">
        <Title />
        <BackDate slide = {slide} show= {show} speed={speed} />
        <GoDate slide = {slide} show= {show} speed={speed} whenClick = {this.state.whenClick}/>
        </div> );
    }
}
 
export default FrzTable;