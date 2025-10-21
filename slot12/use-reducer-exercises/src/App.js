import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import QuestionBanksApp from './components/QuestionBanksApp';

function App() {
return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">useReducer Hook Exercises</h1>
      <CounterComponent />
      <hr />
      <LightSwitch />
      <hr />
      <QuestionBank />
      <hr />
      <LoginForm />
      <hr />
      <LoginForm2 />
      <hr />
      <QuestionBanksApp />
    </div>
  );
}

export default App;
