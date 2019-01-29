import React, { Component } from 'react';
import FrzTable from './components/frzTable';
import './Style/main.scss';
import PropTypes from 'prop-types';

class App extends Component {
    constructor(props){
        super(props);
    }
    static propTypes = {
        show: PropTypes.number,
        slide: PropTypes.number,
        speed: PropTypes.number,
        whenClick: PropTypes.func
    };
    render() {
    const show = (this.props.count.show >= 4)? 4 :this.props.count.show;  //maximun show=4
    const slide = (show > this.props.count.slide)? this.props.count.slide : show ; //maximum slide <= show
    const speed = this.props.speed;
    const whenClick = this.props.whenClick;
 
        return (
            <div className="app">
            <FrzTable slide = {slide} show= {show} speed={speed} whenClick={whenClick}/>      
            </div> 
         );
    }
}
 
export default App;