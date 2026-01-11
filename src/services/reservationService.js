import axios from "axios";

export const getReservations = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    console.log("Raw data:", res.data); // 🔥 DEBUG
    console.log("Reservations:", res.data.reservations); // 🔥 DEBUG
    return res.data.reservations;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getReservationById = async (id) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    const reservation = res.data.reservations.find(
      (r) => String(r.id) === String(id)
    );
    return reservation || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const createReservation = async (data) => {
  try {
    const newReservation = {
      id: Math.random().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
    console.log("✅ Created:", newReservation);
    return newReservation;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};












// import axios from "axios";

// export const getReservations = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/reservations");
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const getReservationById = async (id) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/reservations/${id}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// export const createReservation = async (data) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/reservations",
//       data
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
