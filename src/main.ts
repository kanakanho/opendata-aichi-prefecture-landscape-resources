import maplibregl from 'maplibre-gl'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // stylesheet location
  center: [136.9, 35.0], // starting position [lng, lat]
  zoom: 9, // starting zoom
})

map.on('load', () => {
  map.addSource('point', {
    type: 'geojson',
    data: 'landscape_resources.geojson',
  })
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: 'point',
    paint: {
      'circle-radius': 6,
      'circle-color': '#007cbf',
    },
  })

  map.on('click', 'point', (e) => {
    const features = e.features
    if (!features) {
      return
    }
    const coordinates = features[0].geometry.coordinates.slice()
    const description = features[0].properties.タイトル

    new maplibregl.Popup().setLngLat(coordinates).setHTML(description).addTo(map)
  })
})
