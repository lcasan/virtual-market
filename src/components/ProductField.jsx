import { useContext } from "react";
import { EditingContext } from "../context/EditingContex";

const ProductField = ({id, content, onChange}) => {
  const editing = useContext(EditingContext);
  const newContent = typeof content == 'object' ? content.props.children : content;
  
  return (
    <td>
      {!editing ? (
        <>{content}</>
      ) : (
        <input id={id} placeholder={newContent} onChange={onChange} />
      )}
    </td>
  );
};

export { ProductField };
