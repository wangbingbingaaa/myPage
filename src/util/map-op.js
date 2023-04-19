// 操作地图的一些公用方法
import { DrawFeature, MobileFeature } from "./olMap";
import { toLonLat } from 'ol/proj';
import { getArea, getLength, getDistance } from 'ol/sphere.js';

let _drawFeature = null;  //全局用一个drawFeature
let _cacheFeatures = [];
// 图上取目标
export function findTarget () {
    return new Promise((resolve, reject) => {
        window.map.featureClick = (e, feature) => {
            resolve(feature)
        }
    })
}

// 图上取点
export function tsqd () {
    return new Promise((resolve, reject) => {
        const draw = _drawFeature || (_drawFeature = new DrawFeature(window.mapCon));
        draw.endDraw()
        draw.drawPoint();
        draw.onDrawEnd = (feature) => {
            draw.removeDraw(_cacheFeatures.shift())
            _cacheFeatures.push(feature);
            draw.endDraw()
            resolve(trunc6(toLonLat(feature.getGeometry().getCoordinates())))
        }
    })
}

// 图上画区
export function drawPolygon () {
    return new Promise((resolve, reject) => {
        const draw = _drawFeature || (_drawFeature = new DrawFeature(window.mapCon));
        draw.endDraw()
        draw.drawPolygon();
        draw.onDrawEnd = (feature) => {
            draw.removeDraw(_cacheFeatures.shift())
            _cacheFeatures.push(feature);
            draw.endDraw()
            let points = feature.getGeometry().getCoordinates()[0].map(co => toLonLat(co));
            checkPointValid(points) ?
                resolve(trunc6(points))
                : reject("最多13个点且点之前增量最大为16383秒")
        }
    })
}


// 绘制圆
export function drawCircle () {
    return new Promise((resolve, reject) => {
        const draw = _drawFeature || (_drawFeature = new DrawFeature(window.mapCon));
        draw.endDraw();
        draw.drawCircle();
        draw.onDrawEnd = (feature) => {
            draw.removeDraw(_cacheFeatures.shift());
            _cacheFeatures.push(feature);
            draw.endDraw();
            let center = trunc6(toLonLat(feature.getGeometry().getCenter()));
            let radius = trunc6(feature.getGeometry().getRadius());
            resolve({ center, radius });
        };
    });
}

// 图上画线
export function drawLine () {
    return new Promise((resolve, reject) => {
        const draw = _drawFeature || (_drawFeature = new DrawFeature(window.mapCon));
        draw.endDraw()
        draw.drawLine();
        draw.onDrawEnd = (feature) => {
            draw.removeDraw(_cacheFeatures.shift())
            _cacheFeatures.push(feature);
            draw.endDraw()
            let points = feature.getGeometry().getCoordinates().map(co => toLonLat(co));
            checkPointValid(points) ?
                resolve(trunc6(points))
                : reject("最多13个点且点之前增量最大为16383秒")
        }
    })
}

/**
 * 特殊点校验：
 *    经纬度增量范围：-16383 ~ 16382
 *    坐标点个数: 13
 *    长轴短轴：0 ~ 62 => 0 ~ 489  
 */
function checkPointValid (points = []) {
    return points.length <= 13 && points.every((item, index) => {
        if (index == 0) return true;
        let [prevx, prevy] = item,
            [curx, cury] = points[index - 1];
        return Math.abs(curx * 60 * 60 - prevx * 60 * 60) < 16383 && Math.abs(cury * 60 * 60 - prevy * 60 * 60) < 16383;
    })
}
/**
 * 特殊点校验：
 *    长轴短轴：0 ~ 62 => 0 ~ 489  
 */
function checkAxisValid (d1, d2 = d1) {
    return d1 < 489 * 1000 && d2 < 489 * 1000;
}

export function clearDrawCache () {
    _cacheFeatures.forEach(f => {
        _drawFeature?.removeDraw(f);
    })
}
// 图上选中
let pickFeature = null;
// export function initPick (layer) {
//     pickFeature = new MobileFeature({
//         img: require("@/assets/images/xuanzhong.png"),
//         id: 'picker'
//     });
//     layer.addFeature(pickFeature);
//     pickFeature.setAllLayerVisible(false);
// }
// export function updatePick (bool, pos) {
//     if (bool) {
//         pickFeature.setAllLayerVisible(true);
//         pickFeature.setPosition(pos);
//     } else {
//         pickFeature.setAllLayerVisible(false);
//     }
// }

function trunc6 (value) {
    if (Array.isArray(value)) {
        return value.map(o => trunc6(o))
    } else {
        return Number(value.toFixed(6))
    }
}

// 计算 两个坐标点（经纬度）之前的距离
function calcDistance (lon1, lat1, lon2, lat2) {
    return getDistance([lon1, lat1], [lon2, lat2]);
}