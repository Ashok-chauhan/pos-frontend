import { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import * as CONFIG from "../utils/Configuration";
import { editData } from "../utils/postData";
const CenterModal = (props) => {
  //console.log("inside f > " + JSON.stringify(props));

  const [catname, setCatname] = useState(props.ctname);

  const categoryNameChanged = (event) => {
    event.preventDefault();
    setCatname(event.target.value);
  };

  if (props.show === false) {
    props.categoryEditState(true);
  }
  useEffect(() => {
    props.categoryNameChanged(catname);
    editCat();
    props.categoryEditState(false);
  }, [catname]);

  const editCat = () => {
    if (catname.length > 2) {
      editData(CONFIG.URL + "/dashboard/category", {
        id: props.catid,
        name: catname,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label className="form-label" htmlFor="catname">
            Category name
          </label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="ctname"
              name="ctname"
              className="form-control"
              required
              value={props.ctname}
              onChange={categoryNameChanged}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.onHide}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CenterModal;
