import { DataContext } from "../context/DataContext";
import { ProductList } from "./ProductList";
import { NotProduct } from "./NotProduct";
import { ProductForm } from "./ProductForm";
import { useContext, useState } from "react";
import "./Table.css";

const Table = () => {
  const { data } = useContext(DataContext);
  const [search, setSearch] = useState(""); // Search term
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Filter:
  const handleSearch = (evt) => {
    setSearch(evt.target.value.toLowerCase());
  };

  const searchResult = data.filter((product) => {
    return product.name.toLowerCase().includes(search); // Search by name
  });

  return (
    <div className="table-container">
      <table className="table custom-table">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Tipo</th>
            <th scope="col">Costo de envío</th>
            <th scope="col">Link de descarga</th>
            <th colSpan={2}>
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Buscar producto..."
              />
            </th>
            <th>
              <button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Cancelar" : "Crear Producto"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Form for create product */}
          {showCreateForm && <ProductForm setShowCreateForm={setShowCreateForm}/> }

          {/* List products search results */}
          {searchResult.length > 0 ? <ProductList products={searchResult}/> : <NotProduct/>}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
