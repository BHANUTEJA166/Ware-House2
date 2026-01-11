import axios from "axios";

/* =====================================================
   STACK ALLOCATION
   ===================================================== */

export const getAllocations = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    console.log("📦 Allocations loaded:", res.data.stackAllocations);
    return res.data.stackAllocations;
  } catch (error) {
    console.error("Error fetching allocations:", error);
    return [];
  }
};

export const createAllocation = async (data) => {
  try {
    // 🔥 Static demo: Simulate success (no real POST)
    const newAllocation = {
      id: `ALLOC-${Date.now()}`,
      ...data
    };
    console.log("✅ Allocation created (demo):", newAllocation);
    return newAllocation;
  } catch (error) {
    console.error("Error creating allocation:", error);
    throw error;
  }
};

export const getAllocationHistory = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    console.log("📜 Allocation history loaded:", res.data.allocationHistory);
    return res.data.allocationHistory;
  } catch (error) {
    console.error("Error fetching allocation history:", error);
    return [];
  }
};

/* =====================================================
   STOCK RECEIPT (INWARD)
   ===================================================== */

export const getReceiptTokens = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    console.log("📥 Receipt tokens loaded:", res.data.stockReceiptTokens);
    return res.data.stockReceiptTokens;
  } catch (error) {
    console.error("Error fetching receipt tokens:", error);
    return [];
  }
};

export const createStockReceipt = async (data) => {
  try {
    // 🔥 Static demo: Simulate success
    const newReceipt = {
      id: `RCPT-${Date.now()}`,
      ...data
    };
    console.log("✅ Stock receipt created (demo):", newReceipt);
    return newReceipt;
  } catch (error) {
    console.error("Error creating stock receipt:", error);
    throw error;
  }
};

export const getReceiptByToken = async (tokenNo) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    const receipt = res.data.stockReceipts.find(
      (r) => String(r.tokenNo) === String(tokenNo)
    );
    console.log(`📄 Receipt for token ${tokenNo}:`, receipt);
    return receipt || null;
  } catch (error) {
    console.error("Error fetching receipt by token:", error);
    return null;
  }
};

/* =====================================================
   STOCK ISSUE (OUTWARD)
   ===================================================== */

export const getStockIssueTokens = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    console.log("📤 Issue tokens loaded:", res.data.stockIssueTokens);
    return res.data.stockIssueTokens;
  } catch (error) {
    console.error("Error fetching issue tokens:", error);
    return [];
  }
};

export const getStockIssueTokenById = async (id) => {
  try {
    const res = await axios.get("/data/warehouses.json");
    const token = res.data.stockIssueTokens.find(
      (t) => String(t.id) === String(id)
    );
    console.log(`🎫 Issue token ${id}:`, token);
    return token || null;
  } catch (error) {
    console.error("Error fetching issue token:", error);
    return null;
  }
};

export const createStockIssue = async (data) => {
  try {
    // 🔥 Static demo: Simulate success
    const newIssue = {
      id: `ISSUE-${Date.now()}`,
      ...data
    };
    console.log("✅ Stock issue created (demo):", newIssue);
    return newIssue;
  } catch (error) {
    console.error("Error creating stock issue:", error);
    throw error;
  }
};

export const getStockIssues = async () => {
  try {
    const res = await axios.get("/data/warehouses.json");
    console.log("📤 Stock issues loaded:", res.data.stockIssues);
    return res.data.stockIssues;
  } catch (error) {
    console.error("Error fetching stock issues:", error);
    return [];
  }
};










// import axios from "axios";

// const BASE_URL = "http://localhost:5000";

// /* =====================================================
//    STACK ALLOCATION
//    ===================================================== */

// export const getAllocations = async () => {
//   const res = await axios.get(`${BASE_URL}/stackAllocations`);
//   return res.data;
// };

// export const createAllocation = async (data) => {
//   const res = await axios.post(`${BASE_URL}/stackAllocations`, data);
//   return res.data;
// };

// export const getAllocationHistory = async () => {
//   const res = await axios.get(`${BASE_URL}/allocationHistory`);
//   return res.data;
// };

// /* =====================================================
//    STOCK RECEIPT (INWARD)
//    ===================================================== */

// export const getReceiptTokens = async () => {
//   const res = await axios.get(`${BASE_URL}/stockReceiptTokens`);
//   return res.data;
// };

// export const createStockReceipt = async (data) => {
//   const res = await axios.post(`${BASE_URL}/stockReceipts`, data);
//   return res.data;
// };

// export const getReceiptByToken = async (tokenNo) => {
//   const res = await axios.get(
//     `${BASE_URL}/stockReceipts?tokenNo=${tokenNo}`
//   );
//   return res.data[0];
// };

// /* =====================================================
//    STOCK ISSUE (OUTWARD)
//    ===================================================== */

// export const getStockIssueTokens = async () => {
//   const res = await axios.get(`${BASE_URL}/stockIssueTokens`);
//   return res.data;
// };

// export const getStockIssueTokenById = async (id) => {
//   const res = await axios.get(`${BASE_URL}/stockIssueTokens/${id}`);
//   return res.data;
// };

// export const createStockIssue = async (data) => {
//   const res = await axios.post(`${BASE_URL}/stockIssues`, data);
//   return res.data;
// };

// export const getStockIssues = async () => {
//   const res = await axios.get(`${BASE_URL}/stockIssues`);
//   return res.data;
// };
