import { Product } from "./Product";

const ProductList = ({products}) => {
    return (
        products.map((product) => (
            <Product key={product.code} product={product} />
          ))
    )
};

export {ProductList};