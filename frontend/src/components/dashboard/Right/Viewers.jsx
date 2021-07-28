import React,{useContext} from 'react'
import './Viewers.scss'
import { UserContext } from '../../../context/UserContextProvider'


export default function Viewers() {

  const context = useContext(UserContext);

  console.log(context);

  return (
        <div>
          Viewers  
        </div>
    )
}
