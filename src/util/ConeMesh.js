// 引入three.js
import * as THREE from './three/three.module';
function ConeMesh (size, x, y) {
    var height = size * 4;//棱锥高度
    var radius = size;//半径
    //  ConeBufferGeometry  ConeGeometry
    // 圆锥体几何体API(ConeGeometry)圆周方向四等分实现四棱锥效果
    var geometry = new THREE.ConeGeometry(radius, height, 4);
    // 缓冲类型几何体BufferGeometry没有computeFlatVertexNormals方法
    geometry.computeFlatVertexNormals();//一种计算顶点法线方式，非光滑渲染
    // 可以根据需要旋转到特定角度
    // geometry.rotateX(Math.PI);
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, 0, height / 2);
    // MeshBasicMaterial MeshLambertMaterial
    var material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0)
    return mesh;
}
export { ConeMesh };

