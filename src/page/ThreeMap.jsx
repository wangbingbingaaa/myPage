import React, { useState } from 'react';
import * as THREE from '../util/three/three.module';
import { OrbitControls } from "../util/three/OrbitControls";
import { useEffect, useRef } from 'react'
import './main.scss'

import { wordLine } from '../util/line.js';
import { ExtrudeMesh } from '../util/ExtrudeMesh.js';
import { tag, createLabelRender } from '../util/tag.js';
import { prismMesh } from '../util/prismMesh.js';

const ThreeMap = () => {
    let [mapCon, setMapCon] = useState('')
    useEffect(() => {
        // 初始化地图
        if (!mapCon) {
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

        var width = document.getElementById('threecon').clientWidth; //窗口宽度
        var height = document.getElementById('threecon').clientHeight; //窗口高度
        // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
        var mapHeight = 0.8;//拉伸高度
        lineGroup.position.z = mapHeight + mapHeight * 0.1;//适当偏移解决深度冲突

        var loader = new THREE.FileLoader();
        loader.setResponseType('json');

        // 加载GDP数据
        loader.load(`${process.env.PUBLIC_URL}/json/gdp.json`, function (data) {
            var gdpObj = {};//每个省份的名字作为属性，属性值是国家对应GDP
            var gdpMax = 120000//设置一个基准值,以最高的广州gdp为准
            data.arr.forEach(function (obj) {
                var gdp = obj.value;//当前省份GDP
                gdpObj[obj.name] = gdp;//每个省份的名字作为属性，属性值是国家对应GDP
            })

            var prismGroup = new THREE.Group();
            prismGroup.position.z = mapHeight;//适当偏移，以免深度冲突
            scene.add(prismGroup);

            loader.load(`${process.env.PUBLIC_URL}/json/china.json`, function (data2) {
                var color1 = new THREE.Color(0xffff00);
                var color2 = new THREE.Color(0xff0000);//最大数值对应柱子颜
                //Line绘制国家
                data2.features.forEach(function (area) {
                    if (area.geometry.type === "Polygon") {
                        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
                        area.geometry.coordinates = [area.geometry.coordinates];
                    }
                    // 解析所有封闭轮廓边界坐标area.geometry.coordinates
                    lineGroup.add(wordLine(area.geometry.coordinates));//省份边界轮廓插入组对象mapGroup
                    // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
                    meshGroup.add(ExtrudeMesh(area.geometry.coordinates, mapHeight));//省份轮廓拉伸Mesh插入组对象mapGroup

                    var name = area.properties.name;//省份名
                    if (name) {


                        var gdp = gdpObj[name];
                        if (gdp == undefined) console.log(area.properties)
                        var center = area.properties.center;//行政区几何中心经纬度坐标

                        // 颜色插值计算
                        var color = color1.clone().lerp(color2.clone(), gdp / gdpMax);
                        var numHeight = gdp / gdpMax * 10
                        var mesh = prismMesh(center[0], center[1], 0.5, numHeight, color.getHex());
                        prismGroup.add(mesh);

                        // var center = area.properties.cp;//行政区几何中心经纬度坐标
                        // 柱子上方标注标签
                        var tag2D = tag(name);
                        tag2D.position.set(center[0], center[1], 2 + mapHeight)
                        scene.add(tag2D);

                    }


                })
                // 地图底部边界线
                var lineGroup2 = lineGroup.clone();
                mapGroup.add(lineGroup2);
                lineGroup2.position.z = -mapHeight * 0.1;//适当偏移解决深度冲突
            });
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

        var k = width / height; //窗口宽高比
        // var s = 200;
        var s = 18;//根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

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

        var labelRenderer = createLabelRender(width, height)
        if (labelRenderer) {
            document.getElementById('threeTag').appendChild(labelRenderer.domElement);
        }

        // 光圈大小在原大小基础上1~2.5倍在之间变化,也就是mesh.size范围2~5之间
        var _s = 2.0;
        // 渲染函数
        function render () {

            renderer.render(scene, camera); //执行渲染操作
          
            labelRenderer.render(scene, camera);




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


        var chooseMesh = null;//标记鼠标拾取到的mesh
        function choose (event) {
            if (chooseMesh) {
                chooseMesh.material.color.set(0x0E7EA5);//恢复原来颜色
            }
            var Sx = event.clientX; //鼠标单击位置横坐标
            var Sy = event.clientY; //鼠标单击位置纵坐标
            //屏幕坐标转WebGL标准设备坐标
            var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
            var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
            //创建一个射线投射器`Raycaster`
            var raycaster = new THREE.Raycaster();
            //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
            raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
            //返回.intersectObjects()参数中射线选中的网格模型对象
            // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
            var intersects = raycaster.intersectObjects(meshGroup.children);
         
            if (intersects.length > 0) {
                intersects[0].object.material.color.set(0x278EB4);
                chooseMesh = intersects[0].object;
            }
        }
        addEventListener('click', choose); // 监听窗口鼠标单击事件

    }




    return (
        <div className="threeContainer" id='threemapdiv' style={{ height: '100%', width: '100%', }}>
            <div id='threecon' style={{ height: '100%', width: '100%' }}>
            </div>
            <div id='threeTag'></div>

        </div>
    )


}
export default ThreeMap