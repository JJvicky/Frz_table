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
            target: 24,
            row: 3,
            col: 3,
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
        const arrowLeft = this.props.arrowLeft ? "arrow left" :"arrow left disable" ;
        const arrowRight = this.props.arrowRight ? "arrow right" :"arrow right disable" ;
        const speed = this.props.speed;
        const stepClass = 'show'+this.props.show+'-slide' + this.props.slide +'-'+this.props.index;
        const slideClass = 'slide flex '+ stepClass;
        console.log(stepClass);

        return (
            <div className="goDate">
                <div className={arrowLeft} onClick={this.props.prev}><i class="fas fa-angle-left"></i></div>
                <div className={arrowRight} onClick={this.props.next}><i class="fas fa-angle-right"></i></div>
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
                                        <div className={slideClass} style={{transition: speed + 's'}}>
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