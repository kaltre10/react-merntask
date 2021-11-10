import { useReducer } from 'react';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';
import alertasReducer from './alertasReducer';
import alertaContext from './alertasContext';

const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertasReducer, initialState);

    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 5000);
    }

    return(
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;