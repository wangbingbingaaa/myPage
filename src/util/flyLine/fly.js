/*飞线运动轨迹绘制函数flyTrack
       参数start,end:飞线的起点和结束点坐标Vector3*/
import * as THREE from '../three/three.module';

import { LineGeometry } from '../three/lines/LineGeometry.js';
import { LineMaterial } from '../three/lines/LineMaterial.js';
import { LineSegments2 } from '../three/lines/LineSegments2.js';
import { Line2 } from '../three/lines/Line2.js';
function flyTrackFun (start, end) {
    // var H = 3; //弧线高度全部一样
    var length = start.clone().sub(end).length();
    var H = length * 0.1; //根据两点之间距离设置弧线高度
    var middle = new THREE.Vector3(0, 0, 0);
    middle.add(start).add(end).divideScalar(2)
    // middle.y += H;
    middle.z += H; //调整高度方向为z

    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    // 起始点坐标和弧线高度确定一条3D样条曲线
    var curve = new THREE.CatmullRomCurve3([
        start,
        middle,
        end
    ]);
    var points = curve.getPoints(100); //分段数100，返回101个顶点，返回一个vector3对象作为元素组成的数组
    geometry.setFromPoints(points); // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    //材质对象
    var material = new THREE.LineBasicMaterial({
        color: 0x00aaaa,
    });
    //线条模型对象
    var line = new THREE.Line(geometry, material);
    line.flyTrackPoints = points; // 自定义属性用于飞线动画
    return line;
}

function lineFun (childAreaArr, mapGroup) {
    var group = new THREE.Group()
    var material = new THREE.LineBasicMaterial({
        color: 0x00cccc, //边界Line颜色
    })
    childAreaArr.forEach((childArea, i) => {
        childArea.geo.forEach((vertices) => {
            var newVertices = []
            vertices.forEach((v2, i) => {
                newVertices.push(new THREE.Vector3(v2.x, v2.y, 0))
            });
            var geometry = new THREE.Geometry()
            geometry.vertices = newVertices; // 设置几何体顶点位置坐标
            var line = new THREE.LineLoop(geometry, material);
            group.add(line); //子行政单元childArea边界轮廓Line插入组对象mapGroup

        });
    });
    return group
}
//提取行政区域所有子区域边界数据
function childAreaArrFun (data) {
    var childAreaArr = [];
    data.features.forEach(function (childArea) {
        var area = {
            geo: [],
            name: childArea.properties.name,
        };
        childAreaArr.push(area);
        // "Polygon"：子行政单元childArea有一个封闭轮廓
        if (childArea.geometry.type === "Polygon") {
            area.geo[0] = [];
            childArea.geometry.coordinates[0].forEach(elem => {
                area.geo[0].push(new THREE.Vector2(elem[0], elem[1]))
            });
            //"MultiPolygon"：子行政单元childArea有多个封闭轮廓
        } else if (childArea.geometry.type === "MultiPolygon") {
            // 解析所有封闭轮廓边界坐标childArea.geometry.coordinates
            childArea.geometry.coordinates.forEach((range, index) => {
                area.geo[index] = [];
                range[0].forEach(elem => {
                    area.geo[index].push(new THREE.Vector3(elem[0], elem[1], 0))
                });
            });
        }
    });
    return childAreaArr
}
// 计算包围盒的最大边长
function maxLFun (v3) {
    var max;
    if (v3.x > v3.y) {
        max = v3.x
    } else {
        max = v3.y
    }
    if (max > v3.z) { } else {
        max = v3.z
    }
    return max;
}

/*centerCamera：模型居中,同时调整正投影相机渲染范围*/
function centerCamera (mapGroup, camera, k) {
    // 地图mapGroup的包围盒计算
    var box3 = new THREE.Box3(); //创建一个包围盒
    box3.expandByObject(mapGroup); // .expandByObject()方法：计算层级模型group包围盒
    var center = new THREE.Vector3(); //scaleV3表示包围盒的几何体中心
    box3.getCenter(center); // .getCenter()计算一个层级模型对应包围盒的几何体中心
    // console.log('查看几何中心', center);
    // 重新设置模型的位置
    mapGroup.position.x = mapGroup.position.x - center.x;
    mapGroup.position.y = mapGroup.position.y - center.y;
    mapGroup.position.z = mapGroup.position.z - center.z;


    /*可以根据中国地图mapGroup的包围盒尺寸设置相机参数s */
    var scaleV3 = new THREE.Vector3(); //scaleV3表示包围盒长宽高尺寸
    box3.getSize(scaleV3) // .getSize()计算包围盒长宽高尺寸
    // frame.js文件中var s = 150; 150更改为scaleV3.x/2
    var maxL = maxLFun(scaleV3);
    //重新设置s值 乘以0.5适当缩小显示范围，地图占canvas画布比例更大，自然渲染范围更大
    let s = maxL / 2 * 0.5;
    camera.left = -s * k;
    camera.right = s * k;
    camera.top = s;
    camera.bottom = -s;
    //更新相机视图矩阵
    camera.updateProjectionMatrix();
    return maxL
}
function cityHeight (h, percent) {
    /*cityHeight函数：创建一个颜色和高度随着所表示对象大小变化的柱子
        h：柱子高度值，表示某个城市某种数据的大小
        percent：h和最大高度数据的比值，用于柱子颜色计算*/
    //geometryHeight是一个高度为1的正六棱柱
    var geometryHeight = new THREE.CylinderGeometry(0.2, 0.2, 1, 6);
    geometryHeight.rotateX(Math.PI / 2);
    geometryHeight.translate(0, 0, 0.5);
    geometryHeight.computeFlatVertexNormals();
    // color1、color2表示柱子的颜色范围
    var color1 = new THREE.Color(0xffff00);
    var color2 = new THREE.Color(0xff0000);//最大数值对应柱子颜
    // MeshLambertMaterial  MeshPhongMaterial
    var material = new THREE.MeshLambertMaterial({
        // color: 0xffff00,
    });
    // 设置柱子颜色,根据percent在color1和color2之间进行颜色插值
    var color = color1.clone().lerp(color2.clone(), percent)
    material.color.copy(color);

    var mesh = new THREE.Mesh(geometryHeight, material);
    mesh.scale.z = h; //控制柱子高度
    return mesh;
}

