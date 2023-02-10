import { Link } from "react-router-dom";
const Home = (props) => {
  return (
    <>
      <div className="row p-4 bg-white">
        <div className=" offset-md-2 col-sm-12 col-md-4 ">
          <img src={props.Desktop} className="rounded float-start img-fluid" />
        </div>

        <div className=" col-sm-12 col-md-4 ">
          <h1 className="text-left text-md-left text-muted">
            Restaurant POS software to manage your business
          </h1>
          <p className="lead text-muted">
            Pinga POS manages all your operations efficiently so that you can
            focus on growing your brand
          </p>
          <Link to="/register">
            <button type="button" className="btn btn-warning">
              Get started for free!
            </button>
          </Link>
        </div>
      </div>

      <div className="row  p-3 bg-white">
        <div className=" col-sm-12 col-md-3  ">
          <figure className="figure">
            <img
              src={props.Cafe}
              className="figure-img img-fluid rounded product"
              alt="Cafe"
            />
            <figcaption className="figure-caption text-center">
              <h3>Cafe</h3>
            </figcaption>
          </figure>
        </div>
        <div className=" col-sm-12 col-md-3 ">
          <figure className="figure">
            <img
              src={props.FoodTruck}
              className="figure-img img-fluid rounded product"
              alt="Food Truck"
            />
            <figcaption className="figure-caption text-center">
              <h3>Food Truck</h3>
            </figcaption>
          </figure>
        </div>
        <div className=" col-sm-12 col-md-3 ">
          {/* <img
            src={props.Restorent}
            className="rounded float-start img-fluid img-thumbnail"
          /> */}
          <figure className="figure">
            <img
              src={props.Restorent}
              className="figure-img img-fluid rounded product"
              alt="Restaurant"
            />
            <figcaption className="figure-caption text-center">
              <h3>Restaurant</h3>
            </figcaption>
          </figure>
        </div>
        <div className=" col-sm-12 col-md-3 ">
          {/* <img
            src={props.Fruits}
            className="rounded float-start img-fluid  img-thumbnail"
          /> */}

          <figure className="figure">
            <img
              src={props.Fruits}
              className="figure-img img-fluid rounded product"
              alt="Fruits / Juices"
            />
            <figcaption className="figure-caption text-center">
              <h3>Fruits/Juices</h3>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Home;
