import { useContext } from "react";
import { EditingContext } from "../context/EditingContex";

const ProductField = ({id, name, onChange}) => {
  const editing = useContext(EditingContext);
  const content = typeof name == 'object' ? name.props.children : name;
  
  return (
    <td>
      {!editing ? (
        <>{name}</>
      ) : (
        <input id={id} placeholder={content} onChange={onChange} />
      )}
    </td>
  );
};

export { ProductField };
