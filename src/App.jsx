import { DataContext } from "./context/DataContext";
import { useState, useEffect } from "react";
import { Logo } from "./components/Logo";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState([]);
  
  // Get all products
  useEffect(() => {
    fetch("http://localhost:8080/products")
    .then((response) => response.json())
    .then((product) => setData(product.data));
  }, []);

  return (
    <DataContext.Provider value={{data, setData}}>
      <main>
        <Logo/>
        <Table/>
      </main>  
    </DataContext.Provider>
  );
};

export default App;
