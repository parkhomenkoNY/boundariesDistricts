import React from "react";
import ReactDom from "react-dom";
// import { useYMaps } from "@pbe/react-yandex-maps";

// const ymaps = useYMaps(["ZoomControl"]);

const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
export const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapListener,
  YMapControls,

  YMapFeature,
} = reactify.module(ymaps3);

// const [YMapGeolocationControl, YMapZoomControl] = reactify.module(
//   await ymaps.modules.require(["GeolocationControl", "ZoomControl"])
// );

// export const [YMapClusterer] = reactify.module(
//   await ymaps.modules.require(["Clusterer"])
// );

// const ymaps3Theme = await ymaps3.import("@yandex/ymaps3-default-ui-theme");

// export const { YMapGeolocationControl, YMapZoomControl } =
//   reactify.module(ymaps3Theme);
// export const { YMapZoomControl} = await ymaps3.import(
//   "@yandex/ymaps3-controls@0.0.1"
// );

export const { YMapClusterer, clusterByGrid } = reactify.module(
  await ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
);
