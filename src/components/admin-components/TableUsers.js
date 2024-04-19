import { useState,useEffect } from 'react'
import './styles/UsersAdmin.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import Selector from '../Selector'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import UserList from './UserList'
const TableUsers=(props)=>{
    return (
        
<div className='cont-table-users'>
                                    <div className='head-table-users'>
                                        <div className='field-head-table-users field-acciones'>
                                            Acciones
                                        </div>
                                        <div className='field-head-table-users field-nombre'>
                                            Nombre
                                        </div>
                                        <div className='field-head-table-users field-correo'>
                                            Correo
                                        </div>
                                        <div className='field-head-table-users field-rol'>
                                            Rol
                                        </div>
                                    </div>
                                    <div className='body-table-users'>
                                        {
                                            ( props.registerIsValid)?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
                                            <UserList server={props.server} handleChangEdit={props.handleChangEdit} setData={props.setData} setLoading={props.setLoading} setError={props.setError}></UserList>
                                        
                                          }
                                        
                                    </div>
                                </div>
    )
}

export default TableUsers