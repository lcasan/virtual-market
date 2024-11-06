import { DataContext } from "./context/DataContext";
import { useState, useEffect } from "react";
import { Logo } from "./components/Logo";
import Table from "./components/Table";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [data, setData] = useState([]);
  
  // Get all products
  useEffect(() => {
    fetch(`${API_URL}/products`)
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
