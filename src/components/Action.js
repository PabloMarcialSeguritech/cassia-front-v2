import './styles/Action.css'

const Action=({titulo,origen,action,disabled})=>{
    return(
        <div className='menuActionOption'>
            <div className='compactAction'>
                
                <button  className={(origen!=='Login'?'buttonAction':'')+' act'+origen+' '+(disabled?'actDisabled':'')} onClick={action} >{titulo}</button>
            </div>
        </div>
    )
}

export default Action