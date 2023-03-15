import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorLayer } from "ol/layer";

import { OSM, XYZ, WMTS } from "ol/source";
import { fromLonLat } from "ol/proj";
import { defaults, FullScreen, MousePosition, ScaleLine } from "ol/control";
import Overlay from "ol/Overlay";
import { Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Translate } from "ol/interaction";
import { Draw } from "ol/interaction";
import { createRegularPolygon, createBox } from "ol/interaction/Draw";
import { Modify } from "ol/interaction"
import GeoJSON from "ol/format/GeoJSON";
import { defaults as defaultControls, OverviewMap } from "ol/control";
import CN from '../json/MapOfChina.json'
import { Fill, Stroke, Style } from 'ol/style';

window._overlayIndex = 20000;   //overlay的z-index从200开始
console.log(CN)
class GisMap extends Map {
    constructor(target) {
        super({
            target,
            controls: defaultControls({
                zoom: true
            }).extend([]),
            layers: [
                //在线的
                // new TileLayer({
                //     source: new XYZ({
                //         url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                //     }),
                // }),
                //离线的
                // new TileLayer({ // 使用XYZ的方式加载OpenStreetMap
                //     title: "全国",
                //     source: new XYZ({
                //         projection: "EPSG:3857",
                //         url: `${process.env.PUBLIC_URL}/roadmap/{z}/{x}/{y}.png`,
                //     }),
                // }),
                new VectorLayer({
                    source: new VectorSource({
                        url: "https://openlayers.org/data/vector/ecoregions.json",
                        format: new GeoJSON()
                    }),
                    // source: new VectorSource({
                    //     features: new GeoJSON().readFeatures(CN, {
                    //         dataProjection: 'EPSG:4326',
                    //         featureProjection: "EPSG:4326"
                    //     })
                    // }),
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