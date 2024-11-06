import React, { useContext } from "react";
import { EditingContext } from "../context/EditingContex";

const ProductField = ({id, content, active = true, onChange}) => {
  const editing = useContext(EditingContext);
  const newContent = typeof content == "object" ? content.props.children : content;
  const type = (id == "price" || id == "shippingCost") ? "number" : "text";

  return (
    <td>
      {!editing || !active ? (
        <>{content}</>
      ) : (
        <input id={id} type={type} placeholder={newContent} onChange={onChange}/>
      )}
    </td>
  );
};

export default React.memo(ProductField);
