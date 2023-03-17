import React, { useState } from 'react';
import * as THREE from '../util/three/three.module';
import { OrbitControls } from "../util/three/OrbitControls";
import { useEffect, useRef } from 'react'
import './main.scss'

import { wordLine } from '../util/line.js';
import { ExtrudeMesh } from '../util/ExtrudeMesh.js';
import { cityPointMesh } from '../util/cityPointMesh'
import { ConeMesh } from '../util/ConeMesh.js';

const ThreeMap = () => {
    let [mapCon,setMapCon] = useState('')
    useEffect(() => {
         // 初始化地图
         if (!mapCon){
            setMapCon('123')
            init()

        }
        return () => setMapCon('')
       
    }, [])

    const init = () => {
        var scene = new THREE.Scene(); //创建场景对象Scene

        // 组对象mapGroup是所有国家边界Line模型的父对象
        var mapGroup = new THREE.Group();
        scene.add(mapGroup);
        var lineGroup = new THREE.Group();//边界线组
        mapGroup.add(lineGroup);
        var meshGroup = new THREE.Group();//轮廓Mesh组
        mapGroup.add(meshGroup);
        // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
        var mapHeight = 0.8;//拉伸高度
        lineGroup.position.z = mapHeight + mapHeight * 0.1;//适当偏移解决深度冲突

        var loader = new THREE.FileLoader();
        loader.setResponseType('json');
        loader.load(`${process.env.PUBLIC_URL}/json/china.json`, function (data) {
            //Line绘制国家
            data.features.forEach(function (area) {
                if (area.geometry.type === "Polygon") {
                    // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
                    area.geometry.coordinates = [area.geometry.coordinates];
                }
                // 解析所有封闭轮廓边界坐标area.geometry.coordinates
                lineGroup.add(wordLine(area.geometry.coordinates));//省份边界轮廓插入组对象mapGroup
                // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
                meshGroup.add(ExtrudeMesh(area.geometry.coordinates, mapHeight));//省份轮廓拉伸Mesh插入组对象mapGroup
            })
            // 地图底部边界线
            var lineGroup2 = lineGroup.clone();
            mapGroup.add(lineGroup2);
            lineGroup2.position.z = -mapHeight * 0.1;//适当偏移解决深度冲突
        });

        /**
   * 光源设置
   */
        // 平行光1
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(400, 200, 300);
        scene.add(directionalLight);
        // 平行光2
        var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight2.position.set(-400, -200, -300);
        scene.add(directionalLight2);
        //环境光
        var ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);
        //three.js辅助坐标系
        var axesHelper = new THREE.AxesHelper(300);
        scene.add(axesHelper);
        /**
         * 相机设置
         */
        var width = document.getElementById('threecon').clientWidth; //窗口宽度
        var height =document.getElementById('threecon').clientHeight; //窗口高度
        var k = width / height; //窗口宽高比
        // var s = 200;
        var s = 15;//根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        // camera.position.set(200, 300, 200); //设置相机位置
        // camera.position.set(104, 35, 200); //沿着z轴观察
        // 通过OrbitControls在控制台打印相机位置选择一个合适的位置
        camera.position.set(104, -105, 200);
        camera.lookAt(104, 35, 0); //指向中国地图的几何中心
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer({
            antialias: true, //开启锯齿
        });
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0x282C34, 1); //设置背景颜色
        // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

        document.getElementById('threecon').appendChild(renderer.domElement);

        // 标注出来省份的行政中心
        var pos = [113.4668, 33.8818];//省份行政中心位置经纬度
        var size = 2.0;//大小根据地图尺寸范围设置或者说相机渲染范围
        // 河南郑州市经纬度
        var mesh = cityPointMesh(size, pos[0], pos[1]);
        mesh.position.z = mapHeight + 2.0;//棱锥高度二分之一位置
        scene.add(mesh);

        var lengzhui = ConeMesh(1.0, pos[0], pos[1]);
        lengzhui.position.z = mapHeight;
        scene.add(lengzhui);



        // 光圈大小在原大小基础上1~2.5倍在之间变化,也就是mesh.size范围2~5之间
        var _s = 2.0;
        // 渲染函数
        function render () {
            lengzhui.rotateZ(0.01);
            _s += 0.02;
            mesh.scale.set(_s, _s, _s);
            if (_s <= 2.6) {
                mesh.material.opacity = (_s - 2.0) * 1.67;//1.67约等于1/(2.6-2.0)，保证透明度在0~1之间变化
            } else if (_s > 2.6 && _s <= 5) {
                mesh.material.opacity = 1 - (_s - 2) / 3;//缩放5.0对应0 缩放2.0对应1
            } else {
                _s = 2.0;
            }
            renderer.render(scene, camera); //执行渲染操作
            requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
            // console.log(camera.position);
        }
        render();
        //创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
        // 旋转、缩放用于代码调试

        var controls = new OrbitControls(camera, renderer.domElement);
        // 相机控件与.lookAt()无效( .target属性 )
        controls.target.set(104, 35, 0);
        controls.update();//update()函数内会执行camera.lookAt(controls.target)

    }




    return (
        <div className="threeContainer" id='threemapdiv' style={{ height: '100%', width: '100%' }}>
            <div id='threecon' style={{ height: '500px', width: '100%' }}>

            </div>
            <div className="tagDiv" id="tag">
                <div id="name" style={{ color: '#ffffff' }}>
                    省份：河南
                </div>
                <div id="title" style={{ marginTop: '10px', color: '#ffffff' }}>
                    数量：10
                </div>
            </div>

        </div>
    )


}
export default ThreeMap