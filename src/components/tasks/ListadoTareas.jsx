import { Fragment, useContext } from "react";
import Tarea from '../tasks/Tarea';
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;

    if(!proyecto) return <h2>Seleccione un proyecto</h2>;

    const [proyectoActual] = proyecto;

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className='listado-tareas'>
                <TransitionGroup>
                    {tareasproyecto.length === 0 
                    ? (<li className='tarea'><p>No hay Tareas!</p></li>)
                    : 
                        tareasproyecto.map( tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Tarea 
                                    key={tarea._id}
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => eliminarProyecto(proyectoActual._id)}
                >Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;