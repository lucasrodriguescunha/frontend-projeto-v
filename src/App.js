import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import { ButtonExample } from './components/button';

function App() {
  return (
    <PrimeReactProvider>
      <div>
        <h1>Teste</h1>
        <ButtonExample>Teste</ButtonExample>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
