import { Logo } from "./components/Logo";
import { Table } from "./components/Table";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
    .then((response) => response.json())
    .then((product) => setProducts(product.data));
  }, []);

  return (
    <>
      <Logo/>
      <Table products={products}/>
    </>
  );
}

export default App;
