import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Warehouse.module.css";

const WarehouseDetails = () => {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    fetchWarehouse();
  }, [warehouseId]);

  const fetchWarehouse = async () => {
    try {
      const res = await axios.get("/data/warehouses.json");

      const selectedWarehouse = res.data.warehouses.find(
        (wh) => String(wh.id) === String(warehouseId)
      );

      setWarehouse(selectedWarehouse);
    } catch (error) {
      console.error("Error fetching warehouse details:", error);
    }
  };

  if (!warehouse) {
    return <p>Loading warehouse information...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Warehouse Details</h4>
        <p>{warehouse.name}</p>
      </div>

      <div className={styles.detailCard}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Warehouse Code</th>
              <td>{warehouse.code}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{warehouse.location}</td>
            </tr>
            <tr>
              <th>Total Capacity</th>
              <td>{warehouse.capacity}</td>
            </tr>
            <tr>
              <th>Utilized Capacity</th>
              <td>{warehouse.utilizedCapacity}</td>
            </tr>
            <tr>
              <th>Warehouse Type</th>
              <td>{warehouse.warehouseType}</td>
            </tr>
            <tr>
              <th>Managed By</th>
              <td>{warehouse.managedBy}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{warehouse.status}</td>
            </tr>
            <tr>
              <th>Created On</th>
              <td>{warehouse.createdOn}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseDetails;











// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import styles from "./Warehouse.module.css";

// const WarehouseDetails = () => {
//   const { warehouseId } = useParams();
//   const [warehouse, setWarehouse] = useState(null);

//   useEffect(() => {
//     fetchWarehouse();
//   }, []);

//   const fetchWarehouse = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/warehouses/${warehouseId}`
//       );
//       setWarehouse(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!warehouse) {
//     return <p>Loading warehouse information...</p>;
//   }

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.pageHeader}>
//         <h4>Warehouse Details</h4>
//         <p>{warehouse.name}</p>
//       </div>

//       <div className={styles.detailCard}>
//         <table className="table table-bordered">
//           <tbody>
//             <tr>
//               <th>Warehouse Code</th>
//               <td>{warehouse.code}</td>
//             </tr>
//             <tr>
//               <th>Location</th>
//               <td>{warehouse.location}</td>
//             </tr>
//             <tr>
//               <th>Total Capacity (MT)</th>
//               <td>{warehouse.capacity}</td>
//             </tr>
//             <tr>
//               <th>Utilized Capacity (MT)</th>
//               <td>{warehouse.utilizedCapacity}</td>
//             </tr>
//             <tr>
//               <th>Warehouse Type</th>
//               <td>{warehouse.warehouseType}</td>
//             </tr>
//             <tr>
//               <th>Managed By</th>
//               <td>{warehouse.managedBy}</td>
//             </tr>
//             <tr>
//               <th>Status</th>
//               <td>{warehouse.status}</td>
//             </tr>
//             <tr>
//               <th>Created On</th>
//               <td>{warehouse.createdOn}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WarehouseDetails;
