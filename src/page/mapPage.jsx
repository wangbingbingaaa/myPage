import React from 'react';
import {useEffect,useRef} from 'react'
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile} from 'ol/layer';
import OSM from "ol/source/OSM";
import {
    GisMap,
  
} from '../util/olMap'

const MapPage = () => {
    let map =null
    const mapRef = useRef();
    useEffect(() => {
        // 初始化地图
        if (!map){
            map = new GisMap(mapRef.current)
        }
    },[]);
    return (
        <div className="container" style={{height:'100%'}}>
            <div ref={mapRef} id="map" style={{height:'100%'}}></div>
        </div>
    )


}
export default MapPage