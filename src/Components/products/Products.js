import React, { useState, useEffect } from "react";
import postData, { getData } from "../../utils/postData";
import * as CONFIG from "../../utils/Configuration";
const Products = (props) => {
  const [products, setProducts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState("");

  const clickHandler = (e) => {
    //e.revent.preventDefault();
    props.productName(e.target.textContent);
    setProductId(e.target.id);
  };

  const getProducts = () => {
    props.productName("");
    let url;

    if (props.categoryId === undefined || props.categoryId === null) {
      url = CONFIG.URL + "/product"; // all products
    } else {
      url = CONFIG.URL + "/product/" + props.categoryId; // product categorywise
    }
    setIsLoading(true);
    getData(url).then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, [props.categoryId]);

  let productList;
  if (products.length > 0) {
    productList = products.map((product) => {
      return (
        <>
          {!productId.includes(product._id) && (
            <div
              className="bg-light border border-secondary rounded-1 m-2 p-2 w-25 product "
              role="button"
              key={product._id}
              id={product._id}
              onClick={clickHandler}
            >
              {product.name}
            </div>
          )}
          {productId.includes(product._id) && (
            <div
              className="border bg-success text-white rounded-1 m-2 p-2 w-25 product"
              role="button"
              id={product._id}
              key={product._id}
              onClick={clickHandler}
            >
              {product.name}
            </div>
          )}
        </>
      );
    });
  }

  return (
    <>
      <div className="col d-flex flex-wrap justify-content-between">
        {isLoading && (
          <span className="text-warning bg-light text-center spin"></span>
        )}
        {products.length > 0 ? productList : "No proudcts"}
      </div>
    </>
  );
};

export default Products;
