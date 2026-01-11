import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStacksByCompartment } from "../../services/warehouseService";
import styles from "./Structure.module.css";

const StackList = () => {
  const { compartmentId } = useParams();
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const data = await getStacksByCompartment(compartmentId);
        setStacks(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStacks();
  }, [compartmentId]);

  if (loading) {
    return <p className="text-center mt-4">Loading stacks...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Stack Master</h4>
        <p>Stacks available under selected compartment</p>
      </div>

      <table className="table table-bordered">
        <thead className={styles.tableHead}>
          <tr>
            <th>Stack No</th>
            <th>Commodity</th>
            <th>Bag Type</th>
            <th>Total Bags</th>
            <th>Available Bags</th>
            <th>Condition</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {stacks.length > 0 ? (
            stacks.map((st) => (
              <tr key={st.id}>
                <td>{st.stackNo}</td>
                <td>{st.commodity}</td>
                <td>{st.bagType}</td>
                <td>{st.totalBags}</td>
                <td>{st.availableBags}</td>
                <td>{st.condition}</td>
                <td>
                  <span className={styles.activeStatus}>
                    {st.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No stacks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StackList;













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getStacksByCompartment } from "../../services/warehouseService";
// import styles from "./Structure.module.css";

// const StackList = () => {
//   const { compartmentId } = useParams();
//   const [stacks, setStacks] = useState([]);

//   useEffect(() => {
//     fetchStacks();
//   }, [compartmentId]);

//   const fetchStacks = async () => {
//     const data = await getStacksByCompartment(compartmentId);
//     setStacks(data);
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.pageHeader}>
//         <h4>Stack Master</h4>
//         <p>Stacks available under selected compartment</p>
//       </div>

//       <table className="table table-bordered">
//         <thead className={styles.tableHead}>
//           <tr>
//             <th>Stack No</th>
//             <th>Commodity</th>
//             <th>Bag Type</th>
//             <th>Total Bags</th>
//             <th>Available Bags</th>
//             <th>Condition</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {stacks.length > 0 ? (
//             stacks.map((st) => (
//               <tr key={st.id}>
//                 <td>{st.stackNo}</td>
//                 <td>{st.commodity}</td>
//                 <td>{st.bagType}</td>
//                 <td>{st.totalBags}</td>
//                 <td>{st.availableBags}</td>
//                 <td>{st.condition}</td>
//                 <td>
//                   <span className={styles.activeStatus}>
//                     {st.status}
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No stacks found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StackList;
