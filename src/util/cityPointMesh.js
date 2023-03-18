// 引入three.js
import * as THREE from './three/three.module';


// 矩形平面网格模型设置背景透明的png贴图
var geometry = new THREE.PlaneBufferGeometry(1, 1); //默认在XOY平面上
var textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象
var texture = textureLoader.load(`${process.env.PUBLIC_URL}/guangquan.png`);


// 每个mesh材质透明度如果不是同步变化，材质不能共享

// size:矩形平面Mesh的尺寸
// x，y表示矩形平面在一个平面上位置坐标
function cityPointMesh (size, x, y) {
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,//设置光圈颜色
        map: texture,
        transparent: true, //使用背景透明的png贴图，注意开启透明计算
        // side: THREE.DoubleSide, //双面可见
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(size, size, size);//设置mesh大小
    mesh.position.set(x, y, 0);//设置mesh位置
    return mesh;
}
export { cityPointMesh };