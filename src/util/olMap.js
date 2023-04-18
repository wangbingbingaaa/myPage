import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorLayer } from "ol/layer";
import { Fill, Stroke, Style, Icon, Text, Circle as CircleStyle } from 'ol/style';
import { OSM, XYZ, WMTS } from "ol/source";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import ImageLayer from 'ol/layer/Image';
import { defaults, FullScreen, MousePosition, ScaleLine } from "ol/control";
import { Vector as VectorSource } from "ol/source";
import { createStringXY } from 'ol/coordinate'
import { Raster as RasterSource } from 'ol/source';
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Translate } from "ol/interaction";
import { Draw } from "ol/interaction";
import { createRegularPolygon, createBox } from "ol/interaction/Draw";
import { Modify } from "ol/interaction"
import { defaults as defaultControls, OverviewMap } from "ol/control";
import { LineString } from "ol/geom"; 'ol/geom'

window._overlayIndex = 20000;   //overlay的z-index从200开始
class GisMap extends Map {
    constructor(target) {
        super({
            target,
            controls: [
                new MousePosition({
                    coordinateFormat: function (e) { // 这里格式化成 X: **  Y: **
                        let [x, y] = e;
                        let str = createStringXY(6)([x % 360, y % 360])
                        let [lon, lat] = str.split(',');
                        return `经度${lon}&nbsp;&nbsp;纬度${lat}`
                    },
                    placeholder: '',
                    projection: 'EPSG:4326', // 和地图坐标系保持一致
                })
            ],
            layers: [
                //在线的
                // new TileLayer({
                //     source: new XYZ({
                //         url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                //     }),
                // }),

                // new VectorLayer({
                //     source: new VectorSource({
                //         url: `${process.env.PUBLIC_URL}/json/allCountriesGeojson.json`,
                //         format: new GeoJSON()
                //     }),

                // }),
                //离线的
                new TileLayer({ // 使用XYZ的方式加载OpenStreetMap
                    title: "全国",
                    source: new XYZ({
                        projection: "EPSG:3857",
                        url: `${process.env.PUBLIC_URL}/roadmap/{z}/{x}/{y}.png`,
                    }),
                }),
                //天地地图
                // new TileLayer({
                //     name: "天地图矢量图层",
                //     source: new XYZ({
                //         url:
                //             "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
                //         wrapX: false
                //     })
                // })

            ],

            // 设置地图的视角
            view: new View({
                center: fromLonLat([110.771441, 30.756433]), // 地图中心点
                zoom: 6, // 缩放级别
                minZoom: 0,
                maxZoom: 15,
                // constrainRotation: true,
            }),

        })
        // 图上单击事件
        this.on('singleclick', e => {
            this.selectedFeature = null;
            this.forEachFeatureAtPixel(e.pixel, (feature) => {
                const { type } = feature.getProperties();
                if (type == 'feature') {
                    this.selectedFeature = feature;
                    this.featureClick && this.featureClick(e, feature);
                }
            }, { hitTolerance: 5 });
        });
        // 图上右键点击
        this.on('contextmenu', e => {
            this.forEachFeatureAtPixel(e.pixel, feature => {
                if (feature.getProperties().type == 'feature') {
                    e.preventDefault();
                    this.featureRightClick && this.featureRightClick(e, feature);
                }
            }, { hitTolerance: 5 });
        })

    }
    //注册feature点击事件
    featureClick = (e, feature) => {
        // this.createOverlay(feature, mobileCpn);
    };
    //注册feature右击事件
    featureRightClick = (e, feature) => { }
    // 添加overlay  feature和组件模板
    createOverlay (ele, pos, id) {
        const detailOverlayer = new Overlay({
            element: ele,
            position: pos,
            id: id,
            dragging: false,
            stopEvent: false,
            positioning: "top-center"
        })
        detailOverlayer.setPos = (pos) => {
            pos ? detailOverlayer.setPosition(fromLonLat(pos)) : detailOverlayer.setPosition(undefined)

        }
        this.addOverlay(detailOverlayer)

        return detailOverlayer
    }
    getFeatureById (id) {
        let target;
        this.getAllLayers().find(item => {
            target = item.getFeatureById && item.getFeatureById(id);
            return !!target || false;
        })
        return target
    }
    removeFeatureById = (id) => {
        let layer = this.getAllLayers().find(item => {
            return item.getFeatureById && item.getFeatureById(id);
        })
        layer?.removeFeatureById(id);
    }

}

class GisLayer extends VectorLayer {
    constructor(map) {
        super({ source: new VectorSource(), zIndex: 20 });
        map.addLayer(this);
    }

    // 添加feature
    addFeature (feature, layers = []) {
        if (!feature) return;
        layers.forEach(layer => {
            if (!feature._layers) {
                feature._layers = {};
            }
            feature._layers[layer] = true;
        })
        this.getSource().addFeature(feature);
        feature._map = this.getMapInternal();
    }

    // 获取所有的feature
    getAllFeatures = () => {
        return this.getSource().getFeatures();
    }

    // 通过id获取feature
    getFeatureById = (id) => {
        return id && this.getSource().getFeatureById(id);
    }

    // 通过id删除feature
    removeFeatureById = (id) => {
        let feature = this.getSource().getFeatureById(id);
        if (!feature) return;
        feature._overlay && this._map.removeOverlay(feature._overlay);
        this.getSource().removeFeature(feature);
        // 删除选中的feature
        if (feature.isSelected()) {
            feature._map.selectedFeature = null;
        }
        feature = null;
    }
}

Feature.prototype.setVisible = function (show, layer) {
    this._layers[layer] = show;
    this._visible = false;
    for (let layer in this._layers) {
        if (this._layers[layer]) {
            this._visible = true
            break;
        }
    }
    if (this._visible) {
        this.setStyle(this._style);
        this.setGeometry(this._initGeom());
    } else {
        this.setStyle(null);
        this.setGeometry(null);
    }
}
Feature.prototype.setAllLayerVisible = function (show) {
    this._visible = show;

    if (this._visible) {
        this.setStyle(this._style);
        this.setGeometry(this._initGeom());
    } else {
        this.setStyle(null);
        this.setGeometry(null);
    }
}
Feature.prototype.getVisible = function () {
    return this._visible;
}
Feature.prototype.isSelected = function () {
    return this == this._map.selectedFeature;
}

class MobileFeature extends Feature {
    /**
      添加目标 options: { position: [], id: '', label: '', rotation: '', props: {}, img: '' }
    */
    _map = null
    constructor({ id = _featureOnlyId++, label = '', labelColor = 'yellow', scale = 1, rotation = 0, img = '', props = {}, position = [0, 0] } = {}) {
        super({ geometry: new Point(fromLonLat(position)) });

        this.setId(id);
        this.setProperties({ type: 'feature', fType: 'mobile', ...props })
        this._position = position;
        this._visible = true;

        rotation = rotation * Math.PI / 180; //接收的是一个角度
        this._style = new Style({
            // 设置样式，这里使用图片
            image: new Icon({ src: img, rotation: rotation, scale }),
            text: new Text({ text: label, font: "16px curve bold", textBaseline: 'top', offsetY: 15, fill: new Fill({ color: labelColor }) })
        })
        this.setStyle(this._style);
    }
    removeOverlay = () => {
        this._map.removeOverlay(this._overlay);
        this._app.unmount();
        this._overlay = null;
        this._app = null;
    }
    // 设置feature的旋转角
    setRotation = (rotate) => {
        rotate = rotate * Math.PI / 180;
        this.getStyle()?.getImage().setRotation(rotate)
    }
    updateProps = (props) => {
        this.setProperties({ type: 'feature', fType: 'mobile', ...props })
    }
    // 修改feature的位置
    setPosition = (pos) => {
        this._position = pos;
        this.getGeometry()?.setCoordinates(fromLonLat(pos))
        if (this._overlay) {
            this._overlay.setPosition(fromLonLat(this.getPosition()));
        }
    }
    // 获取feature的位置
    getPosition = () => {
        return this._position
    }

