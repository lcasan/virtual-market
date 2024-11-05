import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import "./Table.css";
import { Product } from "./Product";

const Table = () => {
  const data = useContext(DataContext);

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
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <Product product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
