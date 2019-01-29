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
        let show = (this.props.show >= 4)? 4 :this.props.show;
        return 'show' + show;
    }
    
    next = () => {
        var arrowRight = this.state.arrowRight;
        var arrowLeft = this.state.arrowRight;
        var index = this.state.index;
        const show = (this.props.show >= 4)? 4 :this.props.show;  //maximun show=4
        const slide = (show > this.props.slide)? this.props.slide : show ; //如果slide設定數字大於show, 則顯示show

        //判斷最後index
        if ((index + slide + show) <= 7) {
            index = index + slide
        } else {
            index = index + (7 - index - show);
        }

        //結束畫面的箭頭
        if (index >= 0) {
            arrowLeft = true;
            arrowRight = true;
          } else {
            arrowLeft = false;
          }
        if ((index + show) == 7) {
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
        const show = (this.props.show >= 4)? 4 :this.props.show;  //maximun show=4
        const slide = (show > this.props.slide)? this.props.slide : show ; //如果slide設定數字大於show, 則顯示show
        // 判斷最後index
        if (index - slide <= 0) {
            index = 0;
        } else {
            index = index - slide;
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
    // PC to M : reset index to 0 
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
        const show = (this.props.show >= 4)? 4 :this.props.show;  //maximun show=4
        const slide = (show > this.props.slide)? this.props.slide : show ; //如果slide設定數字大於show, 則顯示show
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