import { 
    OBTENER_TAREAS,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types';

//eslint-disable-next-line
export default (state, action) => {
    
    switch(action.type){

        case OBTENER_TAREAS:
            return {
                ...state,
                tareasproyecto: action.payload
            }

        case AGREGAR_TAREAS:
            return {
                ...state,
                tareasproyecto: [ action.payload, ...state.tareasproyecto ],
                errortarea: false
            }
            
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter( tarea => tarea._id !== action.payload)
            }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map( tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaSeleccionada: null
            }
        
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }

        default:
            return state;
    }

}