import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Warehouse.module.css";

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await axios.get("/data/warehouses.json");
        setWarehouses(res.data.warehouses || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  const viewDetails = (id) => {
    navigate(`/admin/warehouses/${id}`);
  };

  const viewGodowns = (id) => {
    navigate(`/warehouses/${id}/godowns`);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading warehouses...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Warehouse Master</h4>
        <p>Registered warehouses under administrative control</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className="table table-bordered">
          <thead className={styles.tableHead}>
            <tr>
              <th>Warehouse Code</th>
              <th>Warehouse Name</th>
              <th>Location</th>
              <th>Total Capacity (MT)</th>
              <th>Utilized (MT)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {warehouses.length > 0 ? (
              warehouses.map((wh) => (
                <tr key={wh.id}>
                  <td>{wh.code}</td>
                  <td>{wh.name}</td>
                  <td>{wh.location}</td>
                  <td>{wh.capacity}</td>
                  <td>{wh.utilizedCapacity}</td>
                  <td>
                    <span className={styles.activeStatus}>
                      {wh.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => viewDetails(wh.id)}
                    >
                      View Details
                    </button>

                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => viewGodowns(wh.id)}
                    >
                      View Godowns
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No warehouse records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseList;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getWarehouses } from "../../services/warehouseService";
// import styles from "./Warehouse.module.css";

// const WarehouseList = () => {
//   const [warehouses, setWarehouses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchWarehouses();
//   }, []);

//   const fetchWarehouses = async () => {
//     const data = await getWarehouses();
//     setWarehouses(data);
//   };

//   const viewDetails = (id) => {
//     navigate(`/admin/warehouses/${id}`);
//   };

//   const viewGodowns = (id) => {
//     navigate(`/warehouses/${id}/godowns`);
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.pageHeader}>
//         <h4>Warehouse Master</h4>
//         <p>Registered warehouses under administrative control</p>
//       </div>

//       <div className={styles.tableWrapper}>
//         <table className="table table-bordered">
//           <thead className={styles.tableHead}>
//             <tr>
//               <th>Warehouse Code</th>
//               <th>Warehouse Name</th>
//               <th>Location</th>
//               <th>Total Capacity (MT)</th>
//               <th>Utilized (MT)</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {warehouses.length > 0 ? (
//               warehouses.map((wh) => (
//                 <tr key={wh.id}>
//                   <td>{wh.code}</td>
//                   <td>{wh.name}</td>
//                   <td>{wh.location}</td>
//                   <td>{wh.capacity}</td>
//                   <td>{wh.utilizedCapacity}</td>
//                   <td>
//                     <span className={styles.activeStatus}>
//                       {wh.status}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-outline-primary me-2"
//                       onClick={() => viewDetails(wh.id)}
//                     >
//                       View Details
//                     </button>

//                     <button
//                       className="btn btn-sm btn-outline-secondary"
//                       onClick={() => viewGodowns(wh.id)}
//                     >
//                       View Godowns
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No warehouse records available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WarehouseList;
