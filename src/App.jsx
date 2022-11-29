import React from "react";
import AppClima from "./Components/AppClima";
import { ClimaProvider } from "./context/ClimaProvider";
const App = () => {
  return (
    <>
      <ClimaProvider>
        <header>
          <h1>Buscador de clima</h1>
        </header>
        <AppClima />
      </ClimaProvider>
    </>
  );
};

export default App;
