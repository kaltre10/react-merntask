import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/projects/Proyectos';
import ProyectoState from "./context/proyecto/proyectoState";
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertasState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from './components/rutas/rutaPrivada';

const token = localStorage.getItem('token');
if(token) tokenAuth(token);

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                <RutaPrivada exact path='/proyectos' component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
