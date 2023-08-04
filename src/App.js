import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import RouterEle from './router/index'


function App () {
    return (
        <BrowserRouter basename="/myPage">
            <RouterEle />
        </BrowserRouter>
    );
}

export default App;
