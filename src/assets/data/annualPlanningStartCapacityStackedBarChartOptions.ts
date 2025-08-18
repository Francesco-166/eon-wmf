export default {
  title: '', //'Work order distribution by Month',
  axes: {
    left: {
      mapsTo: 'value',
      stacked: true,
      title: '%',
      percentage: true
    },
    bottom: {
      mapsTo: 'key',
      scaleType: 'labels'
    }
  },
  toolbar: {
    enabled: false
  },
  height: '400px'
}