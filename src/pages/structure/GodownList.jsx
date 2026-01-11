import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGodownsByWarehouse } from "../../services/warehouseService";
import styles from "./Structure.module.css";

const GodownList = () => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGodowns = async () => {
      try {
        const data = await getGodownsByWarehouse(warehouseId);
        setGodowns(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGodowns();
  }, [warehouseId]);

  const viewCompartments = (godownId) => {
    navigate(`/godowns/${godownId}/compartments`);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading godowns...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Godown Master</h4>
        <p>Godowns mapped under selected warehouse</p>
      </div>

      <table className="table table-bordered">
        <thead className={styles.tableHead}>
          <tr>
            <th>Godown Code</th>
            <th>Godown Name</th>
            <th>Storage Type</th>
            <th>Total Capacity (MT)</th>
            <th>Utilized (MT)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {godowns.length > 0 ? (
            godowns.map((gd) => (
              <tr key={gd.id}>
                <td>{gd.code}</td>
                <td>{gd.name}</td>
                <td>{gd.storageType}</td>
                <td>{gd.capacity}</td>
                <td>{gd.utilizedCapacity}</td>
                <td>
                  <span className={styles.activeStatus}>
                    {gd.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => viewCompartments(gd.id)}
                  >
                    View Compartments
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No godowns found for this warehouse
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GodownList;









// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getGodownsByWarehouse } from "../../services/warehouseService";
// import styles from "./Structure.module.css";

// const GodownList = () => {
//   const { warehouseId } = useParams();
//   const navigate = useNavigate();
//   const [godowns, setGodowns] = useState([]);

//   useEffect(() => {
//     fetchGodowns();
//   }, [warehouseId]);

//   const fetchGodowns = async () => {
//     const data = await getGodownsByWarehouse(warehouseId);
//     setGodowns(data);
//   };

//   const viewCompartments = (godownId) => {
//     navigate(`/godowns/${godownId}/compartments`);
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.pageHeader}>
//         <h4>Godown Master</h4>
//         <p>Godowns mapped under selected warehouse</p>
//       </div>

//       <table className="table table-bordered">
//         <thead className={styles.tableHead}>
//           <tr>
//             <th>Godown Code</th>
//             <th>Godown Name</th>
//             <th>Storage Type</th>
//             <th>Total Capacity (MT)</th>
//             <th>Utilized (MT)</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {godowns.length > 0 ? (
//             godowns.map((gd) => (
//               <tr key={gd.id}>
//                 <td>{gd.code}</td>
//                 <td>{gd.name}</td>
//                 <td>{gd.storageType}</td>
//                 <td>{gd.capacity}</td>
//                 <td>{gd.utilizedCapacity}</td>
//                 <td>
//                   <span className={styles.activeStatus}>
//                     {gd.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     onClick={() => viewCompartments(gd.id)}
//                   >
//                     View Compartments
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No godowns found for this warehouse
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GodownList;
