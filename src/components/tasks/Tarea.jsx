import { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyecto/proyectoContext';

const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTarea } = tareasContext;

    const [proyectoActual] = proyecto;

    const handleClick = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    const cambiarEstadoTarea = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    const seleccionarTarea = tarea => {
        guardarTarea(tarea);
    }

    return ( 
        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>
            <div className='estado'>
            {tarea.estado
                ?   (
                        <button
                            type='button'
                            className='completo'
                            onClick={ () => cambiarEstadoTarea(tarea) }
                        >Completo</button>
                    )
                :   (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={ () => cambiarEstadoTarea(tarea) }
                        >Incompleto</button>
                    )
            }
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={ () => seleccionarTarea(tarea) }
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={ () => handleClick(tarea._id) }
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;