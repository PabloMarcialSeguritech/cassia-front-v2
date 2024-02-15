import React, { useState } from 'react';
import './styles/SwitchCassia.css'
const SwitchCassia = ({ accion,elemento,active}) => {
  
  
  const accionarSwitch=()=>{
    accion(elemento)
  }
   
  
  return (
    <label className="switch-cassia">
                    <input defaultChecked={active} type="checkbox" onClick={accionarSwitch}/>
                    <div className="slider-switch-cassia"></div>
                    <div className="slider-card-switch-cassia">
                      <div className="slider-card-face-switch-cassia slider-card-front-switch-cassia"></div>
                      <div className="slider-card-face-switch-cassia slider-card-back-switch-cassia"></div>
                      
                    </div>
    </label>
  );
}

export default SwitchCassia;
