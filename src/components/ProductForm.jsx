import { useContext, useState } from "react";
import { FaSave } from "react-icons/fa";
import { EditingContext } from "../context/EditingContex";
import ProductField from "./ProductField";
import { DataContext } from "../context/DataContext";
const API_URL = import.meta.env.VITE_API_URL;

const ProductForm = ({ showForm }) => {
  const [type, setType] = useState("digital");
  const { _, setData } = useContext(DataContext);
  const [currentData, setCurrentData] = useState({
    code: "",
    name: "",
    price: "",
    type: "",
    shippingCost: "",
    downloadLink: ""
  });

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

  // Handle the creation of the new product
  const handleCreateProduct = (evt) => {
    // Delete attributes
    type == "digital"
      ? delete currentData.shippingCost
      : delete currentData.downloadLink;

    // Convert to JSON
    const jsonBody = JSON.stringify(currentData);

    // Send a POST request to the "/new" endpoint of the server
    fetch(`${API_URL}/new`, {
      method: "POST",
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
        setData((prev) => [...prev, json.data]);
      })
      .catch((error) => {
        console.error("Error in the request:", error);
      });

    showForm(false);
  };

  return (
    <EditingContext.Provider value={[true, type]}>
      <tr>
        {/* Product fields */}
        {Object.keys(currentData).map((key) => (
            <ProductField
              name={key}
              value={currentData[key]}
              onChange={handleChange}
            />
        ))}

        {/* Option: Save field data */}
        <td colSpan={3} onClick={handleCreateProduct}>
          <FaSave />
        </td>
        <td></td>
      </tr>
    </EditingContext.Provider>
  );
};

export { ProductForm };
