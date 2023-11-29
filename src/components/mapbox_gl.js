// import React, { useEffect } from 'react';
import React, { useRef, useEffect,useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/MapBox.css'
import towerImg from '../img/torre2_blanca.png';

import serverImg from '../img/server_up_2.png';
import serverImg0 from '../img/server_0.png';
import serverImg1 from '../img/server_1.png';
import serverImg2 from '../img/server_2.png';
import serverImg3 from '../img/server_3.png';
import serverImg4 from '../img/server_4.png';

const MapBox = ({capas,setCapas,actualizar_rfi,mapAux,setmapAux,search_rfid,global_longitud,global_latitude,global_zoom,devices,markers,markersWOR,lines,downs,towers,rfid,ubicacion,switches,handleMarkerClick}) => {


  
  console.log("markers*****************************************************")
  console.log(downs)
  console.log(switches.length)
  // console.log(markers)
  // console.log(markersWOR)
  // console.log(global_latitude,global_longitud)
  let latitud_provicional=(ubicacion.groupid===0?global_latitude.value:ubicacion.latitud)
  let longitud_provicional=(ubicacion.groupid===0?global_longitud.value:ubicacion.longitud)
  const zoom_provicional=(ubicacion.groupid===0?global_zoom.value:11)
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [rfidInterval,setRfidInterval]=useState(0)
  const idCapaExistente = (id) => {
    return Object.values(capas).some(capa => capa.id === id);
  };
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
      center:[longitud_provicional,latitud_provicional]
    });
    let Popup;
    const map = mapRef.current;
    setmapAux(map)
    


     map.on('load', () => {
      console.log("on load map")
       /************************************************************ CAPA Servers ************************************************************************ */
       

if(ubicacion.dispId==10){
  map.loadImage(
    serverImg,
    (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage('server', image);

      // Add a data source containing one point feature.
      const upImgSource={
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markersWOR,
        },
      }
      // map.addSource('tower-marker',towerSource );

      // Add a layer to use the image to represent the data.
      const upImgLayer={
        id: 'host-server',
        type: 'symbol',
        source: 'host-server', // reference the data source
        layout: {
          'icon-image': 'server', // reference the image
          'icon-size': 0.06,
          'icon-anchor': 'bottom', 
        },
      }
      
        map.addSource('host-server',upImgSource );
        map.addLayer(upImgLayer);
      
      if(!idCapaExistente('host-server')){
        setCapas((prevCapas) => ({
          ...prevCapas,
          [Object.keys(prevCapas).length ]: { show: true, name: 'Servers',id:`host-server`,layer:upImgLayer,source:upImgSource ,nivel:5},
        }));
      }
      
      
    }
  );
}
     /************************************************************ CAPA MWOR ************************************************************************ */
  const markerWOR ={
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
  }
   map.addLayer(markerWOR);
if(!idCapaExistente('host-markerWOR')){
  setCapas((prevCapas) => ({
    ...prevCapas,
    [Object.keys(prevCapas).length ]: { show: true, name: 'Conectados',id:`host-markerWOR`,layer:markerWOR ,source:null,nivel:1},
  }));
}


// }

map.on('mouseleave', 'host-markerWOR', (e) => {
  //  //console.log(e)
  // Popup.remove();
  const popups = document.querySelectorAll('.custom-popup');

popups.forEach(popup => {

popup.remove();
});
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

     if(lines.length!==0){
        const LineConect={
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
          }
          map.addLayer(LineConect);
          if(!idCapaExistente('line-conection')){
            setCapas((prevCapas) => ({
              ...prevCapas,
              [Object.keys(prevCapas).length ]: { show: true, name: 'Relaciones',id:`line-conection`,layer:LineConect ,source:null,nivel:2},
            }));
          }
        }

    
         /************************************************************ CAPA LINEAS Switches ************************************************************************ */
        if(switches.length!==0){
           const switchesConect={
               id: 'switches-conection',
               // id: 'linea',
               type: 'line',
               source: {
                 type: 'geojson',
                 data: {
                   type: 'FeatureCollection',
                   features: switches,
                 },
               },
               paint: {
                'line-color':[
                              'match',
                              ['get', 'severity'], 
                              0, '#ee0808', 
                              1, '#4fb7f3', 
                              2, '#ee9d08', 
                              3, '#ee5c08', 
                              4, '#ee0808', 
                              '#4fb7f3', // Color predeterminado si no se cumplen las condiciones anteriores
                            ],
                 'line-width': 1,
               },
             }
             map.addLayer(switchesConect);
             if(!idCapaExistente('switches-conection')){
               setCapas((prevCapas) => ({
                 ...prevCapas,
                 [Object.keys(prevCapas).length ]: { show: true, name: 'Conexion Switches',id:`switches-conection`,layer:switchesConect ,source:null,nivel:2},
               }));
             }
           }

      /************************************************************ CAPA RFID ************************************************************************ */
      //console.log(downs)
      var rfidIval;
      if(rfid.length!==0){
        console.log("add layer rfid")
        const rifdLayer={
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
        };
        map.addLayer(rifdLayer);
      if(!idCapaExistente('host-rfid')){
        setCapas((prevCapas) => ({
          ...prevCapas,

          [Object.keys(prevCapas).length ]: { show: true, name: 'RFID',id:`host-rfid`,layer:rifdLayer,source:null ,nivel:3},

        }));
      }
        var popup;
        rfid.forEach((feature) => {
          const coordinates = feature.geometry.coordinates.slice();
          const val = feature.properties.lecturas; // Asegúrate de tener esta propiedad en tus datos
          const severity = feature.properties.severidad; 
          const severity_colors={
            1:'#ffee00',
            2:'#ee9d08',
            3:'#ee5c08',
            4:'#ff0808',
            
          }
          popup = new mapboxgl.Popup({
            className: 'custom-popup-rfid',
            closeButton: false,
            closeOnClick: false
        })
            .setLngLat(coordinates)
            .setHTML(`<div class='cont-rfid' style='border: 1px solid #ffffff;'>
            <div class='titleRFID'><div class='txtTitleRfid'>Trafico</div><br></div>
            <div class='valRFID' style='background: ${severity_colors[severity]}'><div class='txtRfid'>${val}</div><br><br></div>
                
                </div>`)
                .addTo(map);
        });
        rfidIval=setInterval(() => {
          console.log("rfidInterval ",rfidIval)
          // console.log(map.getSource('host-rfid'))
          setRfidInterval(rfidIval)
        actualizar_rfi(map,popup,rfidIval)
       }, 10000);
        
        // console.log(rfidInterval)
      }else{
        console.log("******** no existe rfid *************",rfidInterval)
        clearInterval(rfidInterval);
      }
      
     

       /************************************************************ CAPA Metricas ************************************************************************ */
      if(markers.length!==0){
        
       
          const alineacionLayer={
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
              'circle-radius': 5,
              'circle-stroke-width':1,
              'circle-stroke-color': '#fff',
            },
            }
          map.addLayer(alineacionLayer);
            if(!idCapaExistente('host-marker')){
              setCapas((prevCapas) => ({
                ...prevCapas,
                [Object.keys(prevCapas).length ]: { show: true, name: 'Metrica',id:`host-marker`,layer:alineacionLayer,source:null,nivel:4},
              }));
            }

        
        
          map.on('mouseleave', 'host-marker', (e) => {
            //  //console.log(e)
            // Popup.remove();
            const popups = document.querySelectorAll('.custom-popup');
          

          popups.forEach(popup => {

          
          popup.remove();
          });
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
              <div> ${e.features[0].properties.metrica}: <b style='color: ${e.features[0].properties.color_alineacion};'>${e.features[0].properties.Alineacion}</b> </div>
              
              </div>`)
              .addTo(map);
          });
          map.on('click', 'host-marker', (e) => {
            handleMarkerClick(e.features[0].properties)
          });
     }
      /************************************************************ CAPA DOWNS ************************************************************************ */
      console.log("downs map")
      console.log(downs)
      const size = 200;

    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },
      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          radius,
          0,
          Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(
          0,
          0,
          this.width,
          this.height
        ).data;

        map.triggerRepaint();

        return true;
      }
    };


      // map.addLayer({
      //   id: 'host-down',
      //   type: 'circle',
      //   source:  {
      //     type: 'geojson',
      //     data: {
      //       type: 'FeatureCollection',
      //       features: downs
      //     },
      //   },
      //   filter: ['!', ['has', 'point_count']],
      //   paint: {
      //     'circle-color': "#FF0000",
      //     'circle-radius': 7,
      //     'circle-stroke-width':1,
      //     'circle-stroke-color': '#fff',
      //   },
      // });
      // map.on('mouseleave', 'host-down', (e) => {
      //   Popup.remove();
      //   });
      // map.on('mouseenter', 'host-down', (e) => {
      //   const coordinates = e.features[0].geometry.coordinates.slice();
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //   }
      //   Popup= new mapboxgl.Popup({
      //     className: 'custom-popup',
      //     closeButton: true,
      // })
      //     .setLngLat(coordinates)
      //     .setHTML(`<div class='cont-pop' style='border: 1px solid #ff0000;'>
      //     <div>${e.features[0].properties.Name.slice(0, 25)}...</div><br>
      //     <div> Descripcion: <b style='color: #ff0000;'>${e.features[0].properties.descripcion}</b> </div>
      //     </div>`)
      //     .addTo(map);
      // });
      // map.on('click', 'host-down', (e) => {
       
      // })




      
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

  map.addSource('dot-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [0, 0]
          }
        }
      ]
    }
  });

  map.addLayer({
    'id': 'layer-with-pulsing-dot',
    'type': 'symbol',
    'source': 'dot-point',
    'layout': {
      'icon-image': 'pulsing-dot'
    }
  });

  const downLayer={
    id: 'host-down',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: downs
      },
    },
    filter: ['!', ['has', 'point_count']],
    layout: {
      'icon-image': 'pulsing-dot',
      'icon-size': 0.5,
      'icon-allow-overlap': true, // Permite la superposición del icono
    },
  }
   map.addLayer(downLayer);

  //  map.setLayerZoomRange('host-down', 1, 15);
  if(!idCapaExistente('host-down')){
    setCapas((prevCapas) => ({
      ...prevCapas,
      [Object.keys(prevCapas).length ]: { show: true, name: 'Downs',id:`host-down`,layer:downLayer,source:null ,nivel:5},

    }));
  }
  map.on('mouseleave', 'host-down', (e) => {
      // Popup.remove();
      const popups = document.querySelectorAll('.custom-popup');
      
      popups.forEach(popup => {
    
      popup.remove();
      });
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
        handleMarkerClick(e.features[0].properties)
     
    })
 /************************************************************ CAPA TORRES ************************************************************************ */
      map.loadImage(
        towerImg,
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('tower', image);

          // Add a data source containing one point feature.

          const towerSource={

            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: towers,
            },
          }
          // map.addSource('tower-marker',towerSource );

          // Add a layer to use the image to represent the data.
          const towerLayer={
            id: 'tower-marker',
            type: 'symbol',
            source: 'tower-marker', // reference the data source
            layout: {
              'icon-image': 'tower', // reference the image
              'icon-size': 0.12,
              'icon-anchor': 'bottom', 
            },
          }
          if(ubicacion.dispId!=10){
            map.addSource('tower-marker',towerSource );
            map.addLayer(towerLayer);
          }
          if(!idCapaExistente('tower-marker')){
            setCapas((prevCapas) => ({
              ...prevCapas,
              [Object.keys(prevCapas).length ]: { show: (ubicacion.dispId!=10)?true:false, name: 'Torres',id:`tower-marker`,layer:towerLayer,source:towerSource ,nivel:5},
            }));
          }
          map.on('mouseleave', 'tower-marker', (e) => {
            // Popup.remove();
            const popups = document.querySelectorAll('.custom-popup');
      
      popups.forEach(popup => {
      
      popup.remove();
      });
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
