import React, { useMemo } from "react";
import MarkerCenter from "./MarkerCenter";
import ClusterMaker from "./СlusterMaker";
import { getDistrictCentralPoints } from "./clustrHelper";
import {
  clusterByGrid,
  YMapClusterer,
} from "../lib/yamaps";

// --------------------------------INTERFACE-----------------------------------------------------
interface Props {
  city: string;
}

// --------------------------------FUNCTIONS-----------------------------------------------------

// --------------------------------COMPONENT-----------------------------------------------------
export default function ClusterCenter({ city }: Props) {
  // Преобразуем данные в формат, подходящий для карт
  const centerPoints = useMemo(() => getDistrictCentralPoints(), []);

  const gridSizedMethod = () => clusterByGrid({ gridSize: 200 });

  return (
    <YMapClusterer
      marker={(data) => <MarkerCenter {...data} />}
      cluster={(coordinates, data) => (
        <ClusterMaker coordinates={coordinates} data={data} />
      )}
      method={gridSizedMethod}
      features={centerPoints}
    />
  );
}
