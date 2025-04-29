import { YMapClusterer } from "@yandex/ymaps3-clusterer";
import { YMapMarker } from "@yandex/ymaps3-types";
import React, { useMemo } from "react";
import { moscow } from "./imagesHelper";
import { ExpandedFeature, getparksPoints } from "./clustrHelper";

export default function ParkPoints() {
  const parkPointsData = useMemo(() => getparksPoints(), []);
  console.log("parkPointsData", parkPointsData);

  const parkPointsMarker = (feature: ExpandedFeature) => (
    <YMapMarker coordinates={feature.geometry.coordinates}>
      <div>
        <div>
          <img
            alt="img"
            style={{
              borderRadius: "7px",
              width: "50px",
              transition: "all 0.3s ease-out",
              border: "1px solid #ffffff",
            }}
            src={moscow}
          />
        </div>
      </div>
    </YMapMarker>
  );
  return (
    <YMapClusterer
      marker={parkPointsMarker}
      cluster={cluster}
      method={gridSizedMethod}
      features={parkPointsData}
    />
  );
}
