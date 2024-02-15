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

function calcularPuntoMedio(coordenadas1, coordenadas2) {
  // Extraer las coordenadas de los puntos
  const [x1, y1] = coordenadas1;
  const [x2, y2] = coordenadas2;

  // Calcular el punto medio
  const puntoMedioX = (x1 + x2) / 2;
  const puntoMedioY = (y1 + y2) / 2;

  return [puntoMedioX, puntoMedioY];
}
function bitsToGB(bits) {
  const bytes = bits / 8;
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;
  const gigabytes = megabytes / 1024;
  return megabytes;
}
function bitsToGigabits(bits) {
  const gigabits = bits / 1e6; // 1e9 es equivalente a 1 billion (mil millones)
  return gigabits;
}

const MapBox = ({capas,switchesFO,switchesMO,setCapas,actualizar_rfi,actualizar_lpr,mapAux,setmapAux,search_rfid,global_longitud,global_latitude,global_zoom,devices,markers,markersWOR,lines,downs,towers,rfid,lpr,ubicacion,switches,handleMarkerClick}) => {




  

  // console.log("markers*****************************************************")

  // console.log(downs)
  // console.log(switches)
  // console.log(switchesMO)
  // console.log(markers)
  // console.log(markersWOR)
  // console.log(global_latitude,global_longitud)
 
  let latitud_provicional=(ubicacion.groupid===0?global_latitude.value:ubicacion.latitud)
  let longitud_provicional=(ubicacion.groupid===0?global_longitud.value:ubicacion.longitud)
  const zoom_provicional=(ubicacion.groupid===0?global_zoom.value:11)
  // console.log(longitud_provicional,latitud_provicional)
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [rfidInterval,setRfidInterval]=useState(0)
  const [lprInterval,setLprInterval]=useState(0)
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
      // style:'mapbox://styles/mapbox/navigation-night-v1',
      // style:'mapbox://styles/giorocha/clklfh8h8011001qm5hah2vje',
      // style: 'mapbox://styles/mapbox/dark-v11',
      zoom: zoom_provicional,
      center:[longitud_provicional,latitud_provicional]
//       center: [-73.9709, 40.6712], // starting position [lng, lat]
// zoom: 15.773 // starting zoom
      // zoom:15,
      // center:[-98.974519,19.601019]
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
  // console.log(coordinates)

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
        // if(switchesFO.length!==0 || switchesMO.length!==0){
        console.log("entra a pintar switches")
          if(ubicacion.dispId===12 && ubicacion.templateId==0){
 
        
          
            //   /**************************************************** */
              const throughtputSource={
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: switches[0]
                }
              }
                  map.addSource('line-throughtput',throughtputSource);
            
                  
                  const throughtputLayer={
                    type: 'line',
                    source: 'line-throughtput',
                    id: 'line-throughtput',
                    paint: {
                      
                      'line-color': [
                        'match',
                        ['get', 'connectivity'], 
                        -1, '#1fee08',
                    0, 'red', 
                    1, 'lime', 
                    '#11b4da', // Color predeterminado si no se cumplen las condiciones anteriores
                      ],
                      'line-width': 8,
                      'line-dasharray': [0, 0.3, 0.2]
                    }
                  }
                  map.addLayer(throughtputLayer);
            
                  const dashArraySequence = [
                    [0, 0.3, 0.2],
                      [0, 0.1, 0.2, 0.4],
                      [0, 0.2, 0.2, 0.3],
                      [0, 0.3, 0.2, 0.2],
                      [0, 0.4, 0.2, 0.1],
                      [0, 0.5, 0.2, 0],
                    
                    ];
            
                  let step = 0;
            
                  function animateDashArray(timestamp) {
                    const newStep = parseInt((timestamp / 50) % dashArraySequence.length);
            
                    if (newStep !== step) {
                      try{
                        let layerExists = map.getLayer('line-throughtput');
                        if (layerExists) {
                          map.setPaintProperty('line-throughtput', 'line-dasharray', dashArraySequence[step]);
                          // Puedes realizar operaciones adicionales aquí si la capa existe
                        }   
                      }catch(error){
                        // console.log(error)
                      }
                      
                      step = newStep;
                    }
            
                    requestAnimationFrame(animateDashArray);
                  }
            
                  animateDashArray.bind(this)(0);
                 
                 if(!idCapaExistente('line-throughtput')){
                   setCapas((prevCapas) => ({
                     ...prevCapas,
                     [Object.keys(prevCapas).length ]: { show: true, name: 'Fibra optica',id:`line-throughtput`,layer:throughtputLayer ,source:throughtputSource,nivel:2},
                   }));
                 }
                 map.on('mouseleave', 'line-throughtput', (e) => {
                  
                  const popups = document.querySelectorAll('.custom-popup');
                
                popups.forEach(popup => {
                
                popup.remove();
                });
                  });
                map.on('mouseenter', 'line-throughtput', (e) => {
                  // console.log(e.features[0].geometry.coordinates)
                  const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
                // console.log(coordinates)
                  //   const coordinates = e.features[0].geometry.coordinates.slice();
                  
        
                  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                  }
                  
                  Popup= new mapboxgl.Popup({
                    className: 'custom-popup',
                    closeButton: false,
                })
                    .setLngLat(coordinates)
                    
                    .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
                    <div>${e.features[0].properties.name}...</div>
                   
                    
                    </div>`)
                    .addTo(map);
                });
                /*********************************************************************************** */
           
              const throughtputSource2={
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: switches[1]
                }
              }
                map.addSource('line-throughtput2',throughtputSource2);
          
                
                const throughtputLayer2={
                  type: 'line',
                  source: 'line-throughtput2',
                  id: 'line-throughtput2',
                  paint: {
                    
                    'line-color': [
                      'match',
                      ['get', 'connectivity'], 
                        -1, '#1fee08',
                    0, 'red', 
                    1, 'lime', 
                    '#11b4da', // Color predeterminado si no se cumplen las condiciones anteriores
                      ],
                    'line-width': 5,
                    'line-dasharray': [0, 4, 3]
                    // 'line-dasharray': [
                    //   'match',
                    //   ['get', 'connectivity'],
                    //   0, ['solid'], // Valor cuando connectivity es 0
                    //   1, [0, 4, 3], // Valor cuando connectivity es 1
                    //   ['solid'] // Valor predeterminado si no se cumplen las condiciones anteriores
                    // ]
                  }
                }
                map.addLayer(throughtputLayer2);
          
                const dashArraySequence2 = [
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
          
                let step2 = 0;
          
                function animateDashArray2(timestamp) {
                  const newStep = parseInt((timestamp / 50) % dashArraySequence2.length);
          
                  if (newStep !== step2) {
                    try{
                      let layerExists = map.getLayer('line-throughtput2');
                      if (layerExists) {
                        map.setPaintProperty('line-throughtput2', 'line-dasharray', dashArraySequence2[step2]);
                        // Puedes realizar operaciones adicionales aquí si la capa existe
                      }   
                    }catch(error){
                      // console.log(error)
                    }
                    
                    step2 = newStep;
                  }
          
                  requestAnimationFrame(animateDashArray2);
                }
          
                animateDashArray2.bind(this)(0);
               
               if(!idCapaExistente('line-throughtput2')){
                 setCapas((prevCapas) => ({
                   ...prevCapas,
                   [Object.keys(prevCapas).length ]: { show: true, name: 'Microonda',id:`line-throughtput2`,layer:throughtputLayer2 ,source:throughtputSource2,nivel:2},
                 }));
               }
               map.on('mouseleave', 'line-throughtput2', (e) => {
                
                const popups = document.querySelectorAll('.custom-popup');
              
              popups.forEach(popup => {
              
              popup.remove();
              });
                });
              map.on('mouseenter', 'line-throughtput2', (e) => {
                // console.log(e.features[0].geometry.coordinates)
                const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
              // console.log(coordinates)
                //   const coordinates = e.features[0].geometry.coordinates.slice();
                
      
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                Popup= new mapboxgl.Popup({
                  className: 'custom-popup',
                  closeButton: false,
              })
                  .setLngLat(coordinates)
                  
                  .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
                  <div>${e.features[0].properties.name}...</div>
                  
                  </div>`)
                  .addTo(map);
              });
            




