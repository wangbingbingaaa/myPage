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
import * as echarts from 'echarts';
import { DragPan } from "ol/interaction";
import { Points } from '../util/three/three.module';

import { featureData, labelToValue } from './fetureData'
import { tsqd, drawPolygon, drawRect, drawCircle, drawLine, clearDrawCache } from '../util/map-op';
import {
    CloseOutlined,DownOutlined
} from '@ant-design/icons';
import { Button, Modal, Form, Input, Radio ,Tree } from 'antd';
import MapGetVal from './mapGetVal';

const MapOl = () => {
    let [btnType, setBtnType] = useState('')
    let [overlayerList, setoverlayerList] = useState([])
    let [posArray, setPosArry] = useState([])
    let [showTree, setShowTree] = useState(true)
    let [treeData,setTreeData]= useState([])
    let [defaultSelectedkeys,setdefaultSelectedkeys] = useState([''])
    const mapRef = useRef();
    let layer;
    let mapCon;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (type) => {
        setIsModalOpen(true);
        setBtnType(type)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        // 初始化地图
        if (!mapCon) {
            mapCon = new GisMap(mapRef.current)
            window.mapCon = mapCon;
            layer = new GisLayer(mapCon);
            window.layer = layer
            featureInit()
            treeInit()
            initChart()
        }
        mapCon.featureClick = ((e, feature) => {
            let _layer = window.mapCon.getOverlayById(`${feature.values_.batch}-overlay`);
            _layer.setPos(feature.getPosition());

        })
        // return () => setMapCon('')
    }, []);
    useEffect(() => {
        if (overlayerList.length) {
            createDetailBox()
            createAnimationPoint()
        }
    }, [overlayerList]);
    const initChart =()=>{
        let element = document.getElementById('echart-pie')
        let _overlay = window.mapCon.createOverlay(element, [11485932.306003379, 4208434.603482161], 'echart-pie')

        
        let option = {
          
            tooltip: {
              trigger: 'item'
            },
          
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          setTimeout(()=>{
            var chartDom = document.getElementById('echart-pie-child');
            console.log(chartDom)
            var myChart = echarts.init(chartDom);
            option && myChart.setOption(option);

        },1000)

       

    }
    const treeInit =()=>{
        let result =[]
        featureData.forEach((ele,index)=>{
            let obj ={
                title:ele.name,
                key:`${ele.name}-${index}`,
                children:[],
                id: ele.batch,
            }
            result.push(obj)
            setdefaultSelectedkeys(current=>[...current, obj.key])
        })
        setTreeData(result)

    }

    const closeOverlay = (cur) => {
        let _layer = window.mapCon.getOverlayById(cur.id);
        _layer.setPos(undefined);
        let line = window.mapCon.getFeatureById(`${cur.id}-line`)
        line.getGeometry().setCoordinates([[0, 0], [0, 0]]);
    }
    const createAnimationPoint  =()=>{
        overlayerList.forEach((ele) => {
            let fId = ele.id.replace('-overlay', '')
            let nextFeature = window.mapCon.getFeatureById(fId)
            var startPoint = nextFeature.getGeometry().getCoordinates();
            let element = document.getElementById(`${ele.id}-point`)
            let _overlay = window.mapCon.createOverlay(element, [0, 0], `${ele.id}-point`)
            _overlay.setPosition(startPoint);
        })

    }
    const createDetailBox = () => {
        overlayerList.forEach((ele,indexx) => {
            let fId = ele.id.replace('-overlay', '')
            let nextFeature = window.mapCon.getFeatureById(fId)
            let element = document.getElementById(ele.id)
            let _overlay = window.mapCon.createOverlay(element, [0, 0], ele.id)
            if (indexx ==1){
                var spp= nextFeature.getGeometry().getCoordinates();
                _overlay.setPosition(spp)
            }
            // 连接线
            let Pos = [[0, 0], [0, 0]];
            let lineFeatrue = new LineFeature({
                id: `${ele.id}-line`,
                points: Pos,
                color: '#000000'

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
                        var newX = dd2[0];
                        var newY = dd2[1];
                        var newPoint = window.mapCon.getCoordinateFromPixel([newX, newY]);
                        console.log(newPoint)
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
    var animationPoint = overlayerList.map((item, index) => {
        return (<div className='css_animation1' key={index} id={`${item.id}-point`}>
            <div className='css_animation'>
            </div>
        </div>)
    })


    var localStation = overlayerList.map((item, index) => {
        return (<div className='tip-overlay' key={index} id={item.id}>
            <div className='tip-detail'>
                <span onClick={() => closeOverlay(item)} className="close-right">
                    <CloseOutlined />

                </span>
                <div style={{ height: '10px' }}>

                </div>
                {item.data.map((ele, idx) => {
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
    const localMap = (val) => {
        setIsModalOpen(false)
        setPosArry([]);
        if (val.type == 'point') {
            tsqd().then((val) => {
                let obj = {
                    lat: val[1],
                    lon: val[0],
                    key: val[0]

                }
                setPosArry(current => [...current, obj]);
                setIsModalOpen(true)
            })

        } else if (val.type == 'line') {
            //二维数组
            drawLine().then((val) => {
                if (val.length) {
                    val.forEach(ele => {
                        let obj = {
                            lat: ele[1],
                            lon: ele[0],
                            key: ele[0]
                        }
                        setPosArry(current => [...current, obj]);
                    })
                }
                setIsModalOpen(true)
            })

        } else if (val.type == 'box') {
            drawPolygon().then((val) => {
                if (val.length) {
                    val.forEach((ele, index) => {
                        let obj = {
                            lat: ele[1],
                            lon: ele[0],
                            key: ele[0] * 1000000 + index
                        }
                        setPosArry(current => [...current, obj]);
                    })
                }
                setIsModalOpen(true)

            })

        } else if (val.type == 'circle') {
            drawCircle().then((val) => {
                let obj = {
                    lat: val.center[1],
                    lon: val.center[0],
                    key: val.center[0]
                }
                setPosArry(current => [...current, obj]);
                setIsModalOpen(true)
            })
        }

    }
    const clearMap = () => {
        clearDrawCache()

    }
  
      const onCheck = (checkedKeys, info) => {
        setdefaultSelectedkeys(checkedKeys)
        if(!info.node.checked){
            let feature = window.layer.getFeatureById(info.node.id);
            feature.setAllLayerVisible(true)

        }else {
            let feature = window.layer.getFeatureById(info.node.id);
            feature.setAllLayerVisible(false)

        }
      };
    return (
        <div className="container" style={{ height: '100%' }}>
            <div ref={mapRef} id="map" style={{ height: '100%', zIndex: 10 }}></div>
            <div className="func-btn">
                <a className="btn-self" href="#" onClick={() => clearMap('清除所有画图')}>清除所有画图</a>
                <a className="btn-self" href="#" onClick={() => showModal('地图取值')}>地图取值</a>
            </div>
            <div className='tip-con'>
                {localStation}
            </div>
            <div>
                {animationPoint}
            </div>
            <div className='echart-pie' id='echart-pie'>
                <div id='echart-pie-child' className='echart-pie-child'></div>

            </div>
            {
                showTree ?
                    <div className="leftTree">
                        <span className='tree-closer'> </span>
                        <div className='tree-title'>

                        </div>
                        <div className="tree-con">
                            <Tree
                                showLine
                                checkable
                                switcherIcon={<DownOutlined />}
                                defaultExpandAll
                                onCheck={onCheck}
                                treeData={treeData}
                                checkedKeys	={defaultSelectedkeys}
                            />
                        </div>

                    </div>
                    :
                    <div className="leftTree-small">
                        图层
                    </div>
            }
            <div className="btn-relate">
                <Modal title={btnType} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
                    <div className="get-val">
                        <MapGetVal localMap={localMap} dataSource={posArray} />
                    </div>
                </Modal>
            </div>

        </div>
    )


}
export default MapOl