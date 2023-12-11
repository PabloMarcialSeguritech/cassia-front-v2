import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lvcm9jaGEiLCJhIjoiY2xpZWJyZTR3MHpqcjNlcWRvaHR1em5sayJ9._SOrMWsc39Coa2dTHR072Q';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/giorocha/clkirdmmx00ox01qm7js2bdas', // URL del estilo (elige uno de los estilos básicos de Mapbox o crea el tuyo propio con Mapbox Studio)
      center: [-73.9709, 40.6712], // posición inicial [lng, lat]
      zoom: 15.773 // nivel de zoom inicial
    });

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [
              [-73.97003, 40.67264],
              [-73.97003, 40.67264],

              [-73.97228, 40.67008]
            ],
            type: 'LineString'
          }
        }
      ]
    };

    map.on('load', () => {
      map.addSource('line', {
        type: 'geojson',
        data: geojson
      });

      map.addLayer({
        type: 'line',
        source: 'line',
        id: 'line-background',
        paint: {
          'line-color': 'yellow',
          'line-width': 6,
          'line-opacity': 0.4
        }
      });

      map.addLayer({
        type: 'line',
        source: 'line',
        id: 'line-dashed',
        paint: {
          'line-color': 'yellow',
          'line-width': 6,
          'line-dasharray': [0, 4, 3]
        }
      });

      const dashArraySequence = [
        [0, 4, 3],
        [0.5, 4, 2.5],
        [1, 4, 2],
        [1.5, 4, 1.5],
        [2, 4, 1],
        [2.5, 4, 0.5],
        [3, 4, 0],
        [0, 0.5, 3, 3.5],
        [0, 1, 3, 3],
        [0, 1.5, 3, 2.5],
        [0, 2, 3, 2],
        [0, 2.5, 3, 1.5],
        [0, 3, 3, 1],
        [0, 3.5, 3, 0.5]
        ];

      let step = 0;

      function animateDashArray(timestamp) {
        const newStep = parseInt((timestamp / 50) % dashArraySequence.length);

        if (newStep !== step) {
          map.setPaintProperty('line-dashed', 'line-dasharray', dashArraySequence[step]);
          step = newStep;
        }

        requestAnimationFrame(animateDashArray);
      }

      animateDashArray(0);
    });

    // Función de limpieza para eliminar el mapa cuando el componente se desmonta
    return () => map.remove();
  }, []); // Array de dependencias vacío para asegurar que el useEffect se ejecute solo una vez

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>; // Sustituye con el tamaño de mapa deseado
};

export default MapComponent;
