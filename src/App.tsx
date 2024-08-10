import { PrimeReactProvider } from 'primereact/api';
import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';

function App() {


  return (
    <>
      <PrimeReactProvider>
        <div className="card flex justify-content-center">
          <Button label="Check" icon="pi pi-check" />
        </div>
      </PrimeReactProvider>
    </>
  )
}

export default App
