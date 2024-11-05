import { ProductField } from "./ProductField";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useState, useRef } from "react";
import { EditingContext } from "../context/EditingContex";

const Product = ({ product }) => {
  const [editing, setEditing] = useState(false);
  const updatedProduct = useRef({ ...product });

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    updatedProduct.current = {
      ...updatedProduct.current,
      [id]: value,
    };
  };

  const handleUpdate = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    // Delete product in database
    fetch(`http://localhost:8080/delete?code=${product.code}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product successfully deleted");

          // Deleted product from the list of products
          // setDataProduct((prevProducts) => prevProducts.filter(product => product.code !== code));
        }
      })
      .catch((error) => console.error("Error in the request:", error));
  };

  const handleSave = () => {
    // Convert to JSON
    const jsonBody = JSON.stringify(updatedProduct.current);

    // Update the database product
    fetch(`http://localhost:8080/update/${product.code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: jsonBody,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product successfully updated");
        } else {
          console.error("Error updating the product");
        }
      })
      .catch((error) => console.error("Error in the request:", error));

    setEditing(false);
  };

  return (
    <EditingContext.Provider value={editing}>
      <tr key={product.code} scope="row">
        <td>{product.code}</td>
        <ProductField id="name" name={product.name} onChange={handleChange} />
        <ProductField id="price" name={product.price} onChange={handleChange} />
        <ProductField id="type" name={product.type} onChange={handleChange} />
        <ProductField
          id="shippingCost"
          name={product.shippingCost ? product.shippingCost : "N/A"}
          onChange={handleChange}
        />
        <ProductField
          id="downloadLink"
          code={product.code}
          name={
            product.downloadLink ? (
              <a href={product.downloadLink} className="more">
                {product.downloadLink}
              </a>
            ) : (
              "N/A"
            )
          }
          onChange={handleChange}
        />

        <td onClick={handleUpdate}>
          {" "}
          <FaEdit />{" "}
        </td>
        {editing ? (
          <td onClick={handleSave}>
            <FaSave/>
          </td>
        ) : (
          <td>
            <FaSave style={{ opacity: 0.05 }} />
          </td>
        )}
        <td onClick={handleDelete}>
          <FaTrash />
        </td>
      </tr>
    </EditingContext.Provider>
  );
};

export { Product };
