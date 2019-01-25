import React, { Component } from 'react';
import FrzTable from './components/frzTable';
import './Style/main.css';

class App extends Component {
    state = {  }
    render() { 
        return (
            <div className="app">
            <FrzTable />      
            </div> 
         );
    }
}
 
export default App;