import './styles/Action.css'

const Action=({titulo,origen,action,disabled})=>{
    return(
        <div className='menuActionOption'>
            <div className='compactAction'>
                
                <button  className={(origen!=='Login'  && origen!=='Red' && origen!=='Blanco' && origen!=='Cancelar' && origen!=='Green' ?'buttonAction':'')+' act'+origen+' '+(disabled?'actDisabled':'')} onClick={action} >{titulo}</button>
            </div>
        </div>
    )
}

export default Action