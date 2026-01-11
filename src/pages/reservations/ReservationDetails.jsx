import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationById } from "../../services/reservationService";
import styles from "./Reservation.module.css";

const ReservationDetails = () => {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getReservationById(reservationId);
        setReservation(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [reservationId]);

  if (loading) {
    return <p className="text-center mt-4">Loading reservation details...</p>;
  }

  if (!reservation) {
    return <p className="text-center mt-4">Reservation not found</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h4>Reservation Details</h4>
        <p>Complete reservation information</p>
      </div>

      <table className="table table-bordered w-75">
        <tbody>
          <tr>
            <th>Reservation No</th>
            <td>{reservation.reservationNo}</td>
          </tr>
          <tr>
            <th>Depositor</th>
            <td>{reservation.depositorName}</td>
          </tr>
          <tr>
            <th>Commodity</th>
            <td>{reservation.commodity}</td>
          </tr>
          <tr>
            <th>Requested Bags</th>
            <td>{reservation.requestedBags}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{reservation.status}</td>
          </tr>
          <tr>
            <th>Remarks</th>
            <td>{reservation.remarks || "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservationDetails;












// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getReservationById } from "../../services/reservationService";
// import styles from "./Reservation.module.css";

// const ReservationDetails = () => {
//   const { reservationId } = useParams();
//   const [reservation, setReservation] = useState(null);

//   useEffect(() => {
//     fetchReservation();
//   }, []);

//   const fetchReservation = async () => {
//     const data = await getReservationById(reservationId);
//     setReservation(data);
//   };

//   if (!reservation) {
//     return <p>Loading reservation details...</p>;
//   }

//   return (
//     <div className={styles.pageWrapper}>
//       <h4>Reservation Details</h4>

//       <table className="table table-bordered w-75">
//         <tbody>
//           <tr>
//             <th>Reservation No</th>
//             <td>{reservation.reservationNo}</td>
//           </tr>
//           <tr>
//             <th>Depositor</th>
//             <td>{reservation.depositorName}</td>
//           </tr>
//           <tr>
//             <th>Commodity</th>
//             <td>{reservation.commodity}</td>
//           </tr>
//           <tr>
//             <th>Requested Bags</th>
//             <td>{reservation.requestedBags}</td>
//           </tr>
//           <tr>
//             <th>Status</th>
//             <td>{reservation.status}</td>
//           </tr>
//           <tr>
//             <th>Remarks</th>
//             <td>{reservation.remarks || "-"}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationDetails;
