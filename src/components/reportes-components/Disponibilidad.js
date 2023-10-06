
import { useState,useEffect } from 'react'
import './styles/disponibilidad.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import SelectorAdmin from '../SelectorAdmin'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { LineChart, Line,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MenuSearch from './MenuSearch'
import ModalAddMultiGraph from './ModalAddMultiGraph'
// import UserList from './UserList'
const AddMultiGraphModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'70%',
    height:'70%',
    padding:'20px'
  },
};
const Disponibilidad=({server})=>{
  const color_graf={
    1:"#c680ff",
    2:"#80cfff",
    3:"#56e1ad"
  }
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      rv:3400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      rv: 2398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      rv: 5400,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      rv: 3100,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      rv: 2300,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      rv: 3400,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      rv: 2400,
      amt: 2100,
    },
  ];
  const countArray=[
    [],
    ['uv' ],
    ['uv', 'pv'],
    ['uv', 'pv', 'rv'],
  ]
  console.log(countArray)
  const obtenerPrimerDiaDelMes = () => {
    const hoy = new Date();
    const primerDiaDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    const anio = primerDiaDelMes.getFullYear();
    const mes = String(primerDiaDelMes.getMonth() + 1).padStart(2, '0');
    const dia = String(primerDiaDelMes.getDate()).padStart(2, '0');
    const horas = String(primerDiaDelMes.getHours()).padStart(2, '0');
    const minutos = String(primerDiaDelMes.getMinutes()).padStart(2, '0');
  
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
  };
  const obtenerFechaActualLocal = () => {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // El mes se cuenta desde 0
    const dia = String(ahora.getDate()).padStart(2, '0');
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
  
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
  };
    const [dataInfo,setDataInfo]=useState({data:[],loading:true,error:null})
    const [opciones,setOpciones]=useState({municipio:0,tecnologia:11,marca:0,modelo:0,fecha_ini:''+obtenerPrimerDiaDelMes(),fecha_fin:''+obtenerFechaActualLocal()})
    const token_item=localStorage.getItem('access_token')
    const [AddMultiGraphModalOpen, setAddMultiGraphModalOpen] =useState(false);
    const [totalLienas,setTotalLineas] =useState(1)
    const [seriesKeys,setSeriesKeys]=useState([])
    const [seriesToRender,setSeriesToRender]=useState([])
    console.log("total de lineas ",totalLienas)
    const add = () => {
      // Aquí puedes realizar la búsqueda usando el valor de 'query'
      // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
      setAddMultiGraphModalOpen(true)
    }
    function closAddMultiGraphModal() {
      
      setAddMultiGraphModalOpen(false);
      console.log("mostrara:",totalLienas)
      console.log(countArray[totalLienas])
      setSeriesKeys(countArray[totalLienas]) // Define las claves de las series

      search_reporte_disponibilidad()
    }
    useEffect(()=>{
      setSeriesToRender(seriesKeys.filter(key => data.some(item => item[key])));
      console.log(seriesKeys.filter(key => data.some(item => item[key]))) // Filtra solo las series que tienen valores
      
    },[seriesKeys])
