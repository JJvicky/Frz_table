import React, { Component } from 'react';
import '../Style/main.scss';
import '../Style/components.scss';
import ticketInfo from '../json/ticketInfo.json';
import PropTypes from 'prop-types';


class BackDate extends Component {
    static propTypes = {
        show: PropTypes.number,
        slide: PropTypes.number,
        speed: PropTypes.number,
        whenClick : PropTypes.func
    };
    static defaultProps = {
        show: 4,
        slide : 1,
        speed : 0.3
    };
    
    getShow= () =>{
        let show = this.props.show;
        return 'show'+show ;
    }
    
    render() {
        const speed = this.props.speed;
        return (
            <div className="backDate">
            <table>
           <tbody>
               <tr>
                   <td>
                       <div className="date bg-grey-info">
                       <span>回程</span>
                        <span>去程</span>
                      </div>    
                   </td>
                   <td>
                       <div className="slide flex bg-grey-info transition" style={{transition: speed + 's'}}>
                       {ticketInfo.data[0].data[0].detail.map((arr1,index1)=>{
                            return(
                                 <div className={arr1.backDate.substr(0,5)== '01/01'? "newYear "+ this.getShow(): this.getShow() } key={index1}><span>{arr1.backDate}</span></div>  
                            )
                       })}
                                                      
                       </div>
                   </td>
               </tr>
           </tbody>
        </table>
        </div>
        );
    }
}
 
export default BackDate;