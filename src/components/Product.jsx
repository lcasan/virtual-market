import { ProductField } from "./ProductField";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useState, useRef, useContext } from "react";
import { EditingContext } from "../context/EditingContex";
import { DataContext } from "../context/DataContext";

const Product = ({ product }) => {
  const { _ , setData } = useContext(DataContext);
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
  const handleDelete = () => {
    // Delete product in database
    fetch(`http://localhost:8080/delete?code=${product.code}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product successfully deleted");

          // Deleted product from the list of products
          setData((prev) => prev.filter((item) => item.code !== product.code));
        }
      })
      .catch((error) => console.error("Error in the request:", error));
  };

  // Save product
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
          setData((prev) => 
            prev.map((product) => 
                product.code == updatedProduct.current.code ? updatedProduct.current : product
            )
          );
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
        {/* Product fields */}
        <td>{product.code}</td>
        {
          Object.keys(product).map((key) => {
          let content = product[key];
          if (key == "shippingCost") {content = product.shippingCost ? product.shippingCost : "N/A";}

          if (key == "downloadLink") {
            content = product.downloadLink ? (
              <a href={product.downloadLink} className="more">
                {product.downloadLink}
              </a>
            ) : "N/A";
          }

          return (
            key != "code" && (
              <ProductField
                key={`${product.code}-${key}`}
                id={key}
                content={content}
                onChange={handleChange}
              />
            )
          );
          })
        }

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

export { Product };
