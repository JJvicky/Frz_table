import React, { Component } from 'react';
import Title from './Title';
import BackDate from './BackDate';
import GoDate from './GoDate'
import '../Style/main.scss';
import '../Style/components.scss'


class FrzTable extends Component {
    constructor(props){
        super(props);
        this.state = {
        index: 0,
        arrowRight :true ,
        arrowLeft : false
    }
        
    }
    getShow = () => {
        let show = this.props.show;
        return 'show' + show;
    }
    
    next = () => {
        var arrowRight = this.state.arrowRight;
        var arrowLeft = this.state.arrowRight;
        var index = this.state.index;

        //判斷最後index
        if ((index + this.props.slide + this.props.show) <= 7) {
            index = index + this.props.slide
        } else {
            index = index + (7 - index - this.props.show);
        }

        //結束畫面的箭頭
        if (index >= 0) {
            arrowLeft = true;
            arrowRight = true;
          } else {
            arrowLeft = false;
          }
        if ((index + this.props.show) == 7) {
           arrowRight = false
        }
        this.setState({
            index: index,
            arrowLeft,
            arrowRight
        })

    }
    prev = () => {
        var arrowRight = this.state.arrowRight;
        var arrowLeft = this.state.arrowRight;
        var index = this.state.index;

        // 判斷最後index
        if (index - this.props.slide <= 0) {
            index = 0;
        } else {
            index = index - this.props.slide;
        }
        //判斷結束畫面的箭頭 
        if( index > 0){
            arrowLeft = true;
            arrowRight = true;
        }
        if (index == 0) {
            arrowLeft = false;
        }
        if ((index + this.props.show) == 7) {
            arrowRight = false;
        }
        this.setState({
            index: index,
            arrowLeft,
            arrowRight
        })
    }
    render() { 
        const slide = this.props.slide;
        const show = this.props.show;
        const speed = this.props.speed;
        const{arrowLeft,arrowRight,index}=this.state;
        console.log("index="+this.state.index);
      
        console.log(speed);
        return ( <div className="frzTable">
        <Title />
        <BackDate slide = {slide} show= {show} speed={speed} getShow={this.getShow} next={this.next} prev={this.prev} index={index}/>
        <GoDate slide = {slide} show= {show} speed={speed} whenClick = {this.props.whenClick} getShow={this.getShow} arrowLeft={arrowLeft}
        arrowRight={arrowRight} index={index} next={this.next} prev={this.prev}/>
        </div> );
    }
}
 
export default FrzTable;