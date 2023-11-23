import Action from '../Action'
import './styles/ModalAddMultiGraph.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import MenuSearch from './MenuSearch';
import { LineChart, Line,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ModalCreateCis =({server,flagTodos,flagGeneral,setFlagGeneral,generateColorOptions,indexSelected,opcionesTxtArrayFijo,color_graf,setTotalLineas,elementosToRender,dataInfo,closAddMultiGraphModal})=>{
const [disabled,setDisabled]=useState(true)
//     const [elementos, setElementos] = useState([]);
//     const [countElements, setCountElementos] = useState(1);

// console.log(countElements)
// const eliminarElemento = (indice) => {
//     console.log("eliminara: ",indice)
//     const nuevosElementos = elementos.filter((elemento, index) => index !== indice);
//     setElementos(nuevosElementos);
//   };
//     const handleClick = () => {
        
//         const nuevoElemento = (
//           <div key={countElements} className='content-menu-search'>
//             <div className='cont-numeric-menu'>
//               Línea {countElements}
//             </div>
//             <div className='cont-options-menu'>
//               <MenuSearch server={server} opciones={opciones} setOpciones={setOpciones} completo={false}></MenuSearch>
//             </div>
//             <div className='cont-action-menu'>
//             <div className='cont-img-field-delete-graf'>
//                   <img className='img-field-delete-graf' src='/iconos/delete.png' title='Eliminar'name='Eliminar'  onClick={() => eliminarElemento(countElements - 1)}  />
//                 </div>
//                         </div>
//           </div>
//         );
//     setCountElementos(countElements+1)
//         setElementos([...elementos, nuevoElemento]);
//       };
const [elementos, setElementos] = useState([]);

  const handleClick = () => {
    setElementos([...elementos, elementos.length + 1]);
    setTotalLineas(elementos.length+1)
    
    if(elementos.length+1>=1){
        setDisabled(false)
    }else{
        setDisabled(true)
    }
  };

  const eliminarElemento = (indice) => {
    const nuevosElementos = elementos.filter((elemento, index) => index !== indice);
    setElementos(nuevosElementos);
    console.log(elementos.length)
    if(elementos.length-1>=1){
        setDisabled(false)
    }else{
        setDisabled(true)
    }
  };
  
    return(

        <div className="modal-graf-content">
          <div className='cont-close-graf-modal'>
        <img
                        className='img-field-close-graf-modal'
                        src='/iconos/close.png'
                        title='Agregar'
                        name='Agregar'
                        onClick={closAddMultiGraphModal}
                      />
          </div>
          {(!flagTodos)?
            <div className='cont-list-graf'>
            <div className='compact-list-graf'>

            
          {dataInfo.data.metrics[indexSelected].indices.map((key, index) => (
                                  <>
                                  <div className='cont-row-graf'>
              <div className='cont-color-graf'>
                  <div className='square-color-graf' style={{background:color_graf[key]}}></div>
              </div>
              <div className='cont-name-graf'> {opcionesTxtArrayFijo.municipio[key-1]+' / '+opcionesTxtArrayFijo.tecnologia[key-1]+' / '+opcionesTxtArrayFijo.marca[key-1]+' / '+opcionesTxtArrayFijo.modelo[key-1]}</div>
              
            </div>
            <hr className='separate-rof-graf'></hr>
                                  </>
                                  ))}
          </div>
          
        </div>:
        <div className='cont-list-graf' style={{width:'14%'}}>
        <div className='compact-list-graf'>
              <div className='cont-option-todos'>
              <input defaultChecked={flagGeneral}   value={1} name="ce" type="checkbox" id={`show-general`} onClick={()=>setFlagGeneral(!flagGeneral)}  style={{width:'20px',height:'20px'}}/>
                <label htmlFor={`close-event`}>General</label>
              </div>
              
      </div>
      
    </div>
        } 
           <div className='cont-graf-disp-graf'>
                <div className='cont-info-graf'>
                    {/* <div className='cont-info-top'>

                    </div> */}
                    <div className='cont-info-center'>
                      <ResponsiveContainer width="100%" height="95%">
                              <LineChart
                                width={400}
                                height={200}
                                // data={dataInfo.data.metrics[0].dataset}
                                // data={dataInfo.data.metrics[indexSelected].dataset}
                                data={(flagGeneral)?dataInfo.data.metrics[indexSelected].dataset:dataInfo.data.metrics[indexSelected].dataset2}
                                // data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                {/* <XAxis dataKey="Tiempo" /> */}
                                <XAxis dataKey="Tiempo" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {/* <Line type="monotone" dataKey="Disponibilidad_1" stroke="#8884d8" strokeWidth={2}  /> */}
                                {/* <Area type="monotone" dataKey="Disponibilidad" fill="#8884d8" fillOpacity={0.3} /> */}
                                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
                                {
                                  (flagGeneral)?
                                  dataInfo.data.metrics[indexSelected].indices.map((key, index) => (
                                    <Line
                                    key={index}
                                      type="monotone"
                                      // dataKey={elementosToRender[index]}
                                      dataKey={"Disponibilidad_"+key}
                                      // stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
                                    // stroke={color_graf[index+1]}
                                    stroke={color_graf[key]}
                                    />
                                  ))
                                  :
                                  dataInfo.data.metrics[indexSelected].municipality.map((key, index) => (
                                    <Line
                                    key={index}
                                      type="monotone"
                                      // dataKey={elementosToRender[index]}
                                      dataKey={key}
                                      // stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
                                    // stroke={color_graf[index+1]}
                                    stroke={color_graf[((index+1)>50)?(index+1)-50:(index+1)]}
                                    // stroke={generateColorOptions()}
                                    />
                                  ))
                                  
                                }
                                {/* {
                                // (elementosToRender.length==1)?<Line type="monotone" dataKey="Disponibilidad" stroke="#8884d8" strokeWidth={2}  />:
                                dataInfo.data.metrics[indexSelected].indices.map((key, index) => (
                                  <Line
                                    key={index}
                                    type="monotone"
                                    dataKey={elementosToRender[index]}
                                    // stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
                                  stroke={color_graf[dataInfo.data.metrics[indexSelected].indices[index]]}
                                  />
                                ))} */}
                              </LineChart>
                              </ResponsiveContainer>
                        
                    </div>
                    <div className='cont-info-bottom'>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Funcionalidad Promedio:    </div>
                            {
                              (typeof dataInfo.data.metrics !== 'undefined')?
                                dataInfo.data.metrics[0].availability_average.map((key, index) => (
                                  // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                                  <div className='txt-info-dinamic' style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[0].availability_average[index]==="" ?0:dataInfo.data.metrics[0].availability_average[index].toFixed(2)))}%</div>
                                )):''}
                              
                               
                            
                            
                            {/* <div className='txt-info-dinamic' style={{color:'red'}}> &nbsp; {typeof dataInfo.data.general_funcionality_average === 'undefined'?'---':((dataInfo.data.general_funcionality_average===""?0:dataInfo.data.general_funcionality_average.toFixed(2)))}%</div> */}
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Lapso de tiempo:    </div>
                            {
                              (typeof dataInfo.data.metrics !== 'undefined')?
                              dataInfo.data.metrics[0].days.map((key, index) => (
                                // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                                <div className='txt-info-dinamic' style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[0].days[index]==="" ?0:dataInfo.data.metrics[0].days[index].toFixed(2)))}dias</div>
                              )):''}
                               {/* elementosToRender.map((key, index) => (
                               <div className='txt-info-dinamic' style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined'?'---':((dataInfo.data.metrics[0].days[index]==="" || index<=dataInfo.data.metrics[0].availability_average.length ?0:dataInfo.data.metrics[0].days[index].toFixed(2)))} dias</div>
                              ))} */}
                            {/* <div className='txt-info-dinamic' style={{color:'red'}}>&nbsp; {typeof dataInfo.data.days === 'undefined'?'---': (''+(dataInfo.data.days===""?0:dataInfo.data.days.toFixed(2))+' dias')}</div> */}
                        </div>
                        <div className='cont-text-info'>
                            <div className='txt-info-fijo'>Dispositivos:    </div>
                            {
                              (typeof dataInfo.data.metrics !== 'undefined')?
                              dataInfo.data.metrics[0].device_count.map((key, index) => (
                                // console.log(dataInfo.data.metrics[0].availability_average.length,index)
                                <div className='txt-info-dinamic' style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined' ?'---':((dataInfo.data.metrics[0].device_count[index]==="" ?0:dataInfo.data.metrics[0].device_count[index]))}</div>
                              )):''}
                            {/* {
                               elementosToRender.map((key, index) => (
                               <div className='txt-info-dinamic' style={{color:color_graf[index+1]}}> &nbsp; {typeof dataInfo.data.metrics === 'undefined'?'---':((dataInfo.data.metrics[0].device_count[index]==="" || index<=dataInfo.data.metrics[0].availability_average.length ?0:dataInfo.data.metrics[0].device_count[index].toFixed(2)))} dispositivos</div>
                              ))} */}
                            {/* <div className='txt-info-dinamic' style={{color:'red'}}>&nbsp; {dataInfo.data.device_count}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCreateCis