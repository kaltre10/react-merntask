import { useContext } from 'react';
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    const seleccionarProyecto = proyectoId => {
        proyectoActual(proyectoId);
        obtenerTareas(proyectoId);
    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-black'
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;