/*通过cityPoint函数标注一个地图上上某个地点
       cityCoord：表示城市经纬度坐标*/
function cityPoint (cityCoord) {
    var texLoad = new THREE.TextureLoader();
    var cityPointTexture = texLoad.load(`${process.env.PUBLIC_URL}/guangquan.png`)

    // MeshBasicMaterial:不受光照影响
    var mat = new THREE.MeshBasicMaterial({
        // color: 0xffff00,
        color: 0x00ffff,
        map: cityPointTexture,
        transparent: true,
        side: THREE.DoubleSide, //THREE.BackSide,
        depthWrite: false, //是否对深度缓冲区有任何的影响
    })
    // 矩形平面几何体
    // var geo = new THREE.PlaneGeometry(1.0, 1.0)
    var geo = new THREE.PlaneGeometry(1.5, 1.5)
    var cirMesh = new THREE.Mesh(geo, mat)
    cirMesh.position.copy(cityCoord)
    return cirMesh
}


/*startMeshFun函数创建一个四棱锥标注飞线起点
       startCoord：表示起点经纬度坐标*/
function startMeshFun (startCoord) {
    var startgeometry = new THREE.ConeBufferGeometry(0.5, 2, 4);
    startgeometry.rotateX(-Math.PI / 2);
    var startmaterial = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    });
    var startMesh = new THREE.Mesh(startgeometry, startmaterial);
    startMesh.position.copy(startCoord);
    startMesh.position.z += 1;
    return startMesh
}

/*flylineFun函数：在飞线轨迹样条曲线上选取一段曲线绘制出来
        飞线绘制基本思路：飞线是沿着飞线轨迹运动，所以只要获取飞线轨迹上某一段的顶点坐标，
        然后通过获取的这些坐标绘制飞线段即可。
        index:飞线轨迹上取点位置索引
        points：飞线轨迹上一系列顶点坐标*/
function flylineFun (index, points) {
    var choosePoints = []; //存储飞线轨迹上选择的顶点坐标，用于飞线绘制
    var num = 11; //从曲线上取11个点 飞线长度占飞线轨迹长度的10%  你可通过获取的点数调节飞线长度
    for (var i = 0; i < num; i++) {
        choosePoints.push(points[i + index])
    }
    // 创建一个LineGeometry几何体
    var geometry = new LineGeometry();
    var pointArr = []
    //把样条曲线返回的顶点坐标Vector3中xyz坐标提取到pointArr数组中
    choosePoints.forEach(function (v3) {
        pointArr.push(v3.x, v3.y, v3.z)
    })
    // 设置几何体顶点位置坐标
    geometry.setPositions(pointArr);
    // 给几何体每个顶点设置对应颜色值
    var colorArr = []
    for (var i = 0; i < choosePoints.length; i++) {
        var color1 = new THREE.Color(0x006666); //飞线轨迹相近的颜色
        var color2 = new THREE.Color(0xffff00);
        var colo = null
        // posNum：插值计算的临界值  对应color2
        // var posNum = points.length/2;//飞线段，黄色居中，两侧青色
        var posNum = choosePoints.length - 2;
        if (i < posNum) {
            colo = color1.lerp(color2, i / posNum)
        } else {
            colo = color2.lerp(color1, (i - posNum) / (choosePoints.length - posNum))
        }
        colorArr.push(colo.r, colo.g, colo.b)
    }
    //设置几何体顶点颜色值，进行插值计算
    geometry.setColors(colorArr);
    //几何体LineGeometry对应的材质LineMaterial
    var material = new LineMaterial({
        // color: 0xffff00,//使用顶点颜色，材质颜色不用设置
        vertexColors: THREE.VertexColors, //使用顶点颜色插值计算
        linewidth: 2.5, // 设置线宽
    });
    //材质输入Three.js渲染canvas画布的宽高度
    material.resolution.set(window.innerWidth, window.innerHeight);
    var flyline = new Line2(geometry, material);
    // 自定义飞线属性flyline.num、flyline.index，用于飞线动画
    flyline.num = num;
    flyline.index = index;
    return flyline;
}


export { flyTrackFun, lineFun, childAreaArrFun, centerCamera, cityHeight, cityPoint, startMeshFun, flylineFun }