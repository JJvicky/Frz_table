import React, { Component } from 'react';
import GoDate from './GoDate'
import '../Style/main.scss';
import '../Style/components.1.scss';
import PropTypes from 'prop-types';


function Title(){
    return(
    <div className="title">
    <h2>低價月曆</h2>
    <div className="bar bg-grey-info"><span></span></div>
    </div>
    )
}

class FrzTable extends Component {
    constructor(props){
        super(props);
        this.state = {
        index: 0,
        arrowRight :true ,
        arrowLeft : false
    }     
    }
    static propTypes = {
        index: PropTypes.number,
        arrowRight: PropTypes.bool,
        arrowLeft: PropTypes.bool,
    };
    static defaultProps = {
        show: 4,
        slide: 1,
        speed: 0.3,
    };
    //M版display
    getShow = () => {
        let show = this.props.show;
        return 'show' + show;
    }
    // next page
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
        if ((index + this.props.show) === 7) {
           arrowRight = false
        }
        this.setState({
            index: index,
            arrowLeft,
            arrowRight
        })
    }
    // prev page
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
        if (index === 0) {
            arrowLeft = false;
            arrowRight = true;
        }
    
        this.setState({
            index: index,
            arrowLeft,
            arrowRight
        })
    }
 
       
  
    render() { 
        const show = this.props.show; 
        const slide = this.props.slide; 
        const speed = this.props.speed;
        const{arrowLeft,arrowRight,index}=this.state;
    
        return ( 
        <div className="frzTable">
        {<Title />}
        <GoDate slide = {slide} show= {show} speed={speed} whenClick = {this.props.whenClick} getShow={this.getShow} arrowLeft={arrowLeft}
        arrowRight={arrowRight} index={index} next={this.next} prev={this.prev}/>
        </div> );
    }
}
 
export default FrzTable;