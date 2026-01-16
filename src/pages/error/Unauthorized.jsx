import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/App";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setRole } = useContext(AuthContext);

  const handleLoginAgain = () => {
    // Clear authentication state
    setIsLoggedIn(false);
    setRole(null);

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <section className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="col-lg-6 text-center p-5 shadow bg-white rounded">
        <h1 className="text-danger fw-bold mb-3">403</h1>
        <h4 className="mb-3">Unauthorized Access</h4>

        <p className="text-muted mb-4">
          You do not have permission to access this page. Please contact the system administrator
          or login again with authorized credentials.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

          <button
            className="btn btn-primary"
            onClick={handleLoginAgain}
          >
            Login Again
          </button>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized
