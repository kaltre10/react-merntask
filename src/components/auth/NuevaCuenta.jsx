import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertasContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = props => {

    //extraer context alerta
    const alertasContext = useContext(AlertasContext);
    const { alerta, mostrarAlerta } = alertasContext;

    //extraer context auth
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    const [ usuario, setUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    useEffect(() => {

        if(autenticado) props.history.push('/proyectos');

        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);

    },[mensaje, autenticado, props.history, mostrarAlerta])

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const { nombre, email, password, confirmar } = usuario;

    const onSubmit = e => {
        e.preventDefault();

        //verificar input vacios
        if( nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === ''){
                mostrarAlerta('Todos los campos son obligatorios', 'error');
                return;
        }

        if( password.length < 6 ){
            mostrarAlerta('La contraseña debe tener minimo 6 caracteres', 'error');
            return;
        }
        
        //verificar password
        if( password !== confirmar ){
            mostrarAlerta('La consaseña no coincide', 'error');
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        })

    }


    return (
        <div className='form-usuario'>
            { alerta ? (<div className={`alerta alerta-${alerta.categoria}`}>{alerta.msg}</div>)  : null }
            <div className='contenedor-form'>
                <h1>Crear Cuenta</h1>
                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input 
                            type='text'
                            name='nombre'
                            id='nombre'
                            autoComplete='off'
                            placeholder='Ingrese Nombre' 
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
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
                            autoComplete='off'
                            placeholder='Ingrese Password' 
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='confirmar'>Confirmar Password</label>
                        <input 
                            type='password'
                            name='confirmar'
                            id='confirmar'
                            autoComplete='off'
                            placeholder='Repite Password'
                            value={confirmar} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                            type='submit' 
                            className='btn btn-primario btn-block'
                            value='Crear Cuenta'
                        />
                    </div>
                    <Link to={'./'} className='enlace-cuenta'>Iniciar Sesion</Link>
                </form>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;