
import React, { useEffect, useState } from 'react';
import Paged3linebar from './paged3linebar'
import Pageded3Map from './paged3Map'
import Pages3Tree from './paged3Tree';
import Paged3Bar from './paged3Bar';
import Paged3Pie from './paged3Pie';

const Pageded3 =(props)=>{
    return (
        <>
         <Paged3Bar/>
        <div style={{height:'60px'}}></div>
        <Paged3linebar/>
        <div style={{height:'60px'}}></div>
        <Pageded3Map/>
        <div style={{height:'60px'}}></div>
        <Pages3Tree/>
        <div style={{height:'60px'}}></div>
       
        <Paged3Pie></Paged3Pie>
        </>
    )

}
export default Pageded3