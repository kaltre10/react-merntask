import { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyecto/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //state tarea
    const [ tarea, setTarea ]= useState({
        nombre: ''
    });

    const { nombre } = tarea;

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { errortarea, agregarTareas, validarTarea, obtenerTareas, tareaSeleccionada, actualizarTarea } = tareasContext;

    useEffect(() => {
        (() => {
            if(tareaSeleccionada){
                setTarea(tareaSeleccionada);
            }  
        })();
    }, [ tareaSeleccionada ]);

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;  

    const handleChange = e => {
        setTarea({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
        //pasar validacion
        if(tareaSeleccionada == null){
            //agregar nueva tarea al state tareas
            tarea.proyecto = proyectoActual._id;
            agregarTareas(tarea);
        }else{
            tareaSeleccionada.nombre = tarea.nombre;
            actualizarTarea(tareaSeleccionada);
        }
      
        obtenerTareas(proyectoActual._id);

        //reiniciar form
        setTarea({ nombre: '' });

    }

    return ( 
        <div className='formulario'>
            <form
                onSubmit={ handleSubmit }
            >
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={ handleChange }
                    />
                </div>
                <div className='contenedor-input'>
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errortarea 
                ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p>
                : null
            }
        </div>
     );
}
 
export default FormTarea;