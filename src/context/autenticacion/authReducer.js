import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESSION
} from '../../types';

//eslint-disable-next-line
export default (state, action) => {
    switch(action.type){

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
            }

        case CERRAR_SESSION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                mensaje: action.payload,
                token: null,
                autenticado: null,
                usuario: null,
                cargando: false
            }    

        default:
            return state;
    }
}