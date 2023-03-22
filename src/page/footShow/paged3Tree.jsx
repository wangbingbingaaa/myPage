import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
const Pages3Tree = () => {
    useEffect(() => {

        d3.json(`${process.env.PUBLIC_URL}/json/filesys.json`).then( function(json) {    
            var nodes = d3.hierarchy(json, d=>d.kids);                //<1>
            d3.tree().size( [750,260] )( nodes );                     //<2>
            
            var g = d3.select( "#tree" ).append( "g" )                //<3>
                .attr( "transform", "translate(30, 30)" );
        
            var lnkMkr = d3.linkVertical().x( d=>d.x ).y( d=>d.y );   //<4>
            g.selectAll( "path" ).data( nodes.links() ).enter()       //<5>
                .append( "path" ).attr( "d", d=>lnkMkr(d) )
                .attr( "stroke", "#90580F" ).attr( "fill", "none" );
            
            g.selectAll("circle").data( nodes.descendants() ).enter() //<6>
                .append("circle").attr( "r", 5 )
                .attr("fill", '#D37908') 
                .attr( "cx", d=>d.x ).attr( "cy", d=>d.y );
        } );

    }, [])
    return (
        <>
            <svg id="tree" width="800" height="300">
            </svg>
        </>
    )

}
export default Pages3Tree