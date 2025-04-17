import { useEffect, useState } from "react";
import { useYMaps, reactify } from "@pbe/react-yandex-maps";

export function useYandexMapsModules() {
  const ymaps = useYMaps([
    "reactify",
    "templateLayoutFactory",
    "clusterer.addon.grid",
    "geolocation",
    "ZoomControl",
  ]);

  const [modules, setModules] = useState<null | {
    clustererModule: {
      clusterByGrid: any;
    };
    reactifiedMainModule: {
      YMap: any;
      YMapControls: any;
      YMapDefaultFeaturesLayer: any;
      YMapDefaultSchemeLayer: any;
      YMapFeature: any;
      YMapMarker: any;
      YMapListener: any;
    };
    reactifiedControlsModule: {
      YMapGeolocationControl: any;
      YMapZoomControl: any;
    };
    reactifiedClustererModule: {
      YMapClusterer: any;
    };
  }>(null);

  useEffect(() => {
    if (!ymaps) return;

    (async () => {
      const { reactify } = await ymaps.modules.require("reactify");
      const clusterByGrid = await ymaps.modules.require("clusterer.addon.grid");

      const [
        YMap,
        YMapControls,
        YMapDefaultFeaturesLayer,
        YMapDefaultSchemeLayer,
        YMapFeature,
        YMapMarker,
        YMapListener,
      ] = reactify.module(ymaps);

      const [YMapGeolocationControl, YMapZoomControl] = reactify.module(
        await ymaps.modules.require(["GeolocationControl", "ZoomControl"])
      );

      const [YMapClusterer] = reactify.module(
        await ymaps.modules.require(["Clusterer"])
      );

      setModules({
        clustererModule: {
          clusterByGrid,
        },
        reactifiedMainModule: {
          YMap,
          YMapControls,
          YMapDefaultFeaturesLayer,
          YMapDefaultSchemeLayer,
          YMapFeature,
          YMapMarker,
          YMapListener,
        },
        reactifiedControlsModule: {
          YMapGeolocationControl,
          YMapZoomControl,
        },
        reactifiedClustererModule: {
          YMapClusterer,
        },
      });
    })();
  }, [ymaps]);

  return modules;
}
