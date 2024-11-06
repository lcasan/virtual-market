import ProductField from "./ProductField";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import React, { useState, useRef, useContext, useCallback } from "react";
import { EditingContext } from "../context/EditingContex";
import { DataContext } from "../context/DataContext";
const API_URL = import.meta.env.VITE_API_URL;

const Product = ({ product }) => {
  const { _, setData } = useContext(DataContext);
  const [editing, setEditing] = useState(false);
  const updatedProduct = useRef({ ...product });

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    updatedProduct.current = {
      ...updatedProduct.current,
      [id]: value,
    };
  };

  // Update product
  const handleUpdate = () => {
    setEditing(true);
  };

  // Delete product
  const handleDelete = useCallback(() => {
    // Delete product in database
    fetch(`${API_URL}/delete?code=${product.code}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product successfully deleted");

          // Deleted product from the list of products
          setData((prev) => prev.filter((item) => item.code !== product.code));
        } else {
          response.json().then((errorData) => {
            alert(errorData.message);
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText} - ${errorData.message}`
            );
          });
        }
      })
      .catch((error) => console.error("Error in the request:", error));
  }, [product.code]);

  // Save product
  const handleSave = useCallback(() => {
    // Convert to JSON
    const jsonBody = JSON.stringify(updatedProduct.current);

    // Update the database product
    fetch(`${API_URL}/update/${product.code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: jsonBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            alert(errorData.message);
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText} - ${errorData.message}`
            );
          });
        }
      })
      .then((json) => {
        console.log("Product successfully updated");

        // Actualiza el estado con el producto modificado
        setData((prev) =>
          prev.map((product) =>
            product.code === updatedProduct.current.code
              ? updatedProduct.current
              : product
          )
        );
      })
      .catch((error) => console.error("Error in the request:", error));

    setEditing(false);
  }, [product.code, updatedProduct.current]);

  return (
    <EditingContext.Provider value={editing}>
      <tr key={product.code} scope="row">
        {/* Product fields */}
        <td>{product.code}</td>
        {Object.keys(product).map((key) => {
          let content = product[key];
          let active = true;
          const isDigital = product.type == "digital";

          if (key == "shippingCost") {
            content = product.shippingCost ? product.shippingCost : "N/A";
            if (isDigital) {
              active = false;
            }
          }

          if (key == "downloadLink") {
            content = product.downloadLink ? (
              <a href={product.downloadLink} className="more">
                {product.downloadLink}
              </a>
            ) : (
              "N/A"
            );

            if (!isDigital) {
              active = false;
            }
          }

          return (
            key != "code" && (
              <ProductField
                active={active}
                key={`${product.code}-${key}`}
                id={key}
                content={content}
                onChange={handleChange}
              />
            )
          );
        })}

        {/* Edit, save and delete operations */}
        <td onClick={handleUpdate}>
          <FaEdit />
        </td>
        {editing ? (
          <td onClick={handleSave}>
            <FaSave />
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

export default React.memo(Product);
