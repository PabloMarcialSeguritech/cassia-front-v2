import React, { useState } from 'react';
import './styles/Paginador.css'
const Paginador = ({ pages,pageActual,setPageActual}) => {
  const [query, setQuery] = useState('');

  const paginaArray = Array.from({ length: pages }, (_, index) => index + 1);
const [startLimit,setStartLimit]=useState(0)
const [endLimit,setEndLimit]=useState(5)
  console.log(pageActual,startLimit,endLimit)
  
  
  const handleClick = (pagina) => {
    setPageActual(pagina);
    // Aquí podrías agregar alguna lógica adicional al hacer clic en una página
  };
  const nextPage =()=>{
    console.log('nextPage')
    if(pageActual<paginaArray.length){
        if(pageActual<5){
            setPageActual(parseInt(pageActual+1))
        }else{
            setStartLimit(parseInt(startLimit+1))
            setEndLimit(parseInt(endLimit+1))
            setPageActual(parseInt(pageActual+1))
            
        }
    }
    
  }
  const backPage=()=>{
    if(pageActual!=1){
        if(pageActual>(startLimit+1)){
            setPageActual(parseInt(pageActual-1))
        }else{
            setStartLimit(parseInt(startLimit-1))
            setEndLimit(parseInt(endLimit-1))
            setPageActual(parseInt(pageActual-1))
            
        }
    }
    
  }

  return (
    <ul className="pagination-2 tema-dark ">
  <li><a className="font-dark " href="#"  onClick={() => backPage()}>&laquo;</a></li>
  {paginaArray.slice(startLimit,endLimit).map((pagina) => (
        <li key={pagina} ><a className={'font-dark '+(pagina === pageActual ? "pageSelected" : "")} href="#"  onClick={() => handleClick(pagina)}>{pagina}</a></li>
      ))}

  {
    (paginaArray.length>5)? <li><a   className="font-dark " style={{pointerEvents:'none'}} href="#" disabled>...</a></li>:''
  }
  
  <li><a className="font-dark " href="#" onClick={() => nextPage()}>&raquo;</a></li>
</ul>
  );
}

export default Paginador;
