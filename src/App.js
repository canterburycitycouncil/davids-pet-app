import logo from './logo.svg';
import './App.css';
import { AddPet } from './components/AddPet.tsx';
import { ListPets } from './components/ListPets.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <ListPets />
        <AddPet />
      </div>
    </div>
  );
}

export default App;
