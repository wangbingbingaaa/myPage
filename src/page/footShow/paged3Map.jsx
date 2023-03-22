
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';


const Pageded3Map = (props) => {
    useEffect(() => {

        var width = '800';
        var height ='450';

        //定义地图的投影
        var projection = d3.geoMercator()
            .center([100, 38])
            .scale(600)
            .translate([width / 2, height / 2]);

        //定义地形路径生成器
        var geoPath = d3.geoPath()
            .projection(projection); //设定投影

        var svg = d3.select("#d3mapCon").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json(`${process.env.PUBLIC_URL}/json/aliChina.json`).then(function (data) {
            var groups = svg.append("g");
            groups.selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("class", "province")
                .attr("stroke", "#333")
                .attr("stroke-width", "0.2px")
                .attr("fill", 'none') 
                .attr("d", (d, i) => geoPath(d))  //使用路径生成器
                .on("mouseover",function(d,i){
                    console.log(i);
       
                  })
    
            
        });
        var title = svg.append("text")
            .text("中国地图")
            .attr("x", width / 2-50)
            .attr("y", 40)
            .attr("font-size", "30")
            .attr("fill", "#555")
     

}, [])
return (
    <>
        <div className="d3mapCon" id='d3mapCon' style={{ height: '450px', width: '100%' }}>

        </div>
    </>
)

}
export default Pageded3Map