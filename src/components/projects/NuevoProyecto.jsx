import { Fragment, useState, useContext } from "react";
import ProyectoContext from '../../context/proyecto/proyectoContext';

const NuevaProyecto = () => {

    const proyectosContext = useContext(ProyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    const [ proyecto, setProyecto ] = useState({
        nombre: ''
    });

    const {nombre} = proyecto;

    const onchange = e =>{
        setProyecto({ [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(nombre === '') {
            mostrarError();
            return;
        }
            
        agregarProyecto(proyecto);
        setProyecto({nombre: ''});

    }

    return ( 
        <Fragment>
            <button
                type='button'
                className='btn btn-primario btn-block'
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>

            {formulario
            ?(
                <form 
                    className='formulario-nuevo-proyecto'
                    onSubmit={onSubmit}
                >
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nuevo Proyecto'
                        value={nombre}
                        name='nombre'
                        autoComplete='off'
                        onChange={onchange}
                    />
                    
                    <input 
                        type="submit" 
                        className='btn btn-primario btn-block'
                        value='Agregar Proyecto'
                    />
                </form>
             )
            : null}
            { errorformulario
                ? <p className='mensaje error'>El nombre del Proyecto es obligatorio</p>
                : null }
        </Fragment>
     );
}
 
export default NuevaProyecto;