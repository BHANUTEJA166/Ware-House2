import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompartmentsByGodown } from "../../services/warehouseService";
import styles from "./Structure.module.css";

const CompartmentList = () => {
  const { godownId } = useParams();
  const navigate = useNavigate();
  const [compartments, setCompartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompartments = async () => {
      try {
        const data = await getCompartmentsByGodown(godownId);
        setCompartments(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompartments();
  }, [godownId]);

  const viewStacks = (id) => {
    navigate(`/compartments/${id}/stacks`);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading compartments...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Compartment Master</h4>
        <p>Compartments mapped under selected godown</p>
      </div>

      <table className="table table-bordered">
        <thead className={styles.tableHead}>
          <tr>
            <th>Compartment Code</th>
            <th>Name</th>
            <th>Commodity</th>
            <th>Total Capacity (MT)</th>
            <th>Utilized (MT)</th>
            <th>Floor Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {compartments.length > 0 ? (
            compartments.map((cp) => (
              <tr key={cp.id}>
                <td>{cp.code}</td>
                <td>{cp.name}</td>
                <td>{cp.commodityType}</td>
                <td>{cp.capacity}</td>
                <td>{cp.utilizedCapacity}</td>
                <td>{cp.floorType}</td>
                <td>
                  <span className={styles.activeStatus}>
                    {cp.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => viewStacks(cp.id)}
                  >
                    View Stacks
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No compartments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompartmentList;





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getCompartmentsByGodown } from "../../services/warehouseService";
// import styles from "./Structure.module.css";

// const CompartmentList = () => {
//   const { godownId } = useParams();
//   const navigate = useNavigate();
//   const [compartments, setCompartments] = useState([]);

//   useEffect(() => {
//     fetchCompartments();
//   }, [godownId]);

//   const fetchCompartments = async () => {
//     const data = await getCompartmentsByGodown(godownId);
//     setCompartments(data);
//   };

//   const viewStacks = (id) => {
//     navigate(`/compartments/${id}/stacks`);
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.pageHeader}>
//         <h4>Compartment Master</h4>
//         <p>Compartments mapped under selected godown</p>
//       </div>

//       <table className="table table-bordered">
//         <thead className={styles.tableHead}>
//           <tr>
//             <th>Compartment Code</th>
//             <th>Name</th>
//             <th>Commodity</th>
//             <th>Total Capacity (MT)</th>
//             <th>Utilized (MT)</th>
//             <th>Floor Type</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {compartments.length > 0 ? (
//             compartments.map((cp) => (
//               <tr key={cp.id}>
//                 <td>{cp.code}</td>
//                 <td>{cp.name}</td>
//                 <td>{cp.commodityType}</td>
//                 <td>{cp.capacity}</td>
//                 <td>{cp.utilizedCapacity}</td>
//                 <td>{cp.floorType}</td>
//                 <td>
//                   <span className={styles.activeStatus}>
//                     {cp.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     onClick={() => viewStacks(cp.id)}
//                   >
//                     View Stacks
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No compartments found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CompartmentList;