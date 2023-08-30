import './styles/InputAdmin.css'
import React, { useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
const InputAdmin=({titulo,name,value,handleChange,msgError,msgErrorActive})=>{
    
    
    
    const [inputValue, setInputValue] = useState('');

  
   
    return(
        
                <div className="user-box-input">
                                        <input required name={name}  type="text" value={value}
                                    onChange={handleChange} />
                                        <label className='label-input'>{titulo}</label>
                                        {   
                                            (true)?<span className='inpit-admin-msg-error'>{msgError}</span>:''
                                        }
                                        
            </div>
      
        
    )
}

export default InputAdmin