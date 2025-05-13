import React, { useCallback, useMemo, useState } from "react";

import featuresMSK from "../json/MskGeoJson.json";
import featuresSPB from "../json/SpbGeoJson.json";
import { customization } from "../customStyle/customMap.ts";
import { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";
import {
  clusterByGrid,
  YMap,
  YMapClusterer,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapFeature,
  YMapListener,
  YMapMarker,
  //   YMapZoomControl,
} from "../lib/yamaps";
import {
  ExpandedFeature,
  getBuildingsPoints,
  getDistrictCentralPoints,
  getDistrictCentralPointsSPB,
} from "./clustrHelper.ts";
import { Box, Typography } from "@mui/material";

import { moscow, parksIcon } from "./imagesHelper.ts";


// --------------------------------INTERFACE-----------------------------------------------------
// --------------------------------CONSTANTS-----------------------------------------------------
const IMAGE_PATH = "../../img/gerbs/";
window.map = null;

const LOCATIONMSK: YMapLocationRequest = {
  center: [37.621184, 55.7536],
  zoom: 13,
};

const LOCATIONSPB: YMapLocationRequest = {
  center: [59.938676, 30.314494],

  // 30.314494, 59.938676
  zoom: 13,
};

const city = "msk";

const mapPoligonMSK = featuresMSK.featuresMSK;
const mapPoligonSPB = featuresSPB.featuresSPB;
// --------------------------------FUNCTIONS-----------------------------------------------------
const cityPoligons = (city: string) => {
  if (city === "spb") return mapPoligonSPB;
  return mapPoligonMSK;
};

// --------------------------------COMPONENT-----------------------------------------------------

export default function Map() {
  const [location, setLocation] = useState(LOCATIONMSK);
  // тут зум должен тоже меняться для каждого ГО и цвет полигона соответственно
  const [zoomLevel, setZoomLevel] = useState(LOCATIONMSK.zoom);

  const points = useMemo(() => getDistrictCentralPoints(), []);
  const pointsSPB = useMemo(() => getDistrictCentralPointsSPB(), []);
  const buildingPoints = useMemo(() => getBuildingsPoints(), []);
  // для точек с домами можно побольше указать размер сетки, тогда они будут видны только при крупном масштабе
  const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 200 }), []);

  // const onZoomChange = useCallback((e) => {
  //   setZoomLevel(e.location.zoom);
  // }, []);

  const onZoomChange = useCallback((e) => {
    if (e.location.zoom > 5) {
      setZoomLevel(e.location.zoom);
    } else {
      alert("Хватит зумить, улетишь в космос! 💥🚀✨🛰✨🌔✨✨🪐✨☄️");
    }
  }, []);

  const getPolygonOpacity = () => {
    return Math.max(1 - (zoomLevel - 10) * 0.2, 0);
  };
  // тут по значению зума меняется цвет заливки полигона
  const getPolygonColor = (item: string) => {
    const opacity = getPolygonOpacity();
    const [r, g, b] = item.match(/\d+/g);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // !!! на секундочку feature это не то, что в файле json, тут уже после формирования объекта маркера
  const marker = (feature: ExpandedFeature) => (
    <YMapMarker coordinates={feature.geometry.coordinates}>
      <div
      // onMouseOver={() => markerMouseOver(feature.id)} onMouseOut={() => markerMouseOut(feature.id)}
      >
        <div
          style={{ fontFamily: "Ubuntu-bold" }}
          // className={marker-text ${hoverMarkers[feature.id] ? 'visible' : 'hidden'}}
        >
          {feature.properties.name}
        </div>
        <div>
          <img
            alt="img"
            style={{
              borderRadius: "7px",
              width: "50px",
              transition: "all 0.3s ease-out",
              // border: '1px solid #ffffff',
            }}
            src={
              feature.properties.name === "НАО" ||
              feature.properties.name === "ТАО"
                ? `${moscow}`
                : `${IMAGE_PATH}${feature.properties.name}.png`
            }
            // src={logo}
          />
        </div>
      </div>
    </YMapMarker>
  );
  // на карте отображается перечень зданий
  const mchsBuildings = (feature: ExpandedFeature) => (
    <YMapMarker coordinates={feature.geometry.coordinates}>
      <div
      // onMouseOver={() => markerMouseOver(feature.id)} onMouseOut={() => markerMouseOut(feature.id)}
      >
        <div>
          <img
            alt="img"
            style={{
              borderRadius: "7px",
              width: "50px",
              transition: "all 0.3s ease-out",
              border: "1px solid #ffffff",
            }}
            // src={${IMAGE_PATH}/image${feature.id}.png}
            src={parksIcon}
          />
        </div>
      </div>
    </YMapMarker>
  );

  const markerSPB = (feature: ExpandedFeature) => (
    <YMapMarker coordinates={feature.geometry.coordinates}>
      <div
      // onMouseOver={() => markerMouseOver(feature.id)} onMouseOut={() => markerMouseOut(feature.id)}
      >
        <div
          style={{ fontFamily: "Ubuntu-bold" }}
          // className={marker-text ${hoverMarkers[feature.id] ? 'visible' : 'hidden'}}
        >
          {feature.properties.name}
        </div>
        <div>
          <img
            alt="img"
            style={{
              borderRadius: "7px",
              width: "50px",
              transition: "all 0.3s ease-out",
            }}
            // src={${IMAGE_PATH}/image${feature.id}.png}
            src={gerbSPB}
          />
        </div>
      </div>
    </YMapMarker>
  );

  // для замены фото на кружок при отдалении карты
  const cluster = (coordinates: LngLat, features: ExpandedFeature[]) => (
    <YMapMarker
      key={`${features[0].id}-${features.length}`}
      coordinates={coordinates}
    >
      <Box
        sx={{
          // position: 'relative',
          width: "40px",
          height: "40px",
          border: "2px solid rgba(255, 255, 255, 0.7)",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: "90%",
            borderRadius: "50%",
            backgroundColor: "red",
          }}
        >
          <Typography
            sx={{ fontFamily: "Ubuntu-light", color: "white", fontWeight: 500 }}
          >
            {features.length}
          </Typography>
        </Box>
      </Box>
    </YMapMarker>
  );
  return (
    <>
      <div className="container">
        <YMap
          location={LOCATIONMSK}
          showScaleInCopyrights={true}
          ref={(x) => (map = x)}
        >
          <YMapDefaultSchemeLayer customization={customization} />
          <YMapDefaultFeaturesLayer />
          {/* <YMapControls position="right">
            <YMapZoomControl />
          </YMapControls> */}
          {/* <YMapControls position="top right">
            <YMapGeolocationControl />
          </YMapControls> */}
          <YMapListener onActionEnd={onZoomChange} />
          {/* метки районов Москвы - работает */}
          <YMapClusterer
            marker={marker}
            cluster={cluster}
            method={gridSizedMethod}
            features={points}
          />
          {/* <YMapClusterer
            marker={mchsBuildings}
            cluster={cluster}
            method={gridSizedMethod}
            features={buildingPoints}
          /> */}
    
          {/* метки районов Питера - работает */}
          {/* <YMapClusterer
            marker={markerSPB}
            cluster={cluster}
            method={gridSizedMethod}
            features={pointsSPB}
          /> */}
          {/* <Poligons
            city={city}
            setLocation={setLocation}
            zoomLevel={zoomLevel}
          /> */}
        
          {/* тут должен быть cityPoligons -  а это необходимые полигоны в зависимости от города */}
          {cityPoligons(city).map((poligon, index) =>
            // тут обработка 2х условий если это Мультиполигон или просто Полигон
            poligon.geometry.type === "MultiPolygon" ? (
              poligon.geometry.coordinates.map((item, itemIndex) => (
                <YMapFeature
                  key={`${index}-${itemIndex}`}
                  geometry={{
                    type: poligon.geometry.type,
                    coordinates: [item],
                  }}
                  style={{
                    // fill: poligon.style?.fill,
                    stroke: poligon.style?.stroke,
                    // на определенном масштабе убираем заливку полигона
                    fill:
                      zoomLevel >= 15
                        ? "transparent"
                        : getPolygonColor(poligon.style?.fill),
                  }}
                />
              ))
            ) : (
              <YMapFeature
                key={index}
                geometry={{
                  type: poligon.geometry.type,
                  coordinates: [poligon.geometry.coordinates[0]],
                }}
                style={{
                  // fill: poligon.style?.fill,
                  stroke: poligon.style?.stroke,
                  fill:
                    zoomLevel >= 15
                      ? "transparent"
                      : getPolygonColor(poligon.style?.fill),
                }}
              />
            )
          )}
        </YMap>
      </div>
    </>
  );
}

{
  /* <Poligons city={city} setLocation={setLocation} />
<ClusterBuilding city={city} />
<ClusterCenter city={city} /> */
}
