function DetailCard(Props: any) {
  return (
    <>
      <div className="container mt-4 " style={{ maxWidth: "48rem" }}>
        <div className="card shadow-lg rounded-4 mb-4 border-0">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              {/* Image Section */}
              <div className="col-md-3 col-lg-3 col-xl-3 mb-3">
                <img
                  src={Props.img}
                  className="img-fluid rounded-3 shadow-sm"
                  alt={`${Props.name}`}
                  style={{
                    objectFit: "cover",
                    height: "110px",
                    width: "110px",
                  }}
                />
              </div>

              {/* Product Name Section */}
              <div className="col-md-3 col-lg-3 col-xl-3 mb-3">
                <p className="lead fw-bold mb-1">Nama Produk:</p>
                <h5 className="mb-2 text-dark">{Props.name}</h5>
              </div>

              {/* Quantity Section */}
              <div className="col-md-3 col-lg-3 col-xl-3 mb-3">
                <p className="lead fw-bold mb-1">Jumlah:</p>
                <h5 className="mb-2">{Props.quantity}</h5>
              </div>

              {/* Price Section */}
              <div className="col-md-3 col-lg-3 col-xl-3 mb-3">
                <p className="lead fw-bold mb-1">Harga:</p>
                <h5 className="mb-2">Rp. {Props.price}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailCard;
