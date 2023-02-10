import { useRef, useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import postData, { getData, deleteData, editData } from "../utils/postData";
import * as CONFIG from "../utils/Configuration";
import ProductList from "../Components/products/ProductList";
const Product = () => {
  const [getCategoryList, setCategoryList] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [code, setCode] = useState("");
  const [note, setNote] = useState("");
  const [sort, setSort] = useState("");
  const [register, setRegister] = useState("");
  const [tax, setTax] = useState("");
  const [added, setAdded] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    categoryList();
  }, []);

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const priceChange = (e) => {
    setPrice(e.target.value);
  };
  const unitChange = (e) => {
    setUnit(e.target.value);
  };
  const codeChange = (e) => {
    setCode(e.target.value);
  };
  const noteChange = (e) => {
    setNote(e.target.value);
  };
  const sortChange = (e) => {
    setSort(e.target.value);
  };
  const taxChange = (e) => {
    setTax(e.target.value);
  };
  const registerChange = (e) => {
    setRegister(e.target.value);
  };
  const onChangeCategoryHandler = (event) => {
    setCategoryId(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoadingForm(true);
    postData(CONFIG.URL + "/product", {
      name,
      category: categoryId,
      price,
      unit,
      code,
      notes: note,
      register,
      sort_order: sort,
      tax_group: tax,
    })
      .then((data) => {
        if (data.success) {
          setAdded(true);
          setName("");
          setPrice("");
          setUnit("");
          setCode("");
          setNote("");
          setTax("");
          setSort("");
          setRegister("");
        }
        setIsLoadingForm(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };
  const categoryList = () => {
    getData(CONFIG.URL + "/dashboard/category")
      .then((data) => {
        //setIsLoadingForm(false);

        setCategoryList(data);
        // JSON data parsed by `data.json()` call
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let catList;
  if (getCategoryList) {
    catList = getCategoryList.categories.map((category) => {
      return (
        <>
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        </>
      );
    });
  }

  return (
    <>
      <div className="row m-0">
        <h3 className="text-center">Manage Products</h3>
        <div className="col-md-4 mt-2  bg-body rounded">
          <h4 className="text-center">Add product</h4>
          <div>
            <p>Select category</p>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onChangeCategoryHandler}
            >
              {catList}
            </select>
          </div>
          <div className="p-1 mb-3 bg-body rounded">
            <form>
              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product name"
                  className="form-control border border-warning"
                  required
                  value={name}
                  onChange={nameChange}
                />
              </div>
              <div className="form-outline mb-1 ">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Price"
                  className="form-control border border-warning"
                  required
                  value={price}
                  onChange={priceChange}
                />
              </div>
              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  placeholder="Unit"
                  className="form-control border border-warning"
                  required
                  value={unit}
                  onChange={unitChange}
                />
              </div>

              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Code / SKU"
                  className="form-control"
                  value={code}
                  onChange={codeChange}
                />
              </div>
              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="note"
                  name="note"
                  placeholder="Notes"
                  className="form-control"
                  value={note}
                  onChange={noteChange}
                />
              </div>
              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="sort_order"
                  name="sort_order"
                  placeholder="Sort order"
                  className="form-control"
                  value={sort}
                  onChange={sortChange}
                />
              </div>
              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="register"
                  name="register"
                  placeholder="Register"
                  className="form-control"
                  value={register}
                  onChange={registerChange}
                />
              </div>
              <div className="form-outline mb-1">
                <input
                  type="text"
                  id="tax_group"
                  name="tax_group"
                  placeholder="Tax group"
                  className="form-control"
                  value={tax}
                  onChange={taxChange}
                />
              </div>
              {/* <!-- Submit button --> */}
              {isLoadingForm && (
                <span className="text-warning bg-light text-center spin"></span>
              )}
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-secondary "
                  onClick={submitHandler}
                >
                  Create product
                </button>
              </div>
              {added && (
                <div className="alert alert-success" role="alert">
                  Product added successfully!
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-md-1 "></div>
        <div className="col-md-7 mt-2  mb-5 bg-body rounded">
          <ProductList added={added} />
        </div>
      </div>
    </>
  );
};

export default Product;
