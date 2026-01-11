import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../../services/reservationService";
import styles from "./Reservation.module.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const viewDetails = (id) => {
    navigate(`/reservations/${id}`);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading reservations...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Space Reservations</h4>
        <p>Reservation requests and approvals</p>
      </div>

      <table className="table table-bordered">
        <thead className={styles.tableHead}>
          <tr>
            <th>Reservation No</th>
            <th>Depositor</th>
            <th>Commodity</th>
            <th>Requested Bags</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.length > 0 ? (
            reservations.map((rs) => (
              <tr key={rs.id}>
                <td>{rs.reservationNo}</td>
                <td>{rs.depositorName}</td>
                <td>{rs.commodity}</td>
                <td>{rs.requestedBags}</td>
                <td>
                  <span className={styles.statusBadge}>
                    {rs.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => viewDetails(rs.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No reservations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getReservations } from "../../services/reservationService";
// import styles from "./Reservation.module.css";

// const ReservationList = () => {
//   const [reservations, setReservations] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchReservations();
//   }, []);

//   const fetchReservations = async () => {
//     const data = await getReservations();
//     setReservations(data);
//   };

//   const viewDetails = (id) => {
//     navigate(`/reservations/${id}`);
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.pageHeader}>
//         <h4>Space Reservations</h4>
//         <p>Reservation requests and approvals</p>
//       </div>

//       <table className="table table-bordered">
//         <thead className={styles.tableHead}>
//           <tr>
//             <th>Reservation No</th>
//             <th>Depositor</th>
//             <th>Commodity</th>
//             <th>Requested Bags</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {reservations.map((rs) => (
//             <tr key={rs.id}>
//               <td>{rs.reservationNo}</td>
//               <td>{rs.depositorName}</td>
//               <td>{rs.commodity}</td>
//               <td>{rs.requestedBags}</td>
//               <td>
//                 <span className={styles.statusBadge}>
//                   {rs.status}
//                 </span>
//               </td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={() => viewDetails(rs.id)}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationList;
