import { YMapMarker } from "ymap3-components";
import { ExpandedFeature } from "./clustrHelper";
import { moscow } from "./imagesHelper";
const IMAGE_PATH = "../../img/gerbs/";

const MarkerCenter = (feature: ExpandedFeature) => (
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
export default MarkerCenter;
