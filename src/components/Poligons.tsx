import React from "react";


import featuresMSK from "../json/MskGeoJson.json";
import featuresSPB from "../json/SpbGeoJson.json";
import { YMapFeature } from "ymap3-components";

export default function Poligons({ city, setLocation, zoomLevel }) {
//   const city = "msk";

  const mapPoligonMSK = featuresMSK.featuresMSK;
  console.log(mapPoligonMSK)
  const mapPoligonSPB = featuresSPB.featuresSPB;
  const cityPoligons = (city: string) => {
    if (city === "spb") return mapPoligonSPB;
    return mapPoligonMSK;
  };
  const getPolygonOpacity = () => {
    return Math.max(1 - (zoomLevel - 10) * 0.2, 0);
  };
  // тут по значению зума меняется цвет заливки полигона
  const getPolygonColor = (item: string) => {
    const opacity = getPolygonOpacity();
    const [r, g, b] = item.match(/\d+/g);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div>
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
    </div>
  );
}
