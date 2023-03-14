import React from 'react';
import {useEffect,useRef} from 'react'
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile} from 'ol/layer';
import OSM from "ol/source/OSM";
import {defaults as Defaults} from 'ol/control';

// import olMap from '../util/olMap'
const MapPage = () => {
    let map =null
    const mapRef = useRef();
    useEffect(() => {
        // 初始化地图
        initMap()
    });
    const initMap = () => {
        let map = new Map({
            layers: [
              new Tile({
                source: new OSM(), // OSM在线瓦片地图
              })
            ],
            view: new View({
              center: [104.06, 30.67], // 成都
              zoom: 10, // 设置初始化时的地图缩放层级
              projection: 'EPSG:4326', // 坐标系
              maxZoom: 18, // 最大缩放层级
              minZoom: 6, // 最小缩放层级
            }),
            target: 'map', // 地图dom
          
          });
  
        
    }
    return (
        <div className="container" style={{height:'100%'}}>
            <div ref={mapRef} id="map" style={{height:'100%'}}></div>
        </div>
    )


}
export default MapPage