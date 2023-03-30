import React, { useEffect, useState } from 'react';
import { LineGeometry } from '../util/three/lines/LineGeometry.js';
import { LineMaterial } from '../util/three/lines/LineMaterial.js';
import { LineSegments2 } from '../util/three/lines/LineSegments2.js';
import { Line2 } from '../util/three/lines/Line2.js';
import * as THREE from '../util/three/three.module';
import { OrbitControls } from "../util/three/OrbitControls";
import dataFly from '../util/flyLine/flydata';
import { flyTrackFun, lineFun, childAreaArrFun, centerCamera,cityHeight,cityPoint,startMeshFun,flylineFun } from '../util/flyLine/fly'


const FlyLineTree = () => {
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

        var flyGroup = new THREE.Group();
        var cityGroup = new THREE.Group(); //飞线所有端点标注集合
        var cityPointArr = []; //所有波动光圈mesh的数组
        var _s = 1.5; //波动光圈增加倍数范围
        var startMesh = null; //表示发射中心悬浮棱锥Mesh
        var ENdata = dataFly; //多组经纬度数据


        var meshArr = [];// 声明一个变量，存储所有省份的Mesh，用于射线拾取
        var chooseMesh = null; //表示飞线发射中心对应的省份吗esh

        function extrudeMeshFun (childAreaArr, mapGroup, h) {
            childAreaArr.forEach((childArea, i) => {
                var shapeArr = []
                childArea.geo.forEach((vertices) => {
                    var shape = new THREE.Shape(vertices);
                    shapeArr.push(shape)
                });
                var geometry = new THREE.ExtrudeGeometry(shapeArr,
                    //拉伸参数
                    {
                        depth: h, //拉伸长度
                        curveSegments: 35, //拉伸轮廓细分数
                        bevelEnabled: false //无倒角
                    }
                );
                var material = new THREE.MeshPhongMaterial({
                    color: 0x278EB4,
                    // transparent: true,
                    // opacity: 0.8,
                }); //材质对象
                var mesh = new THREE.Mesh(geometry, material); //网格模型对象
                mapGroup.add(mesh);
                // 河南是默认发射点，颜色比其他省份颜色更亮一些进行标识
                if (childArea.name == '河南') {
                    mesh.material = new THREE.MeshPhongMaterial({
                        color: 0x0Ff000,
                    });
                    chooseMesh = mesh;
                }
                meshArr.push(mesh);
                mesh.name = childArea.name;//设置网格模型对应的省份名字
            });
        }


        function GeoJSON (data) {
            // 组对象mapGroup是所有子行政单元childArea边界Line的父对象
            var mapGroup = new THREE.Group();
            var childAreaArr = childAreaArrFun(data);
            var linegroup = lineFun(childAreaArr);
            mapGroup.add(linegroup)
            var maxL = centerCamera(mapGroup, camera);
            var h = maxL * 0.01; //轮廓拉伸高度
            extrudeMeshFun(childAreaArr, mapGroup, h)
            var linegroup2 = linegroup.clone();
            linegroup2.position.z = h + h * 0.01;
            linegroup.position.z = -h * 0.01;
            mapGroup.add(linegroup2)
            return mapGroup;
        }


        /*当前城市所有相关飞线、柱子、波动光圈批量绘制函数
            参数start：当前城市，也就是飞线发射中心的经纬度坐标Vector3
            参数endArr：与当前当成所有相关城市的经纬度坐标Vector3构成的集合*/
        function currentCityAllFlys (start, endArr) {
            // 每次重新绘制的时候要清除释放原有飞线等模型几何体和材质占用内存
            if (cityGroup.children.length) disposeGroup(cityGroup);
            if (flyGroup.children.length) disposeGroup(flyGroup);

            // 标注发射中心
            var startPoint = cityPoint(start)
            cityGroup.add(startPoint)
            //四棱锥startMesh标注起点
            startMesh = startMeshFun(start);
            cityGroup.add(startMesh);

            cityPointArr.push(startPoint)
            startPoint.position.z += 1.3
            startPoint.geometry.scale(1.2, 1.2, 1.0)
            //批量绘制飞线
            endArr.forEach((cood, i) => {
                var end = new THREE.Vector3(cood.E, cood.N, 0); //终点
                var cityPointMesh = cityPoint(end)
                cityGroup.add(cityPointMesh)
                cityPointMesh.s = _s * Math.random() + 1; //随机设置一个缩放倍数
                cityPointArr.push(cityPointMesh)
                //飞线运动轨迹绘制函数flyTrack
                var flyTrack = flyTrackFun(start, end);
                flyGroup.add(flyTrack); //线条对象添加到场景中

                // 获取飞线轨迹线上的顶点坐标，用于飞线段绘制
                var points = flyTrack.flyTrackPoints;

                var index = 20; //飞线索引起点
                var flyline = flylineFun(index, points); //绘制一段飞线
                //飞线取点索引范围：points.length - flyline.num
                flyline.index = Math.floor((points.length - flyline.num) * Math.random()); //索引位置随机
                flyTrack.add(flyline); //飞线段flyline作为飞线轨迹flyTrack子对象，可以继承飞线轨迹平移旋转等变换
                var maxH = 4; // 假设最大值
                var h = 1 + (maxH - 1) * Math.random();
                var heightMesh = cityHeight(h, h / maxH);
                // 通过经纬度坐标设置柱子在地图上位置
                heightMesh.position.set(cood.E, cood.N, 0);
                cityGroup.add(heightMesh);
            })
        }

        /*释放模型对象几何体和材质所占用的内存*/
        function disposeGroup (group) {
            // .traverse方法递归遍历group的所有后代
            group.traverse(function (obj) {
                if (obj.type == 'Mesh' || obj.type == 'Line') {
                    obj.geometry.dispose();
                    obj.material.dispose();
                }
            })
            if (group.children.length) {
                group.children = []; //删除所有后代模型对象
            }
        }
       
       
        // updateFlyGeo：更新飞线几何体顶点位置坐标
        function updateFlyGeo (flyline, index, points) {
            var pointArr = []; //存储飞线轨迹上选择的顶点坐标，用于飞线绘制
            for (var i = 0; i < flyline.num; i++) {
                var v3 = points[i + index]
                pointArr.push(v3.x, v3.y, v3.z)
            }
            // 设置几何体顶点位置坐标
            flyline.geometry.setPositions(pointArr);
            flyline.geometry.verticesNeedUpdate = true; //通知three.js几何体顶点位置坐标数据更新
        }
        


        updateFly('江苏省'); //飞线首次绘制，河南作为飞线起点


        //更新绘制飞线
        function updateFly (provinceName) {
            //飞线起点坐标
            var start = null;

            var endArr = []; //飞线结束点坐标集合.

            ENdata.forEach((coord, i) => {
                if (coord.name == provinceName) {
                    // 设置飞线发射起点坐标
                    start = new THREE.Vector3(coord.E, coord.N, 0);
                } else {
                    // 所有飞线结束点的坐标
                    endArr.push(coord)
                }
            });
            // 绘制当前选中省份对应的所有飞线
            currentCityAllFlys(start, endArr)
        }




        var width = document.getElementById('flyLine').clientWidth; //窗口宽度
        var height = document.getElementById('flyLine').clientHeight; //窗口高度
        // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
        var mapHeight = 1;//拉伸高度
        lineGroup.position.z = mapHeight + mapHeight * 0.1;//适当偏移解决深度冲突

        var loader = new THREE.FileLoader();
        loader.setResponseType('json');



        loader.load(`${process.env.PUBLIC_URL}/json/china.json`, function (data) {
            var mapGroup = GeoJSON(data);
            scene.add(mapGroup);
            // 注意居中之前进行旋转
            mapGroup.rotateX(-Math.PI / 2);
            var maxL = centerCamera(mapGroup, camera, k);
            flyGroup.position.z = maxL * 0.01 * 1.01;
            mapGroup.add(flyGroup);
            cityGroup.position.z = maxL * 0.01 * 1.01; //比地图Mesh略高一点，避免重叠
            mapGroup.add(cityGroup);

        })

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
        // var axesHelper = new THREE.AxesHelper(300);
        // scene.add(axesHelper);
        /**
         * 相机设置
         */

        var k = width / height; //窗口宽高比
        var s = 150;//根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
        // //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(15, 330, 188); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        camera.scale.set(1.6,1.6,1.6)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer({
            antialias: true, //开启锯齿
        });
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0x282C34, 1); //设置背景颜色

        document.getElementById('flyLine').appendChild(renderer.domElement);
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(15.0339, 9.654158, 0.409268);
        // controls.target.set(2.6, 10.5, 7);
        controls.update();

        // 光圈大小在原大小基础上1~2.5倍在之间变化,也就是mesh.size范围2~5之间
        var _s = 2.0;
        // 渲染函数
        function render () {
            // updateFly('河南'); //不停地重新绘制飞线，测试内存占用变化
            cityPointArr.forEach((cirMesh, i) => {
                if (cirMesh.s <= 1) {
                    cirMesh.s += 0.01;
                    cirMesh.scale.set(cirMesh.s, cirMesh.s, cirMesh.s)
                    cirMesh.material.opacity = (cirMesh.s - 0.7) * 3.3;
                } else if (cirMesh.s > 1 && cirMesh.s <= _s + 1) {
                    cirMesh.s += 0.01;
                    cirMesh.scale.set(cirMesh.s, cirMesh.s, cirMesh.s)
                    cirMesh.material.opacity = 1 - (cirMesh.s - 1) / _s;
                } else {
                    cirMesh.s = 0.7;
                }
            });
            startMesh.rotateZ(0.02);
            flyGroup.children.forEach((flyTrack, i) => {
                // 获取飞线轨迹线上的顶点坐标，用于飞线段绘制
                var points = flyTrack.flyTrackPoints;
                var flyline = flyTrack.children[0];
                var indexMax = points.length - flyline.num; //飞线取点索引范围
                if (flyline.index < indexMax) {
                    flyline.index += 1
                } else {
                    flyline.index = 0
                }
                updateFlyGeo(flyline, flyline.index, points); //更新飞线的位置，生成飞行动画

            });

            renderer.render(scene, camera); //执行渲染操作
            requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
            // 在控制台选择一个你想要的视角
        }
        render();
        //创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
        // 旋转、缩放用于代码调试

        /*射线拾取模型*/
    function choose(event) {
        var Sx = event.clientX; //鼠标单击位置横坐标
        var Sy = event.clientY; //鼠标单击位置纵坐标
        //屏幕坐标转WebGL标准设备坐标
        var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
        var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
        var raycaster = new THREE.Raycaster(); //创建一个射线投射器`Raycaster`
        //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        //返回.intersectObjects()参数中射线选中的网格模型对象
        var intersects = raycaster.intersectObjects(meshArr);
        return intersects
      }
      addEventListener('click', function(event) {
        var intersects = choose(event); //射线拾取结果
        if (intersects.length > 0) { // intersects.length大于0说明，说明选中了模型
          // 原来飞线发射省份恢复选中前的颜色
          if (chooseMesh) chooseMesh.material.color.set(0x278EB4);
          // 提升旋转省份颜色亮度
          intersects[0].object.material.color.set(0x126C8B);
          // chooseMesh指向新的发射中心Mesh
          chooseMesh = intersects[0].object;
          updateFly(chooseMesh.name); //绘制当前省份作为起点的所有飞线
        }
      }); // 监听窗口鼠标单击事件
      var div = document.getElementById('tag');
      var nameDiv = document.getElementById('name');
      var titleDiv = document.getElementById('title');
      // 监听窗口鼠标单击事件
      addEventListener('mousemove', function() {
        var intersects = choose(event); //射线拾取结果
        if (intersects.length > 0) { // intersects.length大于0说明，说明选中了模型
          var moveChooseMesh = intersects[0].object;
          nameDiv.innerText = '省份：' + moveChooseMesh.name;
          titleDiv.innerText = '数量：' + Math.floor(Math.random() * 100);
          div.style.visibility = 'visible';
          var worldVector = null; //表示省份行政中心的世界坐标
          ENdata.forEach((coord, i) => {
            if (coord.name == moveChooseMesh.name) {
              worldVector = new THREE.Vector3(coord.E, coord.N, 0);
              worldVector.applyMatrix4(moveChooseMesh.matrixWorld)
            }
          });
          if(worldVector){
            var standardVector = worldVector.project(camera); //世界坐标转标准设备坐标
            var a = window.innerWidth / 2;
            var b = window.innerHeight / 2;
            var x = Math.round(standardVector.x * a + a); //标准设备坐标转屏幕坐标
            var y = Math.round(-standardVector.y * b + b); //标准设备坐标转屏幕坐标
    
            div.style.left = x + 'px';
            div.style.top = y + 'px';

          }
         
        } else {
          div.style.visibility = 'hidden';
        }
      });
    }
    return (
        <>
            <div id='flyLine' className='flyLine' style={{ height: '100%', width: '100%' }}>
            </div>

            <div className="tagDiv" id="tag">
                <div id="name" style={{ color: '#ffffff' }}>
                    省份：河南
                </div>

                <div id="title" style={{ marginTop: '10px', color: '#ffffff' }}>
                    数量：10
                </div>
            </div>
        </>
    )

}
export default FlyLineTree