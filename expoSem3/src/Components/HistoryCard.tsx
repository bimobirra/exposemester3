import { Link } from "react-router-dom";
import { useAuth } from "../useAuth";

type HistoryCardProps = {
  orderNumber: number;
  history: any;
};

function HistoryCard({ orderNumber, history }: HistoryCardProps) {
  const { user } = useAuth();
  const dateString = history.date;
  const date = new Date(dateString);

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "80rem", width: "80%" }}
      >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-12 col-md-3">
              <small className="text-muted">Order</small>
              <h5 className="card-title">Order #{orderNumber}</h5>
            </div>
            <div className="col-12 col-md-3">
              <small className="text-muted">Date</small>
              <h5 className="card-title">{date.toLocaleDateString()}</h5>
            </div>
            <div className="col-12 col-md-3">
              <small className="text-muted">Status</small>
              {history.status === "Pending" ? (
                <div>
                  <span className="badge bg-danger">
                    <i className="fas fa-clock me-2">Pending</i>
                  </span>
                </div>
              ) : history.status === "Completed" ? (
                <span className="badge bg-success">
                  <i className="fas fa-check me-2"></i>Completed
                </span>
              ) : (
                <span className="badge bg-warning">
                  <i className="fas fa-truck me-2"></i>Shipping
                </span>
              )}
            </div>
            <div className="col-12 col-md-3">
              <small className="text-muted">Actions</small>
              <div>
                <Link
                  to={`/detail/${user?.userId}/${user?.cartId}/${history.order_DetailId}`}
                  className="btn btn-primary"
                >
                  Check
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
