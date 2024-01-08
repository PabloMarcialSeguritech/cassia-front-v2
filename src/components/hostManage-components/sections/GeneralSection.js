
import Search from '../../generales/Search';
import './styles/GeneralSection.css'
import { useState ,useEffect} from 'react';
import Action from '../../Action';
import SelectorAdmin from '../../SelectorAdmin';
const GeneralSection =({dataHost,Proxy_list})=>{
   console.log(dataHost)
  console.log(dataHost)
  console.log(Proxy_list)

  const changeOption=(option,index)=>{
        
    console.log(option.value)
    // setCisData((prevState)=>{
    //     return {
    //         ...prevState,
    //         ['tech_id']:option.value===""?0:(parseInt(option.value))
    //     }
        
    // })
}
    // setCisRelation(option.value)
     
    return(
        <div className="general-section-content">
           <div className='row-info-general-section'> 
                <div className='left-content-row-general-section'>
                    <div className='txt-left-row-general-section'>
                        Host name:
                    </div>
                </div>
                <div className='rigth-content-row-general-section'>
                <input value={dataHost.host}/>
                </div>
           </div>
           <div className='row-info-general-section'> 
                <div className='left-content-row-general-section'>
                    <div className='txt-left-row-general-section'>
                        Templates:
                    </div>
                </div>
                <div className='rigth-content-row-general-section'>
                    <div className='cont-group-elements-general-section'>
                        <div className='top-cont-group-elements-general-section'>
                            <>
                            <Search></Search> 
                            <Action disabled={false} origen='Blanco' titulo='+ Agregar'  action={()=>{}}/>
                            </>
                        </div>
                        <div className='bottom-cont-group-elements-general-section'> 
                                {
                                    dataHost.parentTemplates.map((element,index)=>(
                                        <div className='glob-info-element-general-section'>
                                            <div style={{width:'15px'}}></div>
                                                {element.name}
                                                
                                                <div style={{width:'25px'}}></div>
                                                <img className='close-globe-element' src={'/iconos/close.png'} name="close" />
                                        </div>
                                    ))
                                }
                                
                        </div>
                    </div>
                </div>
           </div>
           <div className='row-info-general-section'> 
                <div className='left-content-row-general-section'>
                    <div className='txt-left-row-general-section'>
                        Host groups:
                    </div>
                </div>
                <div className='rigth-content-row-general-section'>
                    <div className='cont-group-elements-general-section'>
                        <div className='top-cont-group-elements-general-section'>
                        <>
                                <Search></Search> 
                                <Action disabled={false} origen='Blanco' titulo='+ Agregar'  action={()=>{}}/>
                                </>
                        </div>
                        <div className='bottom-cont-group-elements-general-section'> 
                                {
                                    dataHost.groups.map((element,index)=>(
                                        <div className='glob-info-element-general-section'>
                                            <div style={{width:'15px'}}></div>
                                                {element.name}
                                                
                                                <div style={{width:'25px'}}></div>
                                                <img className='close-globe-element' src={'/iconos/close.png'} name="close" />
                                        </div>
                                    ))
                                }
                        </div>
                    </div>
                </div>
           </div>
           <div className='row-info-general-section'> 
                <div className='left-content-row-general-section'>
                    <div className='txt-left-row-general-section'>
                        Descripción:
                    </div>
                </div>
                <div className='rigth-content-row-general-section'>
                    <div className='cont-group-elements-general-section'>
                        <textarea className='textArea-elements-general-section'></textarea>
                    </div>
                </div>
           </div>
           <div className='row-info-general-section'> 
                        <div className='cell-row-info-general-section'>
                        <div className='left-content-row-general-section'>
                            <div className='txt-left-row-general-section'>
                                Monitoreado por:
                            </div>
                        </div>
                        <div className='rigth-content-row-general-section'>
                        {
                            (Proxy_list.loading)?'...':<SelectorAdmin placeholder={'Seleccionar tecnología...'} opGeneral={true} txtOpGen={'TODOS'}  opt_de={4} origen={'Admin'} data={Proxy_list.data.data.result} loading={Proxy_list.loading}  titulo='Proxys' selectFunction={changeOption} index={0}></SelectorAdmin>
                        }
                        </div>
                        </div>   

                        <div className='cell-row-info-general-section'>
                        <div className='left-content-row-general-section'>
                            <div className='txt-left-row-general-section'>
                                Habilitado:
                            </div>
                        </div>
                        <div className='rigth-content-row-general-section' style={{justifyContent:'start'}}>
                        <input
                            required
                            name="status"
                            defaultChecked={true}
                            className='checkbox-cis'
                            type="checkbox"
                            value={true}
                            onChange={()=>{}}
                            />
                        </div>
                        </div>         
           </div>
        </div>
    )
}

export default GeneralSection