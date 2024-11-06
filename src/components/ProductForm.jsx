import { useContext, useState } from "react";
import { FaSave } from "react-icons/fa";
import { EditingContext } from "../context/EditingContex";
import ProductField from "./ProductField";
import { DataContext } from "../context/DataContext";

import "./ProductForm.css";

const productModel = {
  name: "",
  price: 0,
  type: "digital",
  shippingCost: 0,
  downloadLink: "",
};

const ProductForm = ({ setShowCreateForm }) => {
  const [isDigital, setIsDigital] = useState(true);
  const { _, setData } = useContext(DataContext);
  const [newProduct, setNewProduct] = useState(productModel);

  const handleSelect = (evt) => {
    const { value } = evt.target;
    newProduct.type = value;
    value === "digital" ? setIsDigital(true) : setIsDigital(false);
  };

  const handleFormChange = (evt) => {
    const { id, value } = evt.target;
    setNewProduct({
      ...newProduct,
      [id]: value,
    });
    console.log(JSON.stringify(newProduct));
  };

  // Handle the creation of the new product
  const handleCreateProduct = (evt) => {
    // Delete attribute
    const product = newProduct;
    isDigital ? delete product.shippingCost : delete product.downloadLink;

    // Convert to JSON
    const jsonBody = JSON.stringify(product);

    // Send a POST request to the "/new" endpoint of the server at localhost:8080
    fetch("http://localhost:8080/new", {
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
      })
      .then((json) => {
        setData((perv) => [...perv, json.data]);
      });

    setNewProduct(productModel);
    setShowCreateForm(false);
  };

  return (
    <EditingContext.Provider value={true}>
      <tr>
        <td></td>
        {Object.keys(newProduct).map((key) => {
          if (key == "code") {
            return <td key={`${newProduct.code}-${key}`}>{newProduct.code}</td>;
          } else if (key == "type") {
            return (
              <td key={`${newProduct.code}-${key}`}>
                <select name="type" id="type" onChange={handleSelect}>
                  <option value="digital">digital</option>
                  <option value="físico">físico</option>
                </select>
              </td>
            );
          } else {
            const active =
              (isDigital && key != "shippingCost") ||
              (!isDigital && key != "downloadLink");

            return (
              <ProductField
                key={`${newProduct.code}-${key}`}
                active={active}
                id={key}
                content={newProduct[key]}
                onChange={handleFormChange}
              />
            );
          }
        })}
        <td colSpan={3} onClick={handleCreateProduct}>
          <FaSave />
        </td>
        <td></td>
      </tr>
    </EditingContext.Provider>
  );
};

export { ProductForm };