/********************************************************************* */
const throughtputSourceD1={
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: switches[2]
  }
}
    map.addSource('line-throughtputD1',throughtputSourceD1);

    
    const throughtputLayerD1={
      type: 'line',
      source: 'line-throughtputD1',
      id: 'line-throughtputD1',
      paint: {
        
        'line-color': [
          'match',
          ['get', 'connectivity'], 
          -1, '#1fee08',
      0, 'red', 
      1, 'lime', 
      '#11b4da', // Color predeterminado si no se cumplen las condiciones anteriores
        ],
        'line-width': 8,
        'line-dasharray': [0, 0.3, 0.2]
      }
    }
    map.addLayer(throughtputLayerD1);

    const dashArraySequenceD1 = [
      [0, 0.3, 0.2],
        [0, 0.1, 0.2, 0.4],
        [0, 0.2, 0.2, 0.3],
        [0, 0.3, 0.2, 0.2],
        [0, 0.4, 0.2, 0.1],
        [0, 0.5, 0.2, 0],
      
      ];

    let stepd1= 0;

    

   if(!idCapaExistente('line-throughtputD1')){
     setCapas((prevCapas) => ({
       ...prevCapas,
       [Object.keys(prevCapas).length ]: { show: true, name: 'Down Fibra optica',id:`line-throughtputD1`,layer:throughtputLayerD1 ,source:throughtputSourceD1,nivel:2},
     }));
   }
   map.on('mouseleave', 'line-throughtputD1', (e) => {
    
    const popups = document.querySelectorAll('.custom-popup');
  
  popups.forEach(popup => {
  
  popup.remove();
  });
    });
  map.on('mouseenter', 'line-throughtputD1', (e) => {
    // console.log(e.features[0].geometry.coordinates)
    const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
  // console.log(coordinates)
    //   const coordinates = e.features[0].geometry.coordinates.slice();
    

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    Popup= new mapboxgl.Popup({
      className: 'custom-popup',
      closeButton: false,
  })
      .setLngLat(coordinates)
      
      .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
      <div>${e.features[0].properties.name}...</div>
     
      
      </div>`)
      .addTo(map);
  });
  /*********************************************************************************** */

const throughtputSource2D2={
type: 'geojson',
data: {
  type: 'FeatureCollection',
  features: switches[3]
}
}
  map.addSource('line-throughtput2D2',throughtputSource2D2);

  
  const throughtputLayer2D2={
    type: 'line',
    source: 'line-throughtput2D2',
    id: 'line-throughtput2D2',
    paint: {
      
      'line-color': [
        'match',
        ['get', 'connectivity'], 
          -1, '#1fee08',
      0, 'red', 
      1, 'lime', 
      '#11b4da', // Color predeterminado si no se cumplen las condiciones anteriores
        ],
      'line-width': 5,
      'line-dasharray': [0, 4, 3]
      // 'line-dasharray': [
      //   'match',
      //   ['get', 'connectivity'],
      //   0, ['solid'], // Valor cuando connectivity es 0
      //   1, [0, 4, 3], // Valor cuando connectivity es 1
      //   ['solid'] // Valor predeterminado si no se cumplen las condiciones anteriores
      // ]
    }
  }
  map.addLayer(throughtputLayer2D2);

  const dashArraySequence2D2 = [
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

  let step2d2 = 0;

  function animateDashArray2D2(timestamp) {
    const newStep = parseInt((timestamp / 50) % dashArraySequence2D2.length);

    if (newStep !== step2d2) {
      try{
        let layerExists = map.getLayer('line-throughtput2D2');
        if (layerExists) {
          map.setPaintProperty('line-throughtput2D2', 'line-dasharray', dashArraySequence2D2[step2]);
          // Puedes realizar operaciones adicionales aquí si la capa existe
        }   
      }catch(error){
        // console.log(error)
      }
      
      step2 = newStep;
    }

    // requestAnimationFrame(animateDashArray2);
  }

  animateDashArray2D2.bind(this)(0);
 
 if(!idCapaExistente('line-throughtput2D2')){
   setCapas((prevCapas) => ({
     ...prevCapas,
     [Object.keys(prevCapas).length ]: { show: true, name: 'Down Microonda',id:`line-throughtput2D2`,layer:throughtputLayer2D2 ,source:throughtputSource2D2,nivel:2},
   }));
 }
 map.on('mouseleave', 'line-throughtput2D2', (e) => {
  
  const popups = document.querySelectorAll('.custom-popup');

popups.forEach(popup => {

popup.remove();
});
  });
map.on('mouseenter', 'line-throughtput2D2', (e) => {
  // console.log(e.features[0].geometry.coordinates)
  const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
// console.log(coordinates)
  //   const coordinates = e.features[0].geometry.coordinates.slice();
  

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  
  Popup= new mapboxgl.Popup({
    className: 'custom-popup',
    closeButton: false,
})
    .setLngLat(coordinates)
    
    .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
    <div>${e.features[0].properties.name}...</div>
    
    </div>`)
    .addTo(map);
});

          }
            
          // const switchesConectSource={
          //   type: 'geojson',
          //   data: {
          //     type: 'FeatureCollection',
          //     features: switches
          //   }
          // }
              
        
              
          //     const switchesConect={
          //       type: 'line',
          //       source: 'switches-conection',
          //       id: 'switches-conection',
          //       paint: {
                  
          //         'line-color': [
          //           'match',
          //           ['get', 'severity'], 
          //           0, 'red', 
          //           1, 'lime', 
          //           2, '#ee9d08', 
          //           3, '#ee5c08', 
          //           4, '#ee0808', 
          //           '#4fb7f3', // Color predeterminado si no se cumplen las condiciones anteriores
          //         ],
          //         'line-width': 5,
          //         'line-dasharray': [0, 4, 3]
          //       }
          //     }
          //     if(markers.length==0){
          //       map.addSource('switches-conection',switchesConectSource);
          //       map.addLayer(switchesConect);
          //     }
              
        
          //     const dashArraySequence = [
          //       [0, 4, 3],
          //       [0.5, 4, 2.5],
          //       [1, 4, 2],
          //       [1.5, 4, 1.5],
          //       [2, 4, 1],
          //       [2.5, 4, 0.5],
          //       [3, 4, 0],
          //       [0, 0.5, 3, 3.5],
          //       [0, 1, 3, 3],
          //       [0, 1.5, 3, 2.5],
          //       [0, 2, 3, 2],
          //       [0, 2.5, 3, 1.5],
          //       [0, 3, 3, 1],
          //       [0, 3.5, 3, 0.5]
          //       ];
        
          //     let step = 0;
        
          //     function animateDashArray(timestamp) {
          //       const newStep = parseInt((timestamp / 50) % dashArraySequence.length);
        
          //       if (newStep !== step) {
          //         try{
          //           let layerExists = map.getLayer('switches-conection');
          //           if (layerExists) {
          //             map.setPaintProperty('switches-conection', 'line-dasharray', dashArraySequence[step]);
          //           }
          //         }catch(error){
          //           // console.log(error)
          //         }
                  
          //         step = newStep;
          //       }
        
          //       requestAnimationFrame(animateDashArray);
          //     }
        
          //     animateDashArray.bind(this)(0);
             

          //    if(!idCapaExistente('switches-conection')){
          //      setCapas((prevCapas) => ({
          //        ...prevCapas,
          //        [Object.keys(prevCapas).length ]: { show: (markers.length==0)?true:false, name: 'Conexion Switches',id:`switches-conection`,layer:switchesConect ,source:switchesConectSource,nivel:2},
          //      }));
          //    }
          //  }

      /************************************************************ CAPA RFID ************************************************************************ */
      //console.log(downs)
      var rfidIval;
      if(rfid.length!==0){
        // console.log("add layer rfid")
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
            // .setHTML(`<div class='cont-rfid' style='border: 1px solid #ffffff;'>
            // <div class='titleRFID'><div class='txtTitleRfid'>Trafico</div><br></div>
            // <div class='valRFID' style='background: ${severity_colors[severity]}'><div class='txtRfid'>${val}</div><br><br></div>
            //     </div>`)
                .setHTML(`<div class='cont-rfid' style='border: 1px solid #ffffff;'>
            <div class='titleRFID'><div class='txtTitleRfid'>Trafico</div><br></div>
            <div class='valRFID' style='background: ${severity_colors[severity]}'><div class='txtRfid' style='color: ${((severity!=0)?'black !important':'lime')}' >${val}</div><br><br></div>
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
      
      /************************************************************ CAPA LPR ************************************************************************ */
      //console.log(downs)
      var lprval;
      if(lpr.length!==0){
        // console.log("add layer lpr")
        const lprLayer={
          id: 'host-lpr',
          type: 'circle',
          source:  {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: lpr
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
        map.addLayer(lprLayer);
      if(!idCapaExistente('host-lpr')){
        setCapas((prevCapas) => ({
          ...prevCapas,
          [Object.keys(prevCapas).length ]: { show: true, name: 'LPR',id:`host-lpr`,layer:lprLayer,source:null ,nivel:3},
        }));
      }
        var popup;
        lpr.forEach((feature) => {
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
            className: 'custom-popup-lpr',
            closeButton: false,
            closeOnClick: false
        })
            .setLngLat(coordinates)
            // .setHTML(`<div class='cont-rfid' style='border: 1px solid #ffffff;'>
            // <div class='titleRFID'><div class='txtTitleRfid'>Trafico</div><br></div>
            // <div class='valRFID' style='background: ${severity_colors[severity]}'><div class='txtRfid'>${val}</div><br><br></div>
            //     </div>`)
                .setHTML(`<div class='cont-lpr' style='border: 1px solid #ffffff;'>
            <div class='titleLPR'><div class='txtTitleLpr'>Lecturas</div><br></div>
            <div class='valLPR' style='background: ${severity_colors[severity]}'><div class='txtLpr' style='color: ${((severity!=0)?'black !important':'lime')}' >${val}</div><br><br></div>
                </div>`)
                .addTo(map);
        });
        lprval=setInterval(() => {
          console.log("LprInterval ",lprval)
          // console.log(map.getSource('host-rfid'))
          setLprInterval(lprval)
        actualizar_lpr(map,popup,lprval)
       }, 10000);
        
        // console.log(rfidInterval)
      }else{
        console.log("******** no existe rfid *************",lprInterval)
        clearInterval(lprInterval);
      }
      
     


       /************************************************************ CAPA Metricas ************************************************************************ */
      if(markers.length!==0){

        
       if(ubicacion.dispId===12){
 
        
          
          //   /**************************************************** */
            const throughtputSource={
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: markers[0]
              }
            }
                map.addSource('line-throughtput',throughtputSource);
          
                
                const throughtputLayer={
                  type: 'line',
                  source: 'line-throughtput',
                  id: 'line-throughtput',
                  paint: {
                    
                    'line-color': [
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
                    'line-width': 8,
                    'line-dasharray': [0, 0.3, 0.2]
                  }
                }
                map.addLayer(throughtputLayer);
          
                const dashArraySequence = [
                  [0, 0.3, 0.2],
                    [0, 0.1, 0.2, 0.4],
                    [0, 0.2, 0.2, 0.3],
                    [0, 0.3, 0.2, 0.2],
                    [0, 0.4, 0.2, 0.1],
                    [0, 0.5, 0.2, 0],
                  
                  ];
          
                let step = 0;
          
                function animateDashArray(timestamp) {
                  const newStep = parseInt((timestamp / 50) % dashArraySequence.length);
          
                  if (newStep !== step) {
                    try{
                      let layerExists = map.getLayer('line-throughtput');
                      if (layerExists) {
                        map.setPaintProperty('line-throughtput', 'line-dasharray', dashArraySequence[step]);
                        // Puedes realizar operaciones adicionales aquí si la capa existe
                      }   
                    }catch(error){
                      // console.log(error)
                    }
                    
                    step = newStep;
                  }
          
                  requestAnimationFrame(animateDashArray);
                }
          
                animateDashArray.bind(this)(0);
               
               if(!idCapaExistente('line-throughtput')){
                 setCapas((prevCapas) => ({
                   ...prevCapas,
                   [Object.keys(prevCapas).length ]: { show: true, name: 'Metrica fibra optica',id:`line-throughtput`,layer:throughtputLayer ,source:throughtputSource,nivel:2},
                 }));
               }
               map.on('mouseleave', 'line-throughtput', (e) => {
                
                const popups = document.querySelectorAll('.custom-popup');
              
              popups.forEach(popup => {
              
              popup.remove();
              });
                });
              map.on('mouseenter', 'line-throughtput', (e) => {
                // console.log(e.features[0].geometry.coordinates)
                const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
              // console.log(coordinates)
                //   const coordinates = e.features[0].geometry.coordinates.slice();
                
      
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                Popup= new mapboxgl.Popup({
                  className: 'custom-popup',
                  closeButton: false,
              })
                  .setLngLat(coordinates)
                  
                  .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
                  <div>${e.features[0].properties.name}...</div><br>
                  <div> ${e.features[0].properties.metrica}: <b style='color: ${e.features[0].properties.color_alineacion};'>${bitsToGigabits(e.features[0].properties.Metric).toFixed(4)} Mbps</b> </div>
                  
                  </div>`)
                  .addTo(map);
              });
              /*********************************************************************************** */
         
          const throughtputSource2={
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: markers[1]
            }
          }
              map.addSource('line-throughtput2',throughtputSource2);
        
              
              const throughtputLayer2={
                type: 'line',
                source: 'line-throughtput2',
                id: 'line-throughtput2',
                paint: {
                  
                  'line-color': [
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
                  'line-width': 5,
                  'line-dasharray': [0, 4, 3]
                }
              }
              map.addLayer(throughtputLayer2);
        
              const dashArraySequence2 = [
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
        
              let step2 = 0;
        
              function animateDashArray2(timestamp) {
                const newStep = parseInt((timestamp / 50) % dashArraySequence2.length);
        
                if (newStep !== step2) {
                  try{
                    let layerExists = map.getLayer('line-throughtput2');
                    if (layerExists) {
                      map.setPaintProperty('line-throughtput2', 'line-dasharray', dashArraySequence2[step2]);
                      // Puedes realizar operaciones adicionales aquí si la capa existe
                    }   
                  }catch(error){
                    // console.log(error)
                  }
                  
                  step2 = newStep;
                }
        
                requestAnimationFrame(animateDashArray2);
              }

        
              animateDashArray2.bind(this)(0);
             
             if(!idCapaExistente('line-throughtput2')){
               setCapas((prevCapas) => ({
                 ...prevCapas,
                 [Object.keys(prevCapas).length ]: { show: true, name: 'Metrica Microonda',id:`line-throughtput2`,layer:throughtputLayer2 ,source:throughtputSource2,nivel:2},
               }));
             }
             map.on('mouseleave', 'line-throughtput2', (e) => {
              
              const popups = document.querySelectorAll('.custom-popup');

      
              




            

            
            
            popups.forEach(popup => {
            
            popup.remove();
            });
              });
            map.on('mouseenter', 'line-throughtput2', (e) => {
              // console.log(e.features[0].geometry.coordinates)
              const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
            // console.log(coordinates)
              //   const coordinates = e.features[0].geometry.coordinates.slice();
              
    
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }
              
              Popup= new mapboxgl.Popup({
                className: 'custom-popup',
                closeButton: false,
            })
                .setLngLat(coordinates)
                
                .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
                <div>${e.features[0].properties.name}...</div><br>
                <div> ${e.features[0].properties.metrica}: <b style='color: ${e.features[0].properties.color_alineacion};'>${bitsToGigabits(e.features[0].properties.Metric).toFixed(4)} Mbps</b> </div>
                
                </div>`)
                .addTo(map);
            });
            /********************************************************************* */
const throughtputSourceD1={
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: markers[2]
  }
}
    map.addSource('line-throughtputD1',throughtputSourceD1);

    
    const throughtputLayerD1={
      type: 'line',
      source: 'line-throughtputD1',
      id: 'line-throughtputD1',
      paint: {
        
        'line-color': 'red',
        'line-width': 8,
        'line-dasharray': [0, 0.3, 0.2]
      }
    }
    map.addLayer(throughtputLayerD1);

    const dashArraySequenceD1 = [
      [0, 0.3, 0.2],
        [0, 0.1, 0.2, 0.4],
        [0, 0.2, 0.2, 0.3],
        [0, 0.3, 0.2, 0.2],
        [0, 0.4, 0.2, 0.1],
        [0, 0.5, 0.2, 0],
      
      ];

    let stepd1= 0;

    

   if(!idCapaExistente('line-throughtputD1')){
     setCapas((prevCapas) => ({
       ...prevCapas,
       [Object.keys(prevCapas).length ]: { show: true, name: 'Down Fibra optica',id:`line-throughtputD1`,layer:throughtputLayerD1 ,source:throughtputSourceD1,nivel:2},
     }));
   }
   map.on('mouseleave', 'line-throughtputD1', (e) => {
    
    const popups = document.querySelectorAll('.custom-popup');
  
  popups.forEach(popup => {
  
  popup.remove();
  });
    });
  map.on('mouseenter', 'line-throughtputD1', (e) => {
    // console.log(e.features[0].geometry.coordinates)
    const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
  // console.log(coordinates)
    //   const coordinates = e.features[0].geometry.coordinates.slice();
    

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    Popup= new mapboxgl.Popup({
      className: 'custom-popup',
      closeButton: false,
  })
      .setLngLat(coordinates)
      
      .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
      <div>${e.features[0].properties.name}...</div>
     
      
      </div>`)
      .addTo(map);
  });
  /*********************************************************************************** */

const throughtputSource2D2={
type: 'geojson',
data: {
  type: 'FeatureCollection',
  features: markers[3]
}
}
  map.addSource('line-throughtput2D2',throughtputSource2D2);

  
  const throughtputLayer2D2={
    type: 'line',
    source: 'line-throughtput2D2',
    id: 'line-throughtput2D2',
    paint: {
      
      'line-color': 'red',
      'line-width': 5,
      'line-dasharray': [0, 4, 3]
      // 'line-dasharray': [
      //   'match',
      //   ['get', 'connectivity'],
      //   0, ['solid'], // Valor cuando connectivity es 0
      //   1, [0, 4, 3], // Valor cuando connectivity es 1
      //   ['solid'] // Valor predeterminado si no se cumplen las condiciones anteriores
      // ]
    }
  }
  map.addLayer(throughtputLayer2D2);

  const dashArraySequence2D2 = [
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

  let step2d2 = 0;

  function animateDashArray2D2(timestamp) {
    const newStep = parseInt((timestamp / 50) % dashArraySequence2D2.length);

    if (newStep !== step2d2) {
      try{
        let layerExists = map.getLayer('line-throughtput2D2');
        if (layerExists) {
          map.setPaintProperty('line-throughtput2D2', 'line-dasharray', dashArraySequence2D2[step2]);
          // Puedes realizar operaciones adicionales aquí si la capa existe
        }   
      }catch(error){
        // console.log(error)
      }
      
      step2 = newStep;
    }

    // requestAnimationFrame(animateDashArray2);
  }

  animateDashArray2D2.bind(this)(0);
 
 if(!idCapaExistente('line-throughtput2D2')){
   setCapas((prevCapas) => ({
     ...prevCapas,
     [Object.keys(prevCapas).length ]: { show: true, name: 'Down Microonda',id:`line-throughtput2D2`,layer:throughtputLayer2D2 ,source:throughtputSource2D2,nivel:2},
   }));
 }
 map.on('mouseleave', 'line-throughtput2D2', (e) => {
  
  const popups = document.querySelectorAll('.custom-popup');

popups.forEach(popup => {

popup.remove();
});
  });
map.on('mouseenter', 'line-throughtput2D2', (e) => {
  // console.log(e.features[0].geometry.coordinates)
  const coordinates = calcularPuntoMedio(e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1])
// console.log(coordinates)
  //   const coordinates = e.features[0].geometry.coordinates.slice();
  

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  
  Popup= new mapboxgl.Popup({
    className: 'custom-popup',
    closeButton: false,
})
    .setLngLat(coordinates)
    
    .setHTML(`<div class='cont-pop' style='border: 1px solid ${e.features[0].properties.color_alineacion};'>
    <div>${e.features[0].properties.name}...</div>
    
    </div>`)
    .addTo(map);
});
          }else{
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


      
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

  // map.addSource('dot-point', {
  //   'type': 'geojson',
  //   'data': {
  //     'type': 'FeatureCollection',
  //     'features': [
  //       {
  //         'type': 'Feature',
  //         'geometry': {
  //           'type': 'Point',
  //           'coordinates': [0, 0]
  //         }
  //       }
  //     ]
  //   }
  // });

  // map.addLayer({
  //   'id': 'layer-with-pulsing-dot',
  //   'type': 'symbol',
  //   'source': 'dot-point',
  //   'layout': {
  //     'icon-image': 'pulsing-dot'
  //   }
  // });

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
    /************************************************************ CAPA Lineas ************************************************************************ */
    
    
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
      // // setMapInstance(map)
      
     
      
    })
   
    
    return () => map.remove();
  }, [markers]);
 
  
  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;

};


export default MapBox;
