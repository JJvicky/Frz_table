import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App  
    count={{
    // M版時每次點擊往前往後移動幾格儲存格
    slide: 2, // [number] 
    // M版時一個畫面show幾格儲存格
    show: 3 // [number] 
    }}
    // 設定花多久時間移動完成
    speed={ .5} // [number] 
    // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
    whenClick={ function($element) {
        console.log($element)
    }}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
