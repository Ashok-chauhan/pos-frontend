import { useRef, useState, useEffect } from "react";
import CenterModal from "../Components/CenterModal";
import postData, { getData, deleteData, editData } from "../utils/postData";
import * as CONFIG from "../utils/Configuration";

const Category = () => {
  const [getCategoryList, setCategoryList] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIdEdit, setCategoryIdEdit] = useState("");
  const [catEdit, setCatEdit] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [added, setAdded] = useState(false);

  const nameRef = useRef();

  useEffect(() => {
    categoryList();
  }, [categoryId, catEdit, added]);

  const deleteCategoryClickHandler = (event) => {
    setCategoryId(event.target.id);
    setIsLoadingForm(true);
    deleteData(CONFIG.URL + "/dashboard/category", { id: event.target.id })
      .then((data) => {
        console.log(data.success);
        setIsLoadingForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const categoryEditState = (state) => {
    setCatEdit(state);
  };
  const onHideModalHandler = () => {
    setModalShow(false);
  };

  const categoryNameChanged = (name) => {
    setCategoryName(name);
  };

  const onClickModalHandler = (event) => {
    setCategoryName(event.target.name);
    setCategoryIdEdit(event.target.id);
    setModalShow(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;

    if (!name || name === "") return false;
    setIsLoadingForm(true);
    postData(CONFIG.URL + "/dashboard/category", {
      name,
    })
      .then((data) => {
        setAdded(true);
        if (data.success) {
          nameRef.current.value = "";
        }
        setIsLoadingForm(false);
      })
      .catch((error) => {
        console.error(error);
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
        //console.log(data.categories); // JSON data parsed by `data.json()` call
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
          <div className="row p-2">
            <div
              className="border-bottom col-md-6"
              //onClick={deleteCategoryClickHandler}
              //id={category._id}
            >
              {category.name}
            </div>
            <div className="border-bottom  col-md-3">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={deleteCategoryClickHandler}
                id={category._id}
              >
                Delete
              </button>
            </div>

            <div className="border-bottom  col-md-3">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                variant="primary"
                onClick={onClickModalHandler}
                name={category.name}
                id={category._id}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      );
    });
  }

  return (
    <>
      <CenterModal
        show={modalShow}
        onHide={onHideModalHandler}
        categoryNameChanged={categoryNameChanged}
        catid={categoryIdEdit}
        ctname={categoryName}
        categoryEditState={categoryEditState}
      />
      <h2 className="text-center p-2">Add/Edit Category</h2>

      <div className="row m-0 ">
        <div className="col-md-4 p-3 mb-5 bg-body rounded">
          {isLoadingForm && (
            <span className="text-warning bg-light text-center spin"></span>
          )}

          {added && (
            <div className="alert alert-success" role="alert">
              Category created successfully!
            </div>
          )}
          <form>
            <label className="form-label" htmlFor="name">
              Category name
            </label>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
                ref={nameRef}
              />
            </div>

            {/* <!-- Submit button --> */}
            <div className="d-grid gap-2">
              {/* {isLoading && <p>Sending request...</p>} */}
              <button
                type="button"
                className="btn btn-secondary "
                onClick={submitHandler}
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-1 p-3  mb-5"></div>
        <div className="col-md-7 p-3  mb-5 bg-body rounded">{catList}</div>
      </div>
    </>
  );
};

export default Category;
