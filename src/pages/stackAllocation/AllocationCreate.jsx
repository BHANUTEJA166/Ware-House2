import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAllocation } from "../../services/stockService";

const AllocationCreate = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    reservationId: reservationId || "",
    reservationNo: "",
    stackId: "",
    stackNo: "",
    allocatedBags: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const changeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        id: `ALLOC-${Date.now()}`, // 🔥 Static demo ID
        allocatedBy: "Warehouse Manager",
        allocatedDate: new Date().toISOString().split("T")[0],
        status: "ALLOCATED"
      };

      console.log("🎯 Creating allocation:", payload); // 🔥 DEBUG

      await createAllocation(payload);
      
      setSuccess(true);
      
      // Show success for 2 seconds then redirect
      setTimeout(() => {
        navigate("/stack-allocations");
      }, 2000);
      
    } catch (error) {
      console.error("Error creating allocation:", error);
      alert("Failed to create allocation. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="container p-4">
        <div className="alert alert-success text-center">
          <h4>✅ Allocation Created Successfully!</h4>
          <p>Redirecting to allocations list...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container p-4">
      <h4>Allocate Stack</h4>
      <p className="text-muted">Reservation ID: <strong>{reservationId}</strong></p>

      <form onSubmit={submitHandler} className="w-50">
        <div className="mb-3">
          <label className="form-label">Reservation Number</label>
          <input
            type="text"
            name="reservationNo"
            value={form.reservationNo}
            placeholder="e.g. RSV-2024-001"
            onChange={changeData}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stack Number</label>
          <input
            type="text"
            name="stackNo"
            value={form.stackNo}
            placeholder="e.g. ST-A1-01"
            onChange={changeData}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Allocated Bags</label>
          <input
            type="number"
            name="allocatedBags"
            value={form.allocatedBags}
            placeholder="e.g. 1500"
            onChange={changeData}
            className="form-control"
            min="1"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Allocating...
            </>
          ) : (
            "Allocate Stack"
          )}
        </button>
        
        <button
          type="button"
          className="btn btn-outline-secondary ms-2"
          onClick={() => navigate("/stack-allocations")}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AllocationCreate;















// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createAllocation } from "../../services/stockService";

// const AllocationCreate = () => {
//   const { reservationId } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     reservationId,
//     reservationNo: "",
//     stackId: "",
//     stackNo: "",
//     allocatedBags: ""
//   });

//   const changeData = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...form,
//       allocatedBy: "Warehouse Manager",
//       allocatedDate: new Date().toISOString().split("T")[0],
//       status: "ALLOCATED"
//     };

//     await createAllocation(payload);
//     navigate("/stack-allocations");
//   };

//   return (
//     <section className="container p-4">
//       <h4>Allocate Stack</h4>

//       <form onSubmit={submitHandler} className="w-50">
//         <input
//           type="text"
//           name="reservationNo"
//           placeholder="Reservation Number"
//           onChange={changeData}
//           className="form-control mb-3"
//         />

//         <input
//           type="text"
//           name="stackNo"
//           placeholder="Stack Number"
//           onChange={changeData}
//           className="form-control mb-3"
//         />

//         <input
//           type="number"
//           name="allocatedBags"
//           placeholder="Allocated Bags"
//           onChange={changeData}
//           className="form-control mb-3"
//         />

//         <button className="btn btn-success">Allocate</button>
//       </form>
//     </section>
//   );
// };

// export default AllocationCreate;
