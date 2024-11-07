import ProductField from "./ProductField";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import React, { useState, useRef, useContext, useCallback } from "react";
import { EditingContext } from "../context/EditingContex";
import { DataContext } from "../context/DataContext";
const API_URL = import.meta.env.VITE_API_URL;

const Product = ({ data }) => {
  const [currentData, setCurrentData] = useState(data);
  const [editing, setEditing] = useState(false);
  const [type, setType] = useState(data.type);

  // Context's variables 
  const {_, setData} = useContext(DataContext);

  // Handle change
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    
    // Set type
    (name == "type") && setType(value);

    // Update field
    setCurrentData(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  // Delete product
  const handleDelete = useCallback(() => {
    // Delete product in database
    fetch(`${API_URL}/delete?code=${data.code}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product successfully deleted");

          // Deleted product from the list of products
          setData((prev) => prev.filter((item) => item.code !== data.code));
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
  }, [data.code]);
  
  // Save product
  const handleSave = useCallback(() => {
    // Delete attributes
    type == "digital"
      ? currentData.shippingCost = null
      : currentData.downloadLink = null;

    // Convert to JSON
    const jsonBody = JSON.stringify(currentData);

    // Update the database product
    fetch(`${API_URL}/update/${data.code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: jsonBody,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            alert(errorData.message);
            throw new Error(
              `Error del servidor: ${response.status} ${response.statusText} - ${errorData.message}`
            );
          });
        }

        return response.json();
      })
      .then((json) => {
        console.log("Product successfully updated");
        // setData((prev) => 
        //   prev.filter((item) => (item.code == product.code ? json.data : item))
        // );
      })
      .catch((error) => {
        console.error("Error in the request:", error);
      });

    setEditing(false);
  }, [currentData]);

  return (
    <EditingContext.Provider value={[editing, type]}>
      <tr key={currentData.code} scope="row">
        {/* Product fields */}
        {Object.keys(currentData).map((key) => (
            <ProductField
              key={`${currentData.code}-${key}`}
              name={key}
              value={currentData[key]}
              onChange={handleChange}
            />
        ))}

        {/* Option: Edit field data */}
        <td
          onClick={() => {
            setEditing(true);
          }}
        >
          <FaEdit />
        </td>

        {/* Option: Save field data */}
        {editing ? (
          <td onClick={handleSave}>
            <FaSave />
          </td>
        ) : (
          <td>
            <FaSave style={{ opacity: 0.05 }} />
          </td>
        )}

        {/* Option: Delete field data */}
        <td onClick={handleDelete}>
          <FaTrash />
        </td>
      </tr>
    </EditingContext.Provider>
  );
};

export default React.memo(Product);
