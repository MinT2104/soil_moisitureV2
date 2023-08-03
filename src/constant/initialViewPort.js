export const initialViewPort = {
  latitude: 10.879813421393429,
  longitude: 106.805958354189,
  zoom: 7,
  type: "circle",
  paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      ["/", ["-", 2017, ["number", ["get", "Constructi"], 2017]], 30],
      13,
      ["/", ["-", 2017, ["number", ["get", "Constructi"], 2017]], 10],
    ],
    "circle-opacity": 0.8,
    "circle-color": "rgb(171, 72, 33)",
  },
};
