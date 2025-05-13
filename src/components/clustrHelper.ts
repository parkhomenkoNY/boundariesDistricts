import { Feature, LngLat } from "@yandex/ymaps3-types";

import features from "../json/MskGeoJson.json";

import featuresSPB from "../json/SpbGeoJson.json";

import parksData from "../json/park.json";

export type ExpandedFeature = Feature & { id: string };
// ----------------------------------------------------------------------------------------------

// тут достаем из json названия округов для отображения на карте
// ['ЮВАО', 'ЦАО', 'СВАО', 'ВАО', 'Троицкий', 'Новомосковский', 'ЗелАО', 'ЮЗАО', 'САО', 'СЗАО', 'ЮАО', 'ЗАО']
const mapPoligon = features.featuresMSK;
const mapPoligonSPB = featuresSPB.featuresSPB;

// названия районов ЦАО ЗАО ... МОСКВА
export const getDistrictName = () => {
  return mapPoligon.map((item) => item.properties.ABBREV);
};

// название районов Центральный Петроградский ... ПИТЕР
export const getDistrictNameSPB = () => {
  return mapPoligonSPB.map((item) => item.properties.name);
};

// тут координаты центров го  ... МОСКВА
export const getCenterOfDistrict = () => {
  return mapPoligon.map((item) => item.properties.CENTER);
};

// тут названия парков
export const getparksPoints = () => {
  return parksData.parks.map((item) => item.name);
};

// тут координаты центров го  ...  ПИТЕР
export const getCenterOfDistrictSPB = () => {
  return mapPoligonSPB.map((item) => item.properties.CENTER);
};
// тут собираем объект с данными названий го и центральных координат
export const getDistrictCentralPoints = (): ExpandedFeature[] => {
  const centers = getCenterOfDistrict();
  const nameCenters = getDistrictName();
  return centers.map((center, index) => ({
    // type: 'Feature',
    id: index.toString(),
    geometry: { type: "Point", coordinates: center },
    properties: {
      name: nameCenters[index],
      description: "",
    },
  }));
};

export const getDistrictCentralPointsSPB = (): ExpandedFeature[] => {
  const centers = getCenterOfDistrictSPB();
  const nameCenters = getDistrictNameSPB();
  return centers.map((centerDistrict, index) => ({
    id: index.toString(),
    geometry: { type: "Point", coordinates: centerDistrict },
    properties: {
      name: nameCenters[index],
      description: "",
    },
  }));
};
// ----------------------------------------------------------------------------------------------
// export const centralDistrictoints = (getCenters: () => number[][], getNames: () => string[]) => {
//     const centers = getCenters()
//     console.log('centers', centers)
//     const nameCenters = getNames()
//     console.log('nameCenters', nameCenters)
//     return centers.map((center, index) => ({
//         id: index.toString(),
//         geometry: { type: 'Point', coordinates: center },
//         properties: {
//             name: nameCenters[index],
//             description: '',
//         },
//     }))
// }

// export const getDistrictCentralPointss = (): ExpandedFeature[] => {
//     centralDistrictoints(getCenterOfDistrict, getDistrictName)
// }

// console.log('!!!!!!!!!!!!!', getDistrictCentralPointss())
// ----------------------------------------------------------------------------------------------

// тут координаты строений, где мчс обитает, пока рандомные
export const getBuildings = () => {
  return mapPoligon.map((item) => item.properties.MCHS);
};

// ту собираем данные со строениями
export const getBuildingsPoints = (): ExpandedFeature[] => {
  const centers = getBuildings();
  // const nameCenters = getDistrictName()
  return centers.map((center, index) => ({
    // type: 'Feature',
    id: index.toString(),
    geometry: { type: "Point", coordinates: center },
    properties: {
      description: "",
    },
  }));
};
