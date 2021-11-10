import { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyecto/proyectoContext';
import AlertaContext from '../../context/alertas/alertasContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos, mensaje } = proyectosContext;

    useEffect(() => {

        if(mensaje)
            mostrarAlerta(mensaje.msg, mensaje.categoria);

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    if(proyectos.length === 0) return <p>No tienes Proyectos Creados!</p>;

    return ( 
        <ul className='listo-proyectos'>
            {alerta ? <div className={`alerta alerta-${alerta.categoria}`}>{alerta.msg}</div> : null }
            <TransitionGroup>
                {proyectos.map(proyecto => ((
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Proyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                )))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;