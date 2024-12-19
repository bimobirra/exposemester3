import { useState } from "react";

function CartItem(Props: any) {
  const [quantityTemp, setQuantityTemp] = useState(Props.quantity);

  const handleIncrement = () => {
    setQuantityTemp(quantityTemp + 1);
  };

  const handleDecrement = () => {
    if (quantityTemp > 1) {
      setQuantityTemp(quantityTemp - 1);
    }
  };

  const handleUpdate = () => {
    Props.onUpdate(Props.id, quantityTemp);
  };

  const handleDelete = () => {
    Props.onDelete(Props.id)
  }
  return (
    <>
      <section className="h-100">
        <div className="container h-100 ">
          <div className="card rounded-3 mb-4">
            <div className="card-body p-4">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src={Props.img}
                    className="img-fluid rounded-3"
                    alt={`${Props.name}`}
                    style={{ maxHeight:"110px", maxWidth:"110px" }}
                  />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                  <p className="lead fw-normal mb-2">{Props.name}</p>
                </div>
                <div className="col-md-2 col-lg-3 col-xl-2 d-flex">
                  <button
                    className="btn secondary"
                    onClick={handleDecrement}
                  >
                    <strong>-</strong>
                  </button>
                  <input
                    id="form1"
                    min="0"
                    name="quantity"
                    type="number"
                    value={quantityTemp}
                    onChange={(e) => setQuantityTemp(Number(e.target.value))}
                    className="form-control form-control-xs"
                    style={{ maxWidth: "4rem" }}
                  />
                  <button
                    className="btn secondary"
                    onClick={handleIncrement}
                  >
                    <strong>+</strong>
                  </button>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 className="mb-0">Rp. {Props.price}</h5>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 d-flex">
                  <button
                    onClick={handleUpdate}
                    className="btn btn-outline-warning"
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-outline-danger mx-3"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartItem;
