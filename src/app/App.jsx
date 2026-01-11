import { createContext, useState } from "react";
import AppRoutes from "../routes/AppRoutes";

export const AuthContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, role, setRole }}
    >
      <AppRoutes />
    </AuthContext.Provider>
  );
};

export default App;






// npx json-server .json -p 5000