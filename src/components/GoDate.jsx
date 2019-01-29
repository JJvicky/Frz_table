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
        target: PropTypes.number,
        row: PropTypes.number,
        col: PropTypes.number,
    };
    static defaultProps = {
        show: 4,
        slide: 1,
        speed: 0.3,
        index: 0,
        arrowRight :true ,
        arrowLeft : false
    };

  
    toThousands = (num) => {
        var result = [], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i !== 0) { result.unshift(','); }
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

  

    render() {
        const arrowLeft = this.props.arrowLeft ? "arrow left" :"arrow left disable" ;
        const arrowRight = this.props.arrowRight ? "arrow right" :"arrow right disable" ;
        const speed = this.props.speed;
        const stepClass = 'show'+this.props.show+'-slide' + this.props.slide +'-'+this.props.index;
        const slideClass = 'slide flex '+ stepClass;
        
        return (
            <div className="goDate">
                <div className={arrowLeft} onClick={this.props.prev}><i className="fas fa-angle-left"></i></div>
                <div className={arrowRight} onClick={this.props.next}><i className="fas fa-angle-right"></i></div>
                <table>
                    <tbody>
                   
                    <tr className=" bg-grey-info">
                   <td>
                       <div className="date">
                       <span>回程</span>
                        <span>去程</span>
                      </div>    
                   </td>
                   <td>
                       <div className={slideClass} style={{transition: speed + 's'}}>
                       {ticketInfo.data[0].data[0].detail.map((arr1,index1)=>{
                            return(
                                 <div className={arr1.backDate.substr(0,5)=== '01/01'? "newYear "+ this.props.getShow(): this.props.getShow() } key={index1}><span>{arr1.backDate}</span></div>  
                            )
                       })}
                                                      
                       </div>
                   </td>
               </tr>

                        {ticketInfo.data[0].data.map((arr1, index1) => {
                            return (
                                <tr key={index1}>
                                    <td>
                                        <div className={arr1.goDate.substr(0, 5) === '01/01' ? "date newYear" : "date"}>
                                            <span>{arr1.goDate}</span>
                                        </div>
                                    </td>
                                    <td className={ (this.state.row === index1) ? "interchange" : ''} >
                                        <div className={slideClass} style={{transition: speed + 's'}}>
                                            {arr1.detail.map((arr2, index2) => {
                                                // let interchange_r = (this.state.row === index1) ? "interchange" : '';
                                                let interchange_cl = (this.state.col === index2) ? "interchange" : '';
                                                // let interchange = interchange_r + interchange_cl;
                                                let cheapest = arr2.cheapest ? "cheapest " + this.props.getShow() : this.props.getShow();
                                                const target =  index1*7+index2;
                                                let hover = (Number(this.state.target) === target) ? "hover" :'';                                               
                                                let changeSymbol = (String((arr2.price))==="--" ? <span>查看</span> : '--')
                                            
                                                return (
                                                    <div id={index1 * 7 + index2} className={`${interchange_cl} ${cheapest} ${hover}`} key={index1 * 7 + index2} onClick={this.toggleItem} ref={this.clickTarget}><span>{Number(arr2.price) ? "$" : ''}{Number(arr2.price) ? this.toThousands(arr2.price) : changeSymbol}{Number(arr2.price) ? <span> 起</span> : ''}</span></div>)
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