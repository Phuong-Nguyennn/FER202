import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import QuestionBanksApp from './components/QuestionBanksApp';
import RegisterForm from './components/RegisterForm';
import ModalComponent from './components/modalComponent';

function App() {
return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">useReducer Hook Exercises</h1>
      <CounterComponent />
      <hr />
      <LightSwitch />
      <hr />
      <LoginForm />
      <hr />
      <RegisterForm />
      <hr />
      <QuestionBanksApp />
      <hr />
      <ModalComponent />
    </div>
  );
}

export default App;
