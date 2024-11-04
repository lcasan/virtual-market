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

  const handleDelete = (code) => {
    // Delete product in database
    fetch(`http://localhost:8080/delete?code=${code}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if(response.ok) {
        // Deleted product from the list of products
        setProducts((prevProducts) => prevProducts.filter(product => product.code !== code));
      }
    });
  };

  return (
    <>
      <Logo/>
      <Table products={products} handleDelete={handleDelete}/>
    </>
  );
};

export default App;
