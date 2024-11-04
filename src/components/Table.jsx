import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./Table.css";

const Table = ({products, handleDelete}) => {
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
          {products.map((product) => (
            <tr key={product.code} scope="row">
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.type == "physical" ? "Físico" : "Digital"}</td>
              <td>
                {product.shippingCost > 0 ? <>{product.shippingCost}</> : "N/A"}
              </td>
              <td>
                {product.downloadLink ? (
                  <a href={product.downloadLink} className="more">
                    {product.downloadLink}
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td><FaEdit/></td>
              <td onClick={() => handleDelete(product.code)}><FaTrash/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
