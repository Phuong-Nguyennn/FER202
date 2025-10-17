import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';

function App() {
return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">useReducer Hook Exercises</h1>
      <CounterComponent />
      <hr />
      <LightSwitch />
      <hr />
      <QuestionBank />
    </div>
  );
}

export default App;
