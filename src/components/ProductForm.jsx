import { useContext, useState } from "react";
import { FaSave } from "react-icons/fa";
import { EditingContext } from "../context/EditingContex";
import { ProductField } from "./ProductField";
import { DataContext } from "../context/DataContext";

const productModel = {
    name: "",
    price: "",
    type: "",
    shippingCost: "",
    downloadLink: "",
}

const ProductForm = ({setShowCreateForm}) => {
    const {data, setData} = useContext(DataContext);
    const [newProduct, setNewProduct] = useState(productModel);

    // Create product
    const handleFormChange = (evt) => {
        const {id, value} = evt.target;
        setNewProduct({ 
            ...newProduct, 
            [id]: value 
        });
    };

    // Handle the creation of the new product
    const handleCreateProduct = (evt) => {
        // Convert to JSON
        const jsonBody = JSON.stringify(newProduct);
        
        console.log(jsonBody);
        console.log(jsonBody.name);
        // Send a POST request to the "/new" endpoint of the server at localhost:8080
        fetch("http://localhost:8080/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonBody,
        })
        .then((response) => {
            if (response.ok) {
                console.log("Product successfully created");
                setData(prev => [...prev, newProduct]);
            } else {
                console.error("Error creating the product");
            }
        })
        .catch((error) => console.error("Error in the request:", error));

        setNewProduct(productModel);
        setShowCreateForm(false);
    };

    return (
        <EditingContext.Provider value={true}>
            <tr>
                <td>{newProduct.code}</td>
                {Object.keys(newProduct).map((key) => (
                    key !== "code" && (
                        <ProductField 
                            key={key}
                            id={key}
                            name={key}
                            value={newProduct[key]}
                            onChange={handleFormChange}
                        />
                    )
                ))}
                <td colSpan={3} onClick={handleCreateProduct}>
                    <FaSave />
                </td>
                <td></td>
            </tr>
        </EditingContext.Provider>
    );
};

export { ProductForm };
