import Action from '../Action'
import './styles/ModalAddMultiGraph.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import MenuSearch from './MenuSearch';
const ModalCreateCis =({server,opciones,setOpciones,totalLineas,setTotalLineas,closAddMultiGraphModal})=>{
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
        <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-addGraph'>
                    <div className='title-head-card-users'>
                        Agregar Graficas
                    </div>
                    
                </div>
                <div className='content-card-addGraph' style={{overflowY: 'scroll',scrollbarWidth: 'thin'}}>
                {elementos.map((elemento, index) => (
        <div key={index} className='content-menu-search'>
          <div className='cont-numeric-menu'>
            Línea {index+1}
          </div>
          <div className='cont-options-menu'>
            <MenuSearch server={server} opciones={opciones} setOpciones={setOpciones} completo={false}></MenuSearch>
          </div>
          <div className='cont-action-menu'>
            <div className='cont-img-field-delete-graf'>
              <img
                className='img-field-delete-graf'
                src='/iconos/delete.png'
                title='Eliminar'
                name='Eliminar'
                onClick={() => eliminarElemento(index)}
              />
            </div>
          </div>
        </div>
      ))}
                    {/* <div className='content-menu-search'>
                        <div className='cont-numeric-menu'>
                        Liena 1
                        </div>
                        <div className='cont-options-menu'>
                        <MenuSearch server={server} opciones={opciones} setOpciones={setOpciones} completo={false}></MenuSearch>
                        </div>
                        <div className='cont-action-menu'>
                            borrar
                        </div>
                    </div> */}
                    
                    

                </div>
                <div className='content-bottom-addGraph'>
                <Action disabled={false} origen='Blanco' titulo='+'  action={handleClick}/>
                <Action disabled={disabled} origen='Login' titulo='Buscar'  action={closAddMultiGraphModal}/>  
                </div>
                </div>
        </div>
    )
}

export default ModalCreateCis