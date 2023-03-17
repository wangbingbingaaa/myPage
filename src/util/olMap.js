import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorLayer } from "ol/layer";

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
import { Fill, Stroke, Style } from 'ol/style';

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
                // //离线的
                // new TileLayer({ // 使用XYZ的方式加载OpenStreetMap
                //     title: "全国",
                //     source: new XYZ({
                //         projection: "EPSG:3857",
                //         url: `${process.env.PUBLIC_URL}/roadmap/{z}/{x}/{y}.png`,
                //     }),
                // }),
                //天地地图
                new TileLayer({
                    name: "天地图矢量图层",
                    source: new XYZ({
                        url:
                            "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
                        wrapX: false
                    })
                })

            ],

            // 设置地图的视角
            view: new View({
                center: fromLonLat([120.771441, 30.756433]), // 地图中心点
                zoom: 6, // 缩放级别
                minZoom: 0,
                maxZoom: 15,
                // constrainRotation: true,
            }),

        })

    }
}



export {
    GisMap,

}