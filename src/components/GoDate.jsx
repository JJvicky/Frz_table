import React, { Component } from 'react';
import '../Style/main.scss';
import '../Style/components.scss';
import ticketInfo from '../json/ticketInfo.json';
import PropTypes from 'prop-types';


class GoDate extends Component {
    constructor(props) {
        super(props);
        this.refBox = React.createRef();
        this.state = {
            index: 0,
            row: 3,
            col: 3,
            target: 24,
            arrowRight :true ,
            arrowLeft : false
        }
    }
    static propTypes = {
        show: PropTypes.number,
        slide: PropTypes.number,
        speed: PropTypes.number,
        whenClick: PropTypes.func
    };
    static defaultProps = {
        show: 4,
        slide: 1,
        speed: 0.3
    };

    getShowPercent = () => {
        var showPercent;
        switch (this.props.show) {
            case 1:
                showPercent = "100";
                break;
            case 2:
                showPercent = "50";
                break;
            case 3:
                showPercent = "33.33";
                break;
            case 4:
                showPercent = "25 ";
        }
        return showPercent;
    }

    next = () => {
        var arrowRight = this.state.arrowRight;
        var arrowLeft = this.state.arrowRight;
        var index = this.state.index;
        var showPercent = this.getShowPercent();

        //判斷移動格數/distance
        if ((index + this.props.slide + this.props.show) <= 7) {
            index = index + this.props.slide
        } else {
            index = index + (7 - index - this.props.show);
        }

        var slideDistance = showPercent * index;
        var slide = document.querySelectorAll(".slide");
        for (var i = 0; i < slide.length; i++) {
            slide[i].style.left = "-" + slideDistance + "%";
            // slide[i].style.transform ="translateX(-"+slideDistance+")";
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
        var showPercent = this.getShowPercent();

        //判斷移動格數
        if (index - this.props.slide <= 0) {
            index = 0;
        } else {
            index = index - this.props.slide;
        }
        var slideDistance = showPercent * (index);
        var slide = document.querySelectorAll(".slide");
        for (var i = 0; i < slide.length; i++) {
            slide[i].style.left = "-" + slideDistance + "%";
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

    toThousands = (num) => {
        var result = [], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) { result.unshift(','); }
        }
        return result.join('');
    }

    toggleItem = (e) => {   
        const target = e.target;
        const id = target.getAttribute("id");
        const divid7 = Math.floor(id / 7);  // find #row
        const reminder = id % 7;   //find #col
        this.setState({
            row: divid7,
            col: reminder,
            target : id
        })
        // click 後callback function
        this.props.whenClick(target);

    }

    // componentDidMount = () => {

    //     //處理resize 1.小變大格子要重新偵測   2.不要transition(不要滑動)   3. resize(w>768)index重新歸零   4.(大到小index=0 )
    //     var that = this;
    //         window.addEventListener("resize",function(){
    //             var width = document.documentElement.clientWidth;
    //             if(width>768){
    //                 // var slide = document.querySelectorAll(".slide");
    //                that.setState({
    //                 index : 0
    //             });              
    //             }
    //     })
    // }


    render() {
        const arrowLeft = this.state.arrowLeft ? "arrow left" :"arrow left disable" ;
        const arrowRight = this.state.arrowRight ? "arrow right" :"arrow right disable" ;
        const speed = this.props.speed;

        return (
            <div className="goDate">
                <div className={arrowLeft} onClick={this.prev}><i class="fas fa-angle-left"></i></div>
                <div className={arrowRight} onClick={this.next}><i class="fas fa-angle-right"></i></div>
                <table>
                    <tbody>

                        {ticketInfo.data[0].data.map((arr1, index1) => {
                            return (
                                <tr key={index1}>
                                    <td>
                                        <div className={arr1.goDate.substr(0, 5) == '01/01' ? "date newYear" : "date"}>
                                            <span>{arr1.goDate}</span>
                                        </div>
                                    </td>
                                    <td className={(this.state.row == index1) ? 'interchange':''} >
                                        <div className="slide flex" style={{transition: speed + 's'}}>
                                            {arr1.detail.map((arr2, index2) => {
                                                let interchange = (this.state.col == index2) ? "interchange" : '';
                                                let cheapest = arr2.cheapest ? "cheapest " + this.props.getShow() : this.props.getShow();
                                                let hover = (this.state.target == (index1 * 7 + index2)) ? "hover" :'';
                                            
                                                return (
                                                    <div id={index1 * 7 + index2} className={`${interchange} ${cheapest} ${hover}`} key={index1 * 7 + index2} onClick={this.toggleItem} ref={this.clickTarget}><span>{Number(arr2.price) ? "$" : ''}{this.toThousands(arr2.price)}{Number(arr2.price) ? <span> 起</span> : ''}</span></div>)
                                            })}

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        )

    };
}


export default GoDate;