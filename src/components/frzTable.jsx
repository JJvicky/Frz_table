import React, { Component } from 'react';
import Title from './Title';
import BackDate from './BackDate';
import GoDate from './GoDate'
import '../Style/main.scss';
import '../Style/components.scss';
import PropTypes from 'prop-types';


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
        if ((index + this.props.show) == 7) {
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
        if (index == 0) {
            arrowLeft = false;
            arrowRight = true;
        }
    
        this.setState({
            index: index,
            arrowLeft,
            arrowRight
        })
    }
    componentDidMount = () => {
    // PC to M版 : reset index to 0 
        const that = this   
        window.addEventListener("resize",function(){
            var width = document.documentElement.clientWidth;
            if(width>768){
                that.setState({
                index : 0
            });              
            }
        });
    }

    render() { 
        const show = this.props.show; 
        const slide = this.props.slide; 
        const speed = this.props.speed;
        const{arrowLeft,arrowRight,index}=this.state;
    
        return ( <div className="frzTable">
        <Title />
        <BackDate slide = {slide} show= {show} speed={speed} getShow={this.getShow} next={this.next} prev={this.prev} index={index}/>
        <GoDate slide = {slide} show= {show} speed={speed} whenClick = {this.props.whenClick} getShow={this.getShow} arrowLeft={arrowLeft}
        arrowRight={arrowRight} index={index} next={this.next} prev={this.prev}/>
        </div> );
    }
}
 
export default FrzTable;