import { useReducer } from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import { 
    OBTENER_TAREAS,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaSeleccionada: null
    }

    //crear el dispat y state
    const [ state, dispatch ] = useReducer(tareaReducer, initialState);

    //obtener tareas
    const obtenerTareas = async proyecto => {

        try {

            const respuesta = await clienteAxios.get(`/api/tareas`, { params: {proyecto}});
            
            dispatch({  
                type: OBTENER_TAREAS,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }

       
    }

    const agregarTareas = async tarea => {

        try {

            const respuesta = await clienteAxios.post('/api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREAS,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error.response)
        }

        
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea
    const eliminarTarea = async (id, proyecto) => {

        try {

            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
            
        } catch (error) {
            console.log(error.response)
        }

       
    }

    const actualizarTarea = async tarea => {

        try {

            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTarea = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    return(
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTareas,
                validarTarea,
                eliminarTarea,
                guardarTarea,
                actualizarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;