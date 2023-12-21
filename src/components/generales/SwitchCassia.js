import React, { useState } from 'react';
import './styles/SwitchCassia.css'
const SwitchCassia = ({ accion,elemento,active}) => {
  
  
  const accionarSwitch=()=>{
    accion(elemento)
  }
   
  
  return (
    <label class="switch-cassia">
                    <input defaultChecked={active} type="checkbox" onClick={accionarSwitch}/>
                    <div class="slider-switch-cassia"></div>
                    <div class="slider-card-switch-cassia">
                      <div class="slider-card-face-switch-cassia slider-card-front-switch-cassia"></div>
                      <div class="slider-card-face-switch-cassia slider-card-back-switch-cassia"></div>
                      
                    </div>
    </label>
  );
}

export default SwitchCassia;
