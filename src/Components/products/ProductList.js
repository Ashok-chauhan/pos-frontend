import React, { useState, useEffect } from "react";
import postData, { getData, deleteData } from "../../utils/postData";
import * as CONFIG from "../../utils/Configuration";
const ProductList = (props) => {
  const [products, setProducts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [opp, setOpp] = useState(false);

  const clickHandler = (e) => {
    //e.revent.preventDefault();

    setProductId(e.target.id);
    setIsLoading(true);
    deleteData(CONFIG.URL + "/product", { id: e.target.id })
      .then((data) => {
        setIsLoading(false);
        setOpp(true);
        if (data.result) {
          setTimeout(() => {
            setOpp(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProducts = () => {
    let url;

    url = CONFIG.URL + "/product"; // all products

    setIsLoading(true);
    getData(url).then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, [productId, props.added]);

  let productList;
  if (products.length > 0) {
    productList = products.map((product) => {
      return (
        <>
          <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.unit}</td>
            <td>{product.code}</td>
            <td>{product.notes}</td>
            <td
              role="button"
              className="text-danger"
              key={product._id}
              id={product._id}
              onClick={clickHandler}
            >
              DELETE
            </td>
          </tr>
        </>
      );
    });
  }

  return (
    <>
      <div className="col-md-12 ">
        <h4 className="text-center">Products</h4>
        {isLoading && (
          <span className="text-warning bg-light text-center spin"></span>
        )}

        {opp && (
          <div className="alert alert-success" role="alert">
            Product Deleted successfully!
          </div>
        )}
        {/* {products.length > 0 ? productList : "No proudcts"} */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Unit</th>
              <th scope="col">Code</th>
              <th scope="col">Notes</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{products.length > 0 ? productList : "No proudcts"}</tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
