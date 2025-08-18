export default {
  title: 'Work order distribution by Month',
  axes: {
    left: {
      mapsTo: 'value',
      stacked: true,
      title: '%'
    },
    bottom: {
      mapsTo: 'key',
      scaleType: 'labels'
    }
  },
  height: '400px'
}