    _initGeom () {
        return new Point(fromLonLat(this._position))
    }
}

class LineFeature extends Feature {
    constructor({ points = [], id = _featureOnlyId++, color = 'blue', lineWidth = 2, label, labelColor = "blue", props = {} }) {
        let lineString = new LineString(points)
        super({ geometry: lineString });
        this._visible = true
        this._position = points[0];

        this._lineString = lineString;
        this._lineString.transform('EPSG:4326', 'EPSG:3857');
        this.setId(id);
        this.setProperties({ type: 'feature', fType: 'line', ...props })

        this._style = new Style({
            stroke: new Stroke({ color, width: lineWidth }),
            text: new Text({ text: label, textBaseline: 'top', font: "16px curve bold", textAlign: 'left', placement: 'line', fill: new Fill({ color: labelColor }) })
        })
        this.setStyle(this._style)
    }
    getPosition () {
        return this._position;
    }

    addPoint = (pos) => {
        this._lineString.appendCoordinate(fromLonLat(pos));
    }

    _initGeom () {
        return this._lineString;
    }
}

class PointFeature extends Feature {
    constructor({ id = _featureOnlyId++, label = '', labelColor = 'blue', color = 'blue', props = {}, position = [0, 0] } = {}) {
        super({ geometry: new Point(fromLonLat(position)) });

        this.setId(id);
        this.setProperties({ type: 'feature', fType: 'point', ...props })
        this._position = position;
        this._visible = true

        this._style = new Style({
            image: new CircleStyle({
                radius: 4,
                fill: new Fill({ color })
            }),
            text: new Text({ text: label, textBaseline: 'top', font: "16px curve bold", offsetY: 5, fill: new Fill({ color: labelColor }) })
        })
        this.setStyle(this._style);
    }
    getPosition () {
        return this._position;
    }
    _initGeom () {
        return new Point(fromLonLat(this._position))
    }
}
class CircleFeature extends Feature {
    constructor({ id = _featureOnlyId++, label = '', labelColor = 'blue', props = {}, position = [0, 0], radius = 0 } = {}) {
        super({ geometry: new Circle(fromLonLat(position), radius) });

        this.setId(id);
        this.setProperties({ type: 'feature', fType: 'circle', ...props })
        this._position = position;
        this._radius = radius;
        this._visible = true

        this._style = new Style({
            text: new Text({ font: "16px curve bold", text: label, fill: new Fill({ color: labelColor }) }),
            stroke: new Stroke({ color: 'blue' }),
            fill: new Fill({ color: 'transparent' })
        })
        this.setStyle(this._style);
    }
    getPosition () {
        return this._position;
    }

    _initGeom () {
        return new Circle(fromLonLat(this._position), this._radius);
    }
}

class EllipseFeature extends Feature {
    constructor({ id = _featureOnlyId++, label = '', labelColor = 'blue', props = {}, position = [0, 0], cz, dz, rotate } = {}) {
        let center = fromLonLat(position);
        let circle = new Circle(center, dz);
        // 用正多边形逼近法拟合圆形
        let ellipse = fromCircle(circle, 256);
        ellipse.scale(cz / dz, 1);
        ellipse.rotate(mapNumberUtil.rad(rotate), center);
        super({ geometry: ellipse });

        this.setId(id);
        this.setProperties({ type: 'feature', fType: 'ellipse', ...props })
        this._position = position;
        this._ellipse = ellipse;
        this._visible = true


        this._style = new Style({
            text: new Text({ font: "16px curve bold", text: label, fill: new Fill({ color: labelColor }) }),
            stroke: new Stroke({ color: 'blue' }),
            fill: new Fill({ color: 'transparent' })
        })
        this.setStyle(this._style);
    }
    getPosition () {
        return this._position;
    }
    _initGeom () {
        return this._ellipse;
    }
}

