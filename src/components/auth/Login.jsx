import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  AlertaContext  from '../../context/alertas/alertasContext';
import  AuthContext  from '../../context/autenticacion/authContext';

const Login = props => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSession } = authContext;

    const [ usuario, setUsuario ] = useState({
        email: '',
        password: ''
    });
    
    useEffect(() => {
    const { mensaje, autenticado } = authContext;

        if(autenticado) props.history.push('/proyectos');
        
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria)
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history ]);

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }
   
    const onSubmit = e => {
        e.preventDefault();
        
        if( email.trim() === '' ||
            password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        iniciarSession({email, password});

    }

    const { email, password } = usuario;

    return (
        <div className='form-usuario'>
            {alerta ? <div className={`alerta alerta-${alerta.categoria}`}>{alerta.msg}</div> : null }
            <div className='contenedor-form'>
                <h1>Iniciar Session</h1>
                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            name='email'
                            id='email'
                            autoComplete='off'
                            placeholder='Ingrese Correo'
                            value={email} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Ingrese Password' 
                            value={password} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                            type='submit' 
                            className='btn btn-primario btn-block'
                            value='Iniciar Sesion'
                        />
                    </div>
                    <Link to={'./nueva-cuenta'} className='enlace-cuenta'>Obtener Cuenta</Link>
                </form>
            </div>
        </div>
    );
}
 
export default Login;