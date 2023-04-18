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
import { DragPan } from "ol/interaction";

import { featureData, labelToValue } from './fetureData'
import {
    CloseOutlined,
   
} from '@ant-design/icons';
import { Points } from '../util/three/three.module';

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
            window.layer = layer
            featureInit()
            setTimeout(()=>{
                createDetailBox()
            },1000)
        }
        mapCon.featureClick =((e,feature)=>{
            let _layer = window.mapCon.getOverlayById(`${feature.values_.batch}-overlay`);
            _layer.setPos(feature.getPosition());

        })
        // return () => setMapCon('')
    }, []);
    useEffect(() => {
        if (overlayerList.length ){
            createDetailBox()
        }
      }, [overlayerList]);
   
    const closeOverlay = (cur) => {
        let _layer = window.mapCon.getOverlayById(cur.id);
        _layer.setPos(undefined);
        let line = window.mapCon.getFeatureById(`${cur.id}-line`)
        line.getGeometry().setCoordinates([[0,0],[0,0]]);
    }
    const createDetailBox =()=>{
        overlayerList.forEach((ele)=>{
            let fId = ele.id.replace('-overlay','') 
            let nextFeature = window.mapCon.getFeatureById(fId)
            let element = document.getElementById(ele.id)
            let _overlay = window.mapCon.createOverlay(element,[0,0],ele.id)
            // 连接线
            let Pos = [[0,0],[0,0]];
            let lineFeatrue = new LineFeature({
                id:`${ele.id}-line`,
                points:Pos,
                color:'#000000'
                
            })
            window.layer.addFeature(lineFeatrue);
            var dragPan;
            window.mapCon.getInteractions().forEach(function (interaction) {
                if (interaction instanceof DragPan) {
                    dragPan = interaction;
                }
            });
    
            element.addEventListener('mousedown', function (evt) {
                dragPan.setActive(false);
                _overlay.set('dragging', true);
                window.mapCon.on('pointermove', function (evt) {
                    var startPoint = nextFeature.getGeometry().getCoordinates();
                    if (_overlay.get('dragging')) {
                        var dd2 = window.mapCon.getPixelFromCoordinate(evt.coordinate);
                        var newX = dd2[0] ;
                        var newY = dd2[1];
                        var newPoint = window.mapCon.getCoordinateFromPixel([newX, newY]);
                        _overlay.setPosition(newPoint);
                        lineFeatrue.getGeometry().setCoordinates([startPoint, evt.coordinate]);
                    }
                });
                window.mapCon.on('pointerup', function (evt) {
                    if (_overlay.get('dragging') === true) {
                        dragPan.setActive(true);
                        _overlay.set('dragging', false);
                    }
                });
            });
    
           

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