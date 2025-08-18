export default {
  // title: 'Work order distribution by Month',
  axes: {
    left: {
      scaleType: "labels",
      margins: "0",
      // mapsTo: 'key',
      stacked: true,
      // title: '%',
      visible: false,
    },
    bottom: {
      stacked: true,
      mapsTo: "value",
      percentage: true,
      // scaleType: 'labels'
      visible: false,
    },
  },
  grid: {
    x: {
      enabled: false,
    },
  },
  toolbar: {
    enabled: false
  },
  height: "100px",
};