class RectFeature extends Feature {
    constructor({ position = [], cz, dz, rotate = 0, id = _featureOnlyId++, color = 'red', lineWidth = 2, label, labelColor = "red", props = {} }) {
        let [lon, lat] = position;
        let points = [];
        let [tc_lon, tc_lat] = getLonAndLat(lon, lat, 0, dz);
        let [rc_lon, rc_lat] = getLonAndLat(lon, lat, 90, cz);
        let [lc_lon, lc_lat] = getLonAndLat(lon, lat, -90, cz);
        let [bc_lon, bc_lat] = getLonAndLat(lon, lat, 0, -dz);
        points.push([lc_lon, tc_lat], [rc_lon, tc_lat], [rc_lon, bc_lat], [lc_lon, bc_lat]);

        let _polygon = new Polygon([points]);
        super({ geometry: _polygon });
        _polygon.transform('EPSG:4326', 'EPSG:3857');
        this._position = position;
        this._visible = true;
        this._polygon = _polygon;
        this.getGeometry().rotate(mapNumberUtil.rad(rotate), fromLonLat(position));
        this.setId(id);
        this.setProperties({ type: 'feature', fType: 'rect', ...props })


        this._style = new Style({
            fill: new Fill({ color: 'transparent' }),
            stroke: new Stroke({ color, width: lineWidth }),
            text: new Text({ font: "16px curve bold", text: label, fill: new Fill({ color: labelColor }) })
        })
        this.setStyle(this._style);
    }
    getPosition () {
        return this._position;
    }

    _initGeom () {
        return this._polygon;
    }
}

class PolygonFeature extends Feature {
    constructor({ points = [], id = _featureOnlyId++, color = 'red', lineWidth = 2, label, labelColor = "red", props = {} }) {
        let _polygon = new Polygon([points]);
        _polygon.transform('EPSG:4326', 'EPSG:3857');
        super({ geometry: _polygon });

        this.setId(id);
        this._visible = true;
        this._polygon = _polygon;
        this._position = points[0];
        this.setProperties({ type: 'feature', fType: 'polygon', ...props })

        this._style = new Style({
            stroke: new Stroke({ color, width: lineWidth }),
            text: new Text({ font: "16px curve bold", offsetY: -30, text: label, fill: new Fill({ color: labelColor }) }),
            fill: new Fill({ color: 'transparent' })
        })
        this.setStyle(this._style);
    }
    getPosition () {
        return toLonLat(this.getGeometry().getInteriorPoint().flatCoordinates.slice(0, 2))
    }
    _initGeom () {
        return this._polygon;
    }
}


let drawStyle = new Style({
    fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
    stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.5)', lineDash: [10, 10], width: 2 }),
    image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.7)' }),
        fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' })
    })
})

class DrawFeature {
    _map = null;
    _draw = null;
    _source = null;

    constructor(map) {
        this._map = map;
        this._source = new GisLayer(map).getSource();
    }

    initDraw (type, geometryFunction) {
        this._draw = new Draw({
            source: this._source,
            type,
            style: drawStyle,
            geometryFunction
        });
        this._map.addInteraction(this._draw);
        this._draw.on('drawend', ({ feature }) => this.onDrawEnd(feature))
    }
    drawPoint () {
        this.initDraw('Point');
    }
    drawLine () {
        this.initDraw('LineString');
    }
    drawCircle () {
        this.initDraw('Circle');
    }
    drawRect () {
        this.initDraw('Circle', createBox())
    }
    drawPolygon () {
        this.initDraw('Polygon');
    }
    onDrawEnd = () => {
        setTimeout(() => {
            this._map.removeInteraction(this._draw);
        })
    }
    clearDraw () {
        this._source.clear();
    }
    endDraw () {
        this._map.removeInteraction(this._draw)
    }
    removeDraw (feature) {
        if (!feature) return
        // 需要异步处理，因为要等到 drawEnd 结束才会添加到layer中
        setTimeout(() => {
            this._source.removeFeature(feature);
        })
    }
}



export {
    GisMap,
    GisLayer,
    MobileFeature,
    PointFeature,
    LineFeature,
    RectFeature,
    CircleFeature,
    PolygonFeature,
    DrawFeature,
    EllipseFeature,

}