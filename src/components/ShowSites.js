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
    const [fecha_creacion, setFecha_creacion] = useState('');
    const [moneda, setMoneda] = useState('');
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState('');
    useEffect(() => {
        getSucursales();
    },[]);
   

    const getSucursales = async () => {
        const respuesta = await axios.get(url);
        setSucursales(respuesta.data);
    }
    

    const openModal = (op, codigo, descripcion, direccion, identificacion, fecha_creacion, moneda) => {

        setCodigo('');
        setDescripcion('');
        setDireccion('');
        setIdentificacion('');
        setFecha_creacion('');
        setMoneda('');
        setOperation(op);
        if(op === 1){
            setTitle('Nueva Sucursal');
        }
        else if (op === 2){
            setTitle('Modificar Sucursal');
            setCodigo(codigo);
            setDescripcion(descripcion);
            setDireccion(direccion);
            setIdentificacion(identificacion);
            setFecha_creacion(fecha_creacion);
            setMoneda(moneda);
        }
        window.setTimeout(function(){
            document.getElementById('codigo').focus();
        }, 500);
    }

    const validar = () =>{
        var parametros;
        var metodo;
        var url;
        if(codigo === ''){
            show_alert('Escribe el codigo de la sucursal', 'warning');
        }
        else if(descripcion.trim() === ''){
            show_alert('Escribe la descripcion de la sucursal', 'warning');
        } 
        else if(direccion.trim() === ''){
            show_alert('Escribe la direccion de la sucursal', 'warning');
        }
        else if(identificacion.trim() === ''){
            show_alert('Escribe la identificacion de la sucursal', 'warning');
        }
        else if(fecha_creacion === ''){
            show_alert('Escribe la fecha de creacion de la sucursal', 'warning');
        }
        else if(moneda.trim() === ''){
            show_alert('Escribe la moneda de la sucursal', 'warning');
        }
        else {
            if( operation === 1){
                parametros = {codigo:codigo, descripcion: descripcion.trim(), 
                             direccion:direccion.trim(), identificacion:identificacion.trim(),
                             fecha_creacion:fecha_creacion, moneda:moneda.trim()};
                metodo = 'POST';
                url = 'https://localhost:7265/api/sites';
            }
            else {
                parametros = {codigo:codigo, descripcion: descripcion.trim(), 
                    direccion:direccion.trim(), identificacion:identificacion.trim(),
                    fecha_creacion:fecha_creacion, moneda:moneda.trim()};
                metodo = 'PUT';
                url = 'https://localhost:7265/api/sites/'+codigo;
            }
            enviarSolicitud(metodo, parametros, url);
        }
    }
 
    const enviarSolicitud = async(metodo, parametros, url) => {
        console.log(parametros);
        await axios({ method:metodo, url:url, data:parametros}).then(function(respuesta){
           
            var tipo = respuesta.data.success;
            var msj = respuesta.data.message;
            if(tipo === true){
                show_alert(msj, 'success');
                document.getElementById('btnCerrar').click();
                getSucursales();
            }
        }).catch(function(error){
            show_alert('Error en la solicitud', 'error')
            console.log(error);
        })
    }

    const deleteSucursal = (id, descripcion) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Seguro desea eliminar el registro '+descripcion+' ?',
            icon: 'question', text:'La eliminacion no es reversible.',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                setCodigo(id);
                var url = 'https://localhost:7265/api/sites/'+id;
                enviarSolicitud('DELETE', {codigo:id}, url );
            }
            else {
                show_alert('El producto No fue eliminado', 'info');
            }
        })
    }

    return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
                <div className='col-md-4 offset-4'>
                    <div className='d-grid mx-auto'>
                        <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalSucursales'>
                            <i className='fa-solid fa-circle-plus'> Nuevo</i>

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
                                        <td>{sucursal.fecha_creacion}</td>
                                        <td>{sucursal.moneda}</td>
                                        <td>
                                            <button onClick={()=> openModal(2, sucursal.codigo, sucursal.descripcion, sucursal.direccion, sucursal.identificacion, sucursal.fecha_Creacion, sucursal.moneda)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalSucursales'>
                                             <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            <button onClick={()=>deleteSucursal(sucursal.codigo, sucursal.descripcion)} className='btn btn-danger'>
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
                <label className='h5'>{title}</label>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>                             
            </div>                        
          <div className='modal-body'>
               <input type='hidden' id='id'></input>
               <div className='input-group mb=3'>
                <span className='input-group-text'><i class="fa-solid fa-hashtag"></i></span>
                <input type='text' id='codigo' className='form-control' placeholder='Codigo' value={codigo} onChange={(e)=> setCodigo(e.target.value)}></input>
               </div>    
               &nbsp; 
               <div className='input-group mb=3'>
                <span className='input-group-text'><i class="fa-solid fa-audio-description"></i></span>
                <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion} onChange={(e)=> setDescripcion(e.target.value)}></input>
               </div>   
               &nbsp;
               <div className='input-group mb=3'>
                <span className='input-group-text'><i class="fa-solid fa-location-dot"></i></span>
                <input type='text' id='direccion' className='form-control' placeholder='Direccion' value={direccion} onChange={(e)=> setDireccion(e.target.value)}></input>
               </div>
               &nbsp; 
               <div className='input-group mb=3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='identificacion' className='form-control' placeholder='Identificacion' value={identificacion} onChange={(e)=> setIdentificacion(e.target.value)}></input>
               </div>    
               &nbsp; 
               <div className='input-group mb=3'>
                <span className='input-group-text'><i class="fa-regular fa-calendar"></i></span>
                <input type='datetime-local' id='fecha_Creacion' className='form-control' placeholder='dd-mm-yyyy' value={fecha_creacion} onChange={(e)=> setFecha_creacion(e.target.value)}></input>
               </div>   
               &nbsp;
               <div className='input-group mb=3'>
                <span className='input-group-text'><i class="fa-solid fa-dollar-sign"></i></span>
                <input type='text' id='moneda' className='form-control' placeholder='Moneda' value={moneda} onChange={(e)=> setMoneda(e.target.value)}></input>
               </div>
               &nbsp;
               <div className='d-grid cil-6 mx-auto'>
                    <button onClick={() => validar()} className='btn btn-success'>
                        <i className='fa-solid fa-floppy-disk'></i> Guardar
                    </button>
               </div>     
               <div className='modal-footer'>
                <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'> Cerrar</button>
               </div>           
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProducts
