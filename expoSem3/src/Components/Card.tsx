import { Link } from "react-router-dom";

function Card(props: any) {
  return (
    <div className="mt-4 d-inline-block">
      <div className="card d-inline-block mx-3" style={{ width: "18rem" }}>
        <img
          src={props.img}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "275px", maxWidth: "290px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Rp {props.price}</p>
          <div className="text-center">
            <Link
              to={`/product/${props.productId}`}
              className="btn btn-outline-secondary"
            >
              Get your own
            </Link>
            <a href="#" className=""></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
