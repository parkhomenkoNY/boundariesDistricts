export const customization = [
  {
    tags: {
      any: "poi",
      none: ["outdoor", "park", "cemetery", "medical"],
    },
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: "road",
    },
    types: "point",
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["food_and_drink", "shopping", "commercial_services"],
    },
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["traffic_light"],
    },
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["entrance"],
    },
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["road"],
      none: [
        "road_1",
        "road_2",
        "road_3",
        "road_4",
        "road_5",
        "road_6",
        "road_7",
      ],
    },
    elements: "label.icon",
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["region", "road_1", "road_2", "road_3", "road_4"],
    },
    elements: "label",
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["district"],
    },
    elements: "label",
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: "admin",
      none: ["country", "region", "locality", "district", "address"],
    },
    elements: "label",
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: ["road_5", "road_6"],
    },
    elements: "label",
    stylers: {
      visibility: "off",
    },
  },
  {
    tags: {
      any: [
        "address",
        "road_7",
        "road_limited",
        "road_unclassified",
        "road_minor",
        "road_construction",
        "path",
      ],
    },
    elements: "label",
    stylers: {
      visibility: "off",
    },
  },
];
