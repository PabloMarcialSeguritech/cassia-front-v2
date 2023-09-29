// import React, { useEffect } from 'react';
import React, { useRef, useEffect,useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/MapBox.css'
import towerImg from '../img/torre2_blanca.png';
const MapBox = ({actualizar_rfi,search_rfid,global_longitud,global_latitude,global_zoom,devices,markers,markersWOR,lines,downs,towers,rfid,ubicacion,handleMarkerClick}) => {
 
  console.log("markers*****************************************************")
  //console.log(ubicacion)
  //console.log(markers)
  console.log(markersWOR)
  // console.log(global_latitude,global_longitud)
  let latitud_provicional=(ubicacion.groupid===0?global_latitude.value:ubicacion.latitud)
  let longitud_provicional=(ubicacion.groupid===0?global_longitud.value:ubicacion.longitud)
  const zoom_provicional=(ubicacion.groupid===0?global_zoom.value:11)
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [rfidInterval,setRfidInterval]=useState(0)
 
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
      console.log("on load map")
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
          'circle-color': "#00ff70",
          'circle-radius': 3,
          'circle-stroke-width':1,
          'circle-stroke-color': '#d1d1d1',
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
        

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        Popup= new mapboxgl.Popup({
          className: 'custom-popup',
          closeButton: false,
      })
          .setLngLat(coordinates)
          
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
            'match',
            ['get', 'severity'], 
            0, '#62a0bd', 
            1, '#ffee00', 
            2, '#ee9d08', 
            3, '#ee5c08', 
            4, '#ee0808', 
            '#4fb7f3', // Color predeterminado si no se cumplen las condiciones anteriores
          ],
          'line-width': 1,
        },
      });
      /************************************************************ CAPA RFID ************************************************************************ */
      //console.log(downs)
      var rfidIval;
      if(rfid.length!==0){
        map.addLayer({
          id: 'host-rfid',
          type: 'circle',
          source:  {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: rfid
            },
          },
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': "#cacaca",
            'circle-radius': 3,
            'circle-stroke-width':1,
            'circle-stroke-color': '#fff',
          },
        });
        var popup;
        rfid.forEach((feature) => {
          const coordinates = feature.geometry.coordinates.slice();
          const val = feature.properties.lecturas; // Asegúrate de tener esta propiedad en tus datos
        
          popup = new mapboxgl.Popup({
            className: 'custom-popup-rfid',
            closeButton: false,
            closeOnClick: false
        })
            .setLngLat(coordinates)
            .setHTML(`<div class='cont-rfid' style='border: 1px solid #ffffff;'>
            <div class='titleRFID'><div class='txtTitleRfid'>Trafico</div><br></div>
            <div class='valRFID'><div class='txtRfid'>${val}</div><br><br></div>
                
                </div>`)
                .addTo(map);
        });
        rfidIval=setInterval(() => {
          console.log("rfidInterval ",rfidIval)
          setRfidInterval(rfidIval)
        actualizar_rfi(map,popup,rfidIval)
       }, 5000);
        
        // console.log(rfidInterval)
      }else{
        console.log("******** no existe rfid *************",rfidInterval)
        clearInterval(rfidInterval);
      }
      
     
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
            'match',
            ['get', 'severity'], 
            -1, '#1fee08',
            0, '#4fb7f3', 
            1, '#ffee00', 
            2, '#ee9d08', 
            3, '#ee5c08', 
            4, '#ee0808', 
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
        

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        Popup= new mapboxgl.Popup({
          className: 'custom-popup',
          closeButton: false,
      })
          .setLngLat(coordinates)
          
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
      console.log("downs map")
      console.log(downs)
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
      // setMapInstance(map)
      
     
      
    })
   
    
    return () => map.remove();
  }, [markers]);
 
  
  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;

};


export default MapBox;
