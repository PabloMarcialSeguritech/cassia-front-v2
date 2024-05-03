import './styles/Container.css'
const Container=({children,mode})=>{
    return(
        <div className={'container'+mode}> 
            {children}
        </div>
    )
}

export default Container