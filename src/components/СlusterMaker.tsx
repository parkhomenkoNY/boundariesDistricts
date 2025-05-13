import { Box, Typography } from "@mui/material";
import { LngLat } from "@yandex/ymaps3-types";
import { YMapMarker } from "ymap3-components";
import { ExpandedFeature } from "./clustrHelper";

interface ClusterMakerProps {
  coordinates: LngLat;
  features: ExpandedFeature[];
}

const ClusterMaker = ({ coordinates, features }: ClusterMakerProps) => (
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
export default ClusterMaker;
