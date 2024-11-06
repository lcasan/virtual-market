import Product from "./Product";

import React from "react";
const ProductList = ({products}) => {
    return (
        products.map((product) => (
            <Product key={product.code} product={product} />
          ))
    )
};

export default React.memo(ProductList);