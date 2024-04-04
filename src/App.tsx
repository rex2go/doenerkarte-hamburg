import {useEffect, useRef} from 'react'
import KML from 'ol/format/KML.js';
import Map from 'ol/Map.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import {Heatmap as HeatmapLayer, Tile as TileLayer, Vector} from 'ol/layer.js';
import {transform} from 'ol/proj.js';
import {Circle, Fill, Style} from "ol/style";

function App() {

    const divRef = useRef(null);

    const layerRef = useRef({
        heatmap: new HeatmapLayer({
            source: new VectorSource({
                url: 'data/data.kml',
                format: new KML({
                    showPointNames: true,
                }),
            }),
            blur: 45,
            radius: 12,
            weight: function () {
                return 1;
            }
        }),
        points: new Vector({
            source: new VectorSource({
                url: 'data/data.kml',
                format: new KML({
                    showPointNames: false,
                    defaultStyle: [new Style({
                        image: new Circle({
                            fill: new Fill({
                                color: 'rgba(255, 255, 255, 0.8)',
                            }),
                            radius: 5,
                        }),
                    })],
                }),
            }),
        }),
        pointsLabelled: new Vector({
            source: new VectorSource({
                url: 'data/data.kml',
                format: new KML({
                    showPointNames: true,
                    defaultStyle: [new Style({
                        image: new Circle({
                            fill: new Fill({
                                color: 'rgba(255, 255, 255, 0.8)',
                            }),
                            radius: 5,
                        }),
                    })],
                }),
            }),
            visible: false,
        }),
        raster: new TileLayer({
            source: new StadiaMaps({
                layer: 'alidade_smooth_dark',
                retina: true,
                // apiKey: 'OPTIONAL'
            }),
        })
    })

    const mapRef = useRef<Map>(null);

    useEffect(() => {
        if (divRef.current === null) return;

        const {heatmap, points, pointsLabelled, raster} = layerRef.current;

        mapRef.current = new Map({
            layers: [raster, points, pointsLabelled, heatmap],
            target: 'map',
            view: new View({
                center: transform([9.992663143888201, 53.548471134726405], 'EPSG:4326', 'EPSG:3857'),
                zoom: 12,
                minZoom: 11,
            }),
        });
    }, [divRef, layerRef]);

    return (
        <>
            <label className={"show-labels"}>
                Namen anzeigen
                <input type={"checkbox"} onChange={(e) => {
                    const {points, pointsLabelled} = layerRef.current;
                    points.setVisible(!e.target.checked);
                    pointsLabelled.setVisible(e.target.checked);
                }}/>
            </label>

            <div id={"map"} ref={divRef} style={{height: "100%", width: "100%"}}>
            </div>
        </>
    )
}

export default App
