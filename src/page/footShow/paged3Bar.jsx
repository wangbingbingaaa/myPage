
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
const Paged3Bar =(props)=>{
    useEffect(()=>{
        const data = [
            { date: '2011', q1: 155, q2: 200, q3: 214, q4: 234 },
            { date: '2012', q1: 165, q2: 210, q3: 244, q4: 254 },
            { date: '2013', q1: 175, q2: 230, q3: 274, q4: 274 },
            { date: '2014', q1: 185, q2: 250, q3: 304, q4: 294 },
            { date: '2015', q1: 195, q2: 270, q3: 334, q4: 314 },
            { date: '2016', q1: 205, q2: 290, q3: 364, q4: null }
          ]
   
    const margin = { top: 30, right: 0, bottom: 0, left: 30 }
    const width = 540
    const height = 300
    let chart = d3
      .select('#barChart').append( "svg" )
      .attr('width', 800)
      .attr('height', 400)

    let x0 = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)

    let x1 = d3.scaleBand().padding(0.05)

    let y = d3.scaleLinear().rangeRound([height, 0])

    let z = d3
      .scaleOrdinal()
      .range(['#98abc5', '#7b6888', '#a05d56', '#ff8c00'])

     
    let keys = Object.keys(data[0]).slice(1)
    const names = {
      q1: '第一季度',
      q2: '第二季度',
      q3: '第三季度',
      q4: '第四季度'
    }
   
    x0.domain(
      data.map(function(d) {
        return d.date
      })
    )
    x1.domain(keys).rangeRound([0, x0.bandwidth()])
    y.domain([
      0,
      d3.max(data, function(d) {
        return d3.max(keys, function(key) {
          return d[key]
        })
      })
    ]).nice()

    let g = chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设最外包层在总图上的相对位置

    g.append('g') // 画柱状图
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return 'translate(' + x0(d.date) + ',0)'
      })
      .selectAll('rect')
      .data(function(d) {
        return keys.map(function(key) {
          return { key: key, value: d[key] }
        })
      }) // 把json数据转格式
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x1(d.key)
      })
      .attr('cursor', 'pointer')
      .attr('width', x1.bandwidth())
      .attr('fill', function(d) {
        return z(d.key)
      })
      .attr('height', 0)
      .attr('y', height)
      .transition()
      .duration(750)
      .delay(function(d, i) {
        return i * 10
      })
      .attr('y', function(d) {
        return y(d.value)
      })
      .attr('height', function(d) {
        return height - y(d.value)
      })

    g.append('g') // 画x轴
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0))

    g.append('g') // 画y轴
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('营收(万)')

    let legend = g
      .append('g') // 画legend
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', 'translate(65,0)')
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice())
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')'
      })

    legend
      .append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z)

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(function(d) {
        return names[d]
      })

    chart
      .append('g') // 输出标题
      .attr('class', 'grouped-bar--title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '16px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', 20)
      .text('XX公司近几年各季度产生营收情况汇总')

    },[])
    return (
        <>
        <div id='barChart' style={{width:'800px',height:'400px'}}>

        </div>
        </>
    )

}
export default Paged3Bar