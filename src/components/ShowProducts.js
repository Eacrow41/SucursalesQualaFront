import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';
const ShowProducts = () => {
    const url = 'https://localhost:7265/api/sites';
    const [sucursales, setSucursales] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fecha_Creacion, setFecha_Creacion] = useState('');
    const [moneda, setMoneda] = useState('');
    
    useEffect(() => {
        getSucursales();
    },[]);

    const getSucursales = async () => {
        const respuesta = await axios.get(url);
        setSucursales(respuesta.data);
    }
    
 
    return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
                <div className='col-md-4 offset-4'>
                    <div className='d-grid mx-auto'>
                        <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalSucursales'>
                            <i className='fa-solid fa-circle-plus'>Nuevo</i>

                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Codigo</th>
                                    <th>Descripcion</th>
                                    <th>Direccion</th>
                                    <th>Identificacion</th>
                                    <th>Fecha Creacion</th>
                                    <th>Moneda</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                 sucursales.map((sucursal, i) =>(
                                     <tr key={sucursal.codigo}>
                                        <td>{i+1}</td>
                                        <td>{sucursal.codigo}</td>
                                        <td>{sucursal.descripcion}</td>
                                        <td>{sucursal.direccion}</td>
                                        <td>{sucursal.identificacion}</td>
                                        <td>{sucursal.fecha_Creacion}</td>
                                        <td>{sucursal.moneda}</td>
                                        <td>
                                            <button className='btn btn-warning'>
                                             <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            <button className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                     </tr>       
                                 ))   
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
      </div>
      <div id='modalSucursales' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
                <label className='h5'>Nueva Sucursal</label>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>                             
            </div>                        
          <div className='modal-body'>
               <input type='hidden' id='id'></input>
               <div className='input-group mb=3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='codigo' className='form-control' placeholder='Codigo' value={codigo} onChange={(e)=> setCodigo(e.target.value)}></input>
               </div>    
               &nbsp; 
               <div className='input-group mb=3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}></input>
               </div>   
               &nbsp;
               <div className='input-group mb=3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='direccion' className='form-control' placeholder='Direccion' value={direccion} onChange={(e)=> setDireccion(e.target.value)}></input>
               </div>               
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProducts
