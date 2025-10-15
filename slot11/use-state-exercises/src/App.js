import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';


function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">useState Hook Exercises</h1>
      <CounterComponent />
      <hr />
      <LightSwitch />
      <hr />
      <LoginForm />
      <hr />
      <LoginForm2 />
      <hr />
      <SearchItem />
      <hr />
      <SearchAccount />
      <hr />
      <RegisterForm />
    </div>
  );
}

export default App;
