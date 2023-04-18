import React, { useState } from 'react';
import { useEffect, useRef } from 'react'
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile } from 'ol/layer';
import OSM from "ol/source/OSM";
import './map.scss'
import {
    GisMap,
    GisLayer,
    MobileFeature,
    LineFeature,
    PointFeature,
    PolygonFeature,
    RectFeature,
    EllipseFeature,

} from '../util/olMap'
import { featureData, labelToValue } from './fetureData'
import {
    CloseOutlined,
   
} from '@ant-design/icons';

const MapOl = () => {
    // let [mapCon, setMapCon] = useState('')
    let [overlayerList, setoverlayerList] = useState([])
    const mapRef = useRef();
    let layer;
    let mapCon
    useEffect(() => {
        // 初始化地图
        if (!mapCon) {
            mapCon = new GisMap(mapRef.current)
            window.mapCon = mapCon;
            layer = new GisLayer(mapCon);
            featureInit()
            setTimeout(()=>{
                createDetailBox()
            },1000)
        }
        mapCon.featureClick =((e,feature)=>{
            let layer = window.mapCon.getOverlayById(`${feature.values_.batch}-overlay`);
            layer.setPos(feature.getPosition());

        })
        // return () => setMapCon('')
    }, []);
    useEffect(() => {
        if (overlayerList.length ){
            createDetailBox()
        }
      }, [overlayerList]);
   
    const closeOverlay = (cur) => {
        let layer = window.mapCon.getOverlayById(cur.id);
        layer.setPos(undefined);
    }
    const createDetailBox =()=>{
        overlayerList.forEach((ele)=>{
            let elemenet = document.getElementById(ele.id)
            let _overlay = window.mapCon.createOverlay(elemenet,[0,0],ele.id)
        })

    }
  

    var localStation = overlayerList.map((item, index) => {
        return (<div className='tip-overlay' key={index} id={item.id}>
            <div className='tip-detail'>
                <span onClick={() => closeOverlay(item)} className="close-right">
                <CloseOutlined  />

                </span>
                <div style={{height:'10px'}}>

                </div>
                {item.data.map((ele,idx) => {
                    return (
                        <div className='tip-row' key={idx}>
                            <div className='label-tip'>
                                {ele.label}
                            </div>
                            <div className='value-tip'>
                                ：{ele.value}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>)
    })
    const dealData = (data) => {
        let result = []
        labelToValue.forEach(ele => {
            if (data[ele.prop]) {
                let obj = {
                    label: ele.label,
                    value: data[ele.prop]
                }
                result.push(obj)

            }

        })
        return result

    }

    const featureInit = () => {
        let resultArry = []
        featureData.forEach(ele => {
            let feature = new MobileFeature({
                id: ele.batch,
                label: ele.name,
                labelColor: ele.color,
                img: require(`../img/${ele.icon}.png`),
                position: [ele.lon, ele.lat],
                scale: ele.scale,
                rotation: ele.rotation ? ele.rotation : 0
            })
            layer.addFeature(feature)
            feature.setProperties(ele);
            let obj = {
                id: `${ele.batch}-overlay`,
                data: dealData(ele)
            }
            resultArry.push(obj)

        })
        setoverlayerList(resultArry)
       

    }
    return (
        <div className="container" style={{ height: '100%' }}>
            <div ref={mapRef} id="map" style={{ height: '100%', zIndex: 10 }}></div>
            <div className='tip-con'>
                {localStation}
            </div>
        </div>
    )


}
export default MapOl