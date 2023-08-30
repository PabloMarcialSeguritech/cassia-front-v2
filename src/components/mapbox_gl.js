// import React, { useEffect } from 'react';
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import towerImg from '../img/torre2_blanca.png';
const MapBox = ({devices,markers,markersWOR,lines,downs,towers,ubicacion,handleMarkerClick}) => {
 
  //console.log("markers*****************************************************")
  //console.log(ubicacion)
  //console.log(markers)
  //console.log(markersWOR)
  let latitud_provicional=(ubicacion.groupid===0?'20.93236':ubicacion.latitud)
  let longitud_provicional=(ubicacion.groupid===0?'-101.21700':ubicacion.longitud)
  const zoom_provicional=(ubicacion.groupid===0?8:11)
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  //console.log("longitud_provicional")
  //console.log(longitud_provicional)
  // const host=[
  //   {
  //     type: 'Feature',
  //     properties:{
  //       correlarionid: 444,
  //       hostidP: 21655,
  //       hostidC: 16880,
  //       init_lat: "21.101700",
  //       init_lon: "-101.636770",
  //       end_lat: "21.109167",
  //       end_lon: "-101.594167",
  //       hostid: 16880,
  //       Alineacion: -74,
  //       color_alineacion:1
  //     },
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [-101.636770, 21.101700],
  //     },
  //   },
  //   {
  //     type: 'Feature',
  //     properties:{
  //       correlarionid: 444,
  //       hostidP: 21655,
  //       hostidC: 16880,
  //       init_lat: "21.101700",
  //       init_lon: "-101.636770",
  //       end_lat: "21.109167",
  //       end_lon: "-101.594167",
  //       hostid: 16880,
  //       Alineacion: -74,
  //       color_alineacion:1
  //     },
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [-101.646770, 21.101700],
  //     },
  //   },
  //   {
  //     type: 'Feature',
  //     properties:{
  //       correlarionid: 444,
  //       hostidP: 21655,
  //       hostidC: 16880,
  //       init_lat: "21.101700",
  //       init_lon: "-101.636770",
  //       end_lat: "21.109167",
  //       end_lon: "-101.594167",
  //       hostid: 16880,
  //       Alineacion: -74,
  //       color_alineacion:1
  //     },
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [-101.656770, 21.101700],
  //     },
  //   },
  // ]
  // //console.log(host)
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2lvcm9jaGEiLCJhIjoiY2xpZWJyZTR3MHpqcjNlcWRvaHR1em5sayJ9._SOrMWsc39Coa2dTHR072Q';
    
    
    
    if(markers.length===0){
      //console.log("marker vacio")
    }else{
      //console.log("markers lleno")
    
    }
  useEffect(() => {
    mapRef.current  = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/giorocha/clkirdmmx00ox01qm7js2bdas',
      // style:'mapbox://styles/giorocha/clklfh8h8011001qm5hah2vje',
      // style: 'mapbox://styles/mapbox/dark-v11',
      zoom: zoom_provicional,
      // center: [ubicacion.longitud, ubicacion.latitud],
      center:[longitud_provicional,latitud_provicional]
    });
    let Popup;
    const map = mapRef.current;
    map.on('load', () => {
      if(markers.length===0){
        //console.log("marker vacio")
      }else{
        //console.log("markers lleno")
        // map.remove()
      }
      
      //console.log("onload")
      //console.log(markersWOR)
       /************************************************************ CAPA MWOR ************************************************************************ */
       map.addLayer({
        id: 'host-markerWOR',
        type: 'circle',
        source:  {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: markersWOR
          },
        },
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': "#4fb7f3",
          'circle-radius': 3,
          'circle-stroke-width':1,
          'circle-stroke-color': '#fff',
        }
        ,
      });
      map.on('mouseleave', 'host-markerWOR', (e) => {
        //  //console.log(e)
        Popup.remove();
        });
      map.on('mouseenter', 'host-markerWOR', (e) => {
        // //console.log(e)
        if(e.features[0].properties.tooltip){

        
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        Popup= new mapboxgl.Popup({
          className: 'custom-popup',
          closeButton: false,
      })
          .setLngLat(coordinates)
          // .setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`)
          .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
          <div>${e.features[0].properties.name_hostC.slice(0, 25)}...</div>
          
          </div>`)
          .addTo(map);
    }
      });
      map.on('click', 'host-markerWOR', (e) => {
        handleMarkerClick(e.features[0].properties)
      });
     /************************************************************ CAPA LINEAS ************************************************************************ */
      map.addLayer({
        id: 'line-conection',
        // id: 'linea',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: lines,
          },
        },
        paint: {
          'line-color':[
            'match', // Utilizamos la función 'match' para evaluar el atributo 'tsunami'
            ['get', 'severity'], // Accedemos al valor del atributo 'tsunami'
            0, '#62a0bd', // Si tsunami es igual a 0, color azul '#11b4da'
            1, '#ffee00', // Si tsunami es igual a 1, color rojo '#ff0000'
            2, '#ee9d08', // Si tsunami es igual a 0, color azul '#11b4da'
            3, '#ee5c08', // Si tsunami es igual a 1, color rojo '#ff0000'
            4, '#ee0808', // Si tsunami es igual a 1, color rojo '#ff0000'
            '#4fb7f3', // Color predeterminado si no se cumplen las condiciones anteriores
          ],
          'line-width': 1,
        },
      });
       /************************************************************ CAPA UP ************************************************************************ */
      map.addLayer({
        id: 'host-marker',
        type: 'circle',
        source:  {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: markers
          },
        },
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': [
            'match', // Utilizamos la función 'match' para evaluar el atributo 'tsunami'
            ['get', 'severity'], // Accedemos al valor del atributo 'tsunami'
            0, '#00ff70', // Si tsunami es igual a 0, color azul '#11b4da'
            1, '#ffee00', // Si tsunami es igual a 1, color rojo '#ff0000'
            2, '#ee9d08', // Si tsunami es igual a 0, color azul '#11b4da'
            3, '#ee5c08', // Si tsunami es igual a 1, color rojo '#ff0000'
            4, '#ee0808', // Si tsunami es igual a 1, color rojo '#ff0000'
            '#11b4da', // Color predeterminado si no se cumplen las condiciones anteriores
          ],
          'circle-radius': 4,
          'circle-stroke-width':1,
          'circle-stroke-color': '#fff',
        },
      });
      map.on('mouseleave', 'host-marker', (e) => {
        //  //console.log(e)
        Popup.remove();
        });
      map.on('mouseenter', 'host-marker', (e) => {
        // //console.log(e)
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        Popup= new mapboxgl.Popup({
          className: 'custom-popup',
          closeButton: false,
      })
          .setLngLat(coordinates)
          // .setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`)
          .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
          <div>${e.features[0].properties.name_hostC.slice(0, 25)}...</div><br>
          <div> Alineación: <b style='color: ${e.features[0].properties.color_alineacion};'>${e.features[0].properties.Alineacion}</b> </div>
          
          </div>`)
          .addTo(map);
      });
      map.on('click', 'host-marker', (e) => {
        handleMarkerClick(e.features[0].properties)
      });
      /************************************************************ CAPA DOWNS ************************************************************************ */
      //console.log(downs)
      map.addLayer({
        id: 'host-down',
        type: 'circle',
        source:  {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: downs
          },
        },
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': "#FF0000",
          'circle-radius': 7,
          'circle-stroke-width':1,
          'circle-stroke-color': '#fff',
        },
      });
      map.on('mouseleave', 'host-down', (e) => {
        Popup.remove();
        });
      map.on('mouseenter', 'host-down', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        Popup= new mapboxgl.Popup({
          className: 'custom-popup',
          closeButton: true,
      })
          .setLngLat(coordinates)
          .setHTML(`<div class='cont-pop' style='border: 1px solid #ff0000;'>
          <div>${e.features[0].properties.Name.slice(0, 25)}...</div><br>
          <div> Descripcion: <b style='color: #ff0000;'>${e.features[0].properties.descripcion}</b> </div>
          </div>`)
          .addTo(map);
      });
      map.on('click', 'host-down', (e) => {
       
      })
 /************************************************************ CAPA TORRES ************************************************************************ */
      map.loadImage(
        towerImg,
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('tower', image);

          // Add a data source containing one point feature.
          map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: towers,
            },
          });

          // Add a layer to use the image to represent the data.
          map.addLayer({
            id: 'tower-marker',
            type: 'symbol',
            source: 'point', // reference the data source
            layout: {
              'icon-image': 'tower', // reference the image
              'icon-size': 0.12,
              'icon-anchor': 'bottom', 
            },
          });
          map.on('mouseleave', 'tower-marker', (e) => {
            Popup.remove();
            });
          map.on('mouseenter', 'tower-marker', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            Popup= new mapboxgl.Popup({
              className: 'custom-popup',
              closeButton: false,
          })
              .setLngLat(coordinates)
              .setHTML(`<div class='cont-pop' style='border: 1px solid #ffffff;'>
              <div>${e.features[0].properties.Name.slice(0, 25)}...</div><br>
              </div>`)
              .addTo(map);
          });
        }
      );
      
      
    })

    return () => map.remove();
  }, [markers]);
  // useEffect(() => {
  //   if(markers.length1!==0){
  //     const map = mapRef.current;
  //     //console.log(map.getLayer('host-marker'))
  //   }else{
  //     //console.log("primera vez")
  //   }
  // },[markers])
  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapBox;
