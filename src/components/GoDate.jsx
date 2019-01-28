import React, { Component } from 'react';
import '../Style/main.scss';
import '../Style/components.scss';
import ticketInfo from '../json/ticketInfo.json';
import PropTypes from 'prop-types';


class GoDate extends Component {
    constructor(props){
        super(props);
        this.refBox = React.createRef();  
        this.state = {
            index : 0
        }
    }
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
    
    //判斷div/size
    getShow= () =>{
            let show = this.props.show;
            return 'show'+show ;
        }
    getShowPercent= () => {
        var showPercent ;
        switch (this.props.show){
            case 1 :
            showPercent = "100";
            break;
            case 2 :
            showPercent = "50" ;
            break;
            case 3:
            showPercent = "33.33" ;
            break;
            case 4 :
            showPercent ="25 ";       
        }
        return showPercent;
    }

    next = () =>{        
        var arrowRight =document.getElementsByClassName("arrow right");
        var arrowLeft =document.getElementsByClassName("arrow left");
        var index = this.state.index; 
        var showPercent = this.getShowPercent();
        
        //判斷下一個畫面的箭頭
        if( index >= 0 ){
            arrowLeft[0].classList.remove("disable");
            arrowRight[0].classList.remove("disable");
        }else{
          arrowLeft[0].classList.add("disable");
        }       
        //判斷移動格數/distance
        if( (index + this.props.slide + this.props.show) <= 7 ){
            index = index +this.props.slide   
        }else {
           index = index + (7 - index -this.props.show);        
        }

        var slideDistance = showPercent*index;     
        var slide = document.querySelectorAll(".slide");
        for( var i = 0 ; i<slide.length ; i++ ){
            slide[i].style.left ="-"+slideDistance+"%";
            // slide[i].style.transform ="translateX(-"+slideDistance+")";
        }

        //最後畫面的箭頭
           if( (index + this.props.show) == 7 ){
            arrowRight[0].classList.add("disable");
        }
        

        this.setState({
            index : index
        })

    }
    prev = () =>{
        var showPercent = this.getShowPercent();
        var index = this.state.index;
        var arrowRight =document.getElementsByClassName("arrow right");
        var arrowLeft =document.getElementsByClassName("arrow left"); 
        
        //判斷下一個畫面的箭頭
          if(index > 0){  
          arrowLeft[0].classList.remove("disable");
          arrowRight[0].classList.remove("disable");
        }  
        //判斷移動格數
         if( index - this.props.slide <= 0 ){
            index = 0;
        }else{
           index = index - this.props.slide;
        }
        var slideDistance = showPercent*(index);   
        var slide = document.querySelectorAll(".slide");     
        for( var i = 0 ; i<slide.length ; i++ ){
            slide[i].style.left ="-"+slideDistance+"%";
        }

       //判斷結束畫面的箭頭
        if( index  == 0 ){
            arrowLeft[0].classList.add("disable"); 
        }
        if( (index + this.props.show) == 7 ){
            arrowRight[0].classList.add("disable");
        }
        this.setState({
            index : index
        });
    }
      
    toThousands = (num)=> {  
        var result = [ ], counter = 0;  
        num = (num || 0).toString().split('');  
        for (var i = num.length - 1; i >= 0; i--) {  
            counter++;  
            result.unshift(num[i]);  
            if (!(counter % 3) && i != 0) { result.unshift(','); }  
        }  
        return result.join('');  
    }  
  
    toggleItem = (e) =>{     
        var inter = document.querySelectorAll(".interchange");
        var hover = document.querySelectorAll(".hover");
        for(var i = 0; i<inter.length; i++){
            inter[i].classList.remove('interchange');
        }
        for(var i = 0; i<hover.length; i++){
            hover[i].classList.remove('hover');
        }
      const target = e.target;
      const id = target.getAttribute("id")
      const divid7 = Math.floor(id/7);
      const reminder = id%7;
      const row_id =[];
      const col_id =[];
      
      for( let i=0 ; i<7 ; i++){
          row_id.push(divid7*7+i);
          col_id.push(7*i+ reminder)
      }
 
      row_id.map((item)=>{
          var sibling = document.getElementById(item);
          return(   
        //   document.getElementById(item).setAttribute("class","interchange "+this.getShow())  
   
          sibling.classList.add("interchange")
          )
      })
      col_id.map((item)=>{
        var sibling = document.getElementById(item);
          return(
        //   document.getElementById(item).setAttribute("class","interchange "+this.getShow())  
        sibling.classList.add("interchange")
          )
      })
      var ele = document.getElementById(id);
      ele.classList.add("hover") 
      // click 後callback function
      this.props.whenClick(target); 
      
    }

    componentDidMount = () => {
        var slide = document.querySelectorAll(".slide");
        var speed = this.props.speed;
        //處理客製transition
        for(var i = 0; i<slide.length; i++){
            slide[i].style.transition = "left "+ speed+ "s";
        }
        //處理resize 1.小變大格子要重新偵測   2.不要transition(不要滑動)   3. resize(w>768)index重新歸零 4.(大到小index=0 )
        var that = this; 
        window.addEventListener("resize",function(){
            var width = document.documentElement.clientWidth;
            if(width>768){
                // var slide = document.querySelectorAll(".slide");
                for(var i = 0; i<slide.length; i++){
                    slide[i].style.left = 0;
                    slide[i].style.transition = "left "+ 0 + "s";
                }  
               that.setState({
                index : 0
            });              
            }else{

                var arrowLeft =document.getElementsByClassName("arrow left"); 
                arrowLeft[0].classList.add("disable");
                var arrowRight =document.getElementsByClassName("arrow right");
                arrowRight[0].classList.remove("disable");
                
                for(var i = 0; i<slide.length; i++){
                    slide[i].style.transition = "left "+ speed+ "s";
                }        
            }
         
    })
    }

    render() {
        console.log("index: "+this.state.index);
        return (
         
           <div className="goDate">
           <div className="arrow left disable" onClick={this.prev}><i class="fas fa-angle-left"></i></div>
           <div className="arrow right" onClick={this.next}><i class="fas fa-angle-right"></i></div>
        <table>
            <tbody>

                {ticketInfo.data[0].data.map((arr1,index1)=>{
                    return (
                            <tr key={index1}>
                    <td>
                        <div className={arr1.goDate.substr(0,5)== '01/01'? "date bg-grey-info-sec newYear" : "date bg-grey-info-sec" }>
                            <span>{arr1.goDate}</span>
                        </div>
                    </td>
                    <td>
                        <div className="slide flex">
                        {arr1.detail.map((arr2,index2)=>{                               
                             return (
                             <div className={arr2.cheapest ? "cheapest "+ this.getShow() : this.getShow()} id={index1*7+index2} key={index1*7+index2} onClick={this.toggleItem} ref={this.clickTarget}><span>{Number(arr2.price) ? "$" :''}{this.toThousands(arr2.price)}{Number(arr2.price) ? <span> 起</span> :''}</span></div>)
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