console.log(dataInfo.data)
useEffect(()=>{
  setSeriesKeys(countArray[totalLienas]) 
  search_reporte_disponibilidad()
},[])
const Buscar=()=>{
  search_reporte_disponibilidad()
}
function search_reporte_disponibilidad(){
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin)
  setDataInfo({data:dataInfo.data,loading:true,error:dataInfo.error})
    const fetchData = async () => {
      try {
     const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/reports/availability?municipality_id='+opciones.municipio+'&tech_id='+opciones.tecnologia+'&brand_id='+opciones.marca+'&model_id='+opciones.modelo+'&init_date='+opciones.fecha_ini+'&end_date='+opciones.fecha_fin, {                 
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token_item}`,
                            },
                          });
                          console.log(response)
        if (response.ok) {
          const response_data = await response.json();
          console.log(totalLienas)
          
      
          setTotalLineas(1)
          setSeriesKeys(countArray[totalLienas]) 
          setDataInfo({data:response_data.data,loading:false,error:dataInfo.error})
        console.log(dataInfo)
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        // Manejo de errores
        setDataInfo({data:dataInfo.data,loading:dataInfo.loading,error:error})
        //console.error(error);
      }
    };
    fetchData();
}
   
      const handleChangeOption=()=>{}
      
      const generateColor = (progress) => {
        const purple = [128, 0, 128]; // Morado
        const blue = [0, 0, 255]; // Azul
        const green = [0, 128, 0]; // Verde
      
        let color;
      
        if (progress <= 0.5) {
          // En la primera mitad de la escala, interpolamos de morado a azul
          const factor = progress / 0.5;
          color = [
            Math.round(purple[0] + (blue[0] - purple[0]) * factor),
            Math.round(purple[1] + (blue[1] - purple[1]) * factor),
            Math.round(purple[2] + (blue[2] - purple[2]) * factor),
          ];
        } else {
          // En la segunda mitad de la escala, interpolamos de azul a verde
          const factor = (progress - 0.5) / 0.5;
          color = [
            Math.round(blue[0] + (green[0] - blue[0]) * factor),
            Math.round(blue[1] + (green[1] - blue[1]) * factor),
            Math.round(blue[2] + (green[2] - blue[2]) * factor),
          ];
        }
      
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      };
      
      // Uso
      const progress = 0.5;
    return (
      <>
        <div className="main-reporte-disp">
        <div className='cont-list-graf'>
          <div className='compact-list-graf'>

          
        {seriesToRender.map((key, index) => (
                                 <>
                                 <div className='cont-row-graf'>
             <div className='cont-color-graf'>
                <div className='square-color-graf' style={{background:color_graf[index+1]}}></div>
             </div>
             <div className='cont-name-graf'> todos/suscrip/todas/todos</div>
             
          </div>
          <hr className='separate-rof-graf'></hr>
                                 </>
                                ))}
         </div>
        </div>
            <div className='cont-reporte-disp'>
            <div className='cont-menu-disp'>
                <MenuSearch completo={true} server={server} opciones={opciones} setOpciones={setOpciones} action1={Buscar} action2={add}></MenuSearch>
            </div>
            
            <div className='cont-graf-disp'>
                <div className='cont-info-graf'>
                    {/* <div className='cont-info-top'>

                    </div> */}
                    <div className='cont-info-center'>
                      {
                            (dataInfo.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
                              <ResponsiveContainer width="100%" height="95%">
                              <LineChart
                                width={500}
                                height={300}
                                // data={dataInfo.data.metrics[0].dataset}
                                data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                {/* <XAxis dataKey="Tiempo" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {/* <Line type="monotone" dataKey="Disponibilidad" stroke="#8884d8" strokeWidth={2}  /> */}
                                {/* <Area type="monotone" dataKey="Disponibilidad" fill="#8884d8" fillOpacity={0.3} /> */}
                                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
                                {seriesToRender.map((key, index) => (
                                  <Line
                                    key={index}
                                    type="monotone"
                                    dataKey={key}
                                    // stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
                                  stroke={color_graf[index+1]}
                                  />
                                ))}
                              </LineChart>
                              </ResponsiveContainer>
                        }
                    </div>
                    <div className='cont-info-bottom'>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Funcionalidad Promedio:    </div>
                            <div className='txt-info-dinamic' style={{color:'red'}}> &nbsp; {typeof dataInfo.data.general_funcionality_average === 'undefined'?'---':((dataInfo.data.general_funcionality_average===""?0:dataInfo.data.general_funcionality_average.toFixed(2)))}%</div>
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Lapso de tiempo:    </div>
                            <div className='txt-info-dinamic' style={{color:'red'}}>&nbsp; {typeof dataInfo.data.days === 'undefined'?'---': (''+(dataInfo.data.days===""?0:dataInfo.data.days.toFixed(2))+' dias')}</div>
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Dispositivos:    </div>
                            <div className='txt-info-dinamic' style={{color:'red'}}>&nbsp; {dataInfo.data.device_count}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cont-table-disp'>
            <div className='bodyInfoTable'>
                  <div className='contTableDisp'>
                    {/* <div className='contCheckDisp'>
                    <div className='space' style={{height:'20%'}}> </div>
                    <div style={{height:'24%'}}>
                        <input name="radio" type="radio" className="checkTableDisp" defaultChecked onClick={()=>handleChangeOption(2)} />
                    </div>
                    <div style={{height:'24%'}}>
                        <input name="radio" type="radio" className="checkTableDisp" defaultChecked onClick={()=>handleChangeOption(2)} />
                    </div>
                    <div style={{height:'24%'}}>
                        
                    </div>
                     </div> */}
                    <div className='contInfoDisp'>
                      <div className='infoDisp'>
                        <div className='titlesInfoDisp'>
                        <div className='headerCellDisp' style={{width:'5%'}}>
                            <div className='txtHeaderCellDisp'>
                                {/* IP */}
                                
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'25%'}}>
                            <div className='txtHeaderCellDisp' >
                                Métrica
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'25%'}}>
                            <div className='txtHeaderCellDisp'>
                                Disponibilidad promedio
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'20%'}}>
                            <div className='txtHeaderCellDisp'>
                                {/* IP */}
                                Días
                            </div>
                          </div>
                          <div className='headerCellDisp' style={{width:'25%'}}>
                            <div className='txtHeaderCellDisp'>
                                Dispositivos
                            </div>
                          </div>
                          
                        </div>
                        <div className='rowInfoDisp'>
                            <div className='DispInfoCell' style={{width:'5%'}}>
                              <input name="radio" type="radio" className="checkTableDisp" defaultChecked onClick={()=>handleChangeOption(2)} />
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                
                                <div className='txtDispInfoCell' >
                                Conectividad
                                
                                </div> 
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                {typeof dataInfo.data.general_funcionality_average === 'undefined'?'---':(dataInfo.data.general_funcionality_average.toFixed(2))}%
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'20%'}}>
                                <div className='txtDispInfoCell'>
                                {typeof dataInfo.data.days === 'undefined'?'---': (''+(dataInfo.data.days===""?0:dataInfo.data.days.toFixed(2))+' dias')}
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                {dataInfo.data.device_count}
                                </div>
                            </div>
                  
                        </div>
                        {(opciones.tecnologia===110)?
                          <div className='rowInfoDisp'>
                        <div className='DispInfoCell' style={{width:'5%'}}>
                              <input name="radio" type="radio" className="checkTableDisp"  onClick={()=>handleChangeOption(2)} />
                            </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              
                              <div className='txtDispInfoCell' >
                              Alineacion
                              
                              </div> 
                          </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              <div className='txtDispInfoCell'>
                              98%
                              </div>
                          </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              <div className='txtDispInfoCell'>
                              {typeof dataInfo.data.days === 'undefined'?'---': (''+dataInfo.data.days.toFixed(2)+' dias')}
                              </div>
                          </div>
                          <div className='DispInfoCell' style={{width:'25%'}}>
                              <div className='txtDispInfoCell'>
                              {dataInfo.data.device_count}
                              </div>
                          </div>
                
                      </div>
                      :''
                        }
                        
                        {/* <div className='rowInfoDisp'>
                        
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                
                                <div className='txtDispInfoCell' >
                                Velocidad
                                
                                </div> 
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                98%
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                6
                                </div>
                            </div>
                            <div className='DispInfoCell' style={{width:'25%'}}>
                                <div className='txtDispInfoCell'>
                                356
                                </div>
                            </div>
                  
                        </div> */}
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
            </div>
        </div>
        <Modal
        isOpen={AddMultiGraphModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closAddMultiGraphModal}
        style={AddMultiGraphModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalAddMultiGraph server={server} opciones={opciones} setOpciones={setOpciones} closAddMultiGraphModal={closAddMultiGraphModal} totalLienas={totalLienas} setTotalLineas={setTotalLineas}></ModalAddMultiGraph>
    </Modal>
        </>
    )
}

export default Disponibilidad