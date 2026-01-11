import axios from "axios";

/* =========================
   WAREHOUSE MASTER
   ========================= */

export const getWarehouses = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    return res.data.warehouses || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWarehouseById = async (warehouseId) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    return (
      res.data.warehouses.find(
        (w) => String(w.id) === String(warehouseId)
      ) || null
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* =========================
   GODOWN MASTER
   ========================= */

export const getGodownsByWarehouse = async (warehouseId) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    return res.data.godowns.filter(
      (g) => String(g.warehouseId) === String(warehouseId)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* =========================
   COMPARTMENT MASTER
   ========================= */

export const getCompartmentsByGodown = async (godownId) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    return res.data.compartments.filter(
      (c) => String(c.godownId) === String(godownId)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* =========================
   STACK MASTER
   ========================= */

export const getStacksByCompartment = async (compartmentId) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    return res.data.stacks.filter(
      (s) => String(s.compartmentId) === String(compartmentId)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};














// import axios from "axios";

// /* =========================
//    WAREHOUSE MASTER
//    ========================= */

// export const getWarehouses = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/warehouses");
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const getWarehouseById = async (warehouseId) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/warehouses/${warehouseId}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// /* =========================
//    GODOWN MASTER
//    ========================= */

// export const getGodownsByWarehouse = async (warehouseId) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/godowns?warehouseId=${warehouseId}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// /* =========================
//    COMPARTMENT MASTER
//    ========================= */

// export const getCompartmentsByGodown = async (godownId) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/compartments?godownId=${godownId}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// /* =========================
//    STACK MASTER
//    ========================= */

// export const getStacksByCompartment = async (compartmentId) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/stacks?compartmentId=${compartmentId}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
