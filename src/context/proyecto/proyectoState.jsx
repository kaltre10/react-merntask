import { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import  { 
            FORMULARIO_PROYECTO,
            OBTENER_PROYECTOS,
            AGREGAR_PROYECTO,
            VALIDAR_FORMULARIO,
            PROYECTO_ACTUAL,
            ELIMINAR_PROYECTO,
            ERROR_PROYECTO
} from '../../types';

import clienteAxios from '../../config/axios';

const proyectos = [];

const ProyectoState = props => {

    const initialState = {
        proyectos,
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

    //mostrar formulario
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {
        try {

            const respuesta = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: respuesta.data
            })
            
        } catch (error) {
            const alerta = { 
                msg: error.response.data.msg,
                categoria: 'error'
            }
            
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
        
    }

    const agregarProyecto = async proyecto => {

        try {

            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
            
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data
            });
        } catch (error) {

            const alerta = { 
                msg: error.response.data.errors[0].msg,
                categoria: 'error'
            }
            
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
            return
        }

        
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = proyectoID => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoID
        })
    }
    
    const eliminarProyecto = async proyectoID => {

        try {

            await clienteAxios.delete(`/api/proyectos/${proyectoID}`)

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoID
            })

        } catch (error) {
            const alerta = { 
                msg: error.response.data.msg,
                categoria: 'error'
            }
            
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
        
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;