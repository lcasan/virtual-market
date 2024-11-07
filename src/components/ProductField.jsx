import React, { useContext } from "react";
import { EditingContext } from "../context/EditingContex";

const ProductField = ({ name, value, onChange }) => {
  // Context's variables
  let [ editing, type ] = useContext(EditingContext);

  // Change input values
  if (name == "downloadLink" && !editing) {
    value = <a href={value}> {value}</a>;
  }
  value == null && (value = "");

  // Change editing state
  if (
    name == "code" ||
    (name == "shippingCost" && type == "digital") ||
    (name == "downloadLink" && type == "físico")
  ) {editing = false};

  // Edition's element
  const editionElement =
    name == "type" ? (
      <select name={name} value={value} onChange={onChange}>
        <option value="digital">digital</option>
        <option value="físico">físico</option>
      </select>
    ) : (
      <input
        name={name}
        placeholder={value}
        type={name == "price" || name == "shippingCost" ? "number" : "text"}
        onChange={onChange}
      />
    );

  return <td>{!editing ? value : editionElement}</td>;
};

export default React.memo(ProductField);
