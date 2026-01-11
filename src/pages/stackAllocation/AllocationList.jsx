import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllocations } from "../../services/stockService";

const AllocationList = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const data = await getAllocations();
      console.log("Allocations loaded:", data); // 🔥 DEBUG
      setAllocations(data || []);
    } catch (error) {
      console.error("Error loading allocations:", error);
      setAllocations([]);
    } finally {
      setLoading(false);
    }
  };

  const allocateStack = (reservationId) => {
    navigate(`/stack-allocations/${reservationId}`);
  };

  if (loading) {
    return (
      <section className="container p-4">
        <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container p-4">
      <h4 className="mb-3">Stack Allocation</h4>

      {allocations.length === 0 ? (
        <div className="alert alert-info">
          No allocations found.
        </div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Reservation No</th>
              <th>Stack No</th>
              <th>Allocated Bags</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allocations.map((al) => (
              <tr key={al.id}>
                <td>{al.reservationNo || 'N/A'}</td>
                <td>{al.stackNo || 'N/A'}</td>
                <td>{al.allocatedBags || 0}</td>
                <td>
                  <span className={`badge bg-${al.status === 'ALLOCATED' ? 'success' : 'warning'}`}>
                    {al.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => allocateStack(al.reservationId)}
                  >
                    View / Allocate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AllocationList;














// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllocations } from "../../services/stockService";

// const AllocationList = () => {
//   const [allocations, setAllocations] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllocations();
//   }, []);

//   const fetchAllocations = async () => {
//     const data = await getAllocations();
//     setAllocations(data);
//   };

//   const allocateStack = (reservationId) => {
//     navigate(`/stack-allocations/${reservationId}`);
//   };

//   return (
//     <section className="container p-4">
//       <h4 className="mb-3">Stack Allocation</h4>

//       <table className="table table-bordered">
//         <thead className="table-light">
//           <tr>
//             <th>Reservation No</th>
//             <th>Stack No</th>
//             <th>Allocated Bags</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {allocations.map((al) => (
//             <tr key={al.id}>
//               <td>{al.reservationNo}</td>
//               <td>{al.stackNo}</td>
//               <td>{al.allocatedBags}</td>
//               <td>{al.status}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={() => allocateStack(al.reservationId)}
//                 >
//                   View / Allocate
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default AllocationList;
