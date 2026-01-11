import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/App";
import styles from "./Login.module.css";

const Login = () => {
  const [details, setDetails] = useState({
    userId: "",
    password: "",
    remember: false,
  });

  const { setIsLoggedIn, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeData = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails({
      ...details,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { userId, password } = details;

    if (userId === "admin01" && password === "admin@123") {
      setIsLoggedIn(true);
      setRole("ADMIN");
      navigate("/admin/dashboard");
    } else if (userId === "manager01" && password === "manager@123") {
      setIsLoggedIn(true);
      setRole("MANAGER");
      navigate("/warehouse/dashboard");
    } else if (userId === "inspector01" && password === "inspect@123") {
      setIsLoggedIn(true);
      setRole("INSPECTOR");
      navigate("/inspector/dashboard");
    } else {
      alert("Invalid User ID or Password");
    }
  };

  const forgotPasswordHandler = () => {
    alert("Please contact the system administrator to reset your password.");
  };

  const { userId, password, remember } = details;

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.overlay}>
        {/* Language Selector */}
        <div className={styles.language}>
          <select className={styles.languageSelect}>
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
        </div>

        {/* Login Card */}
        <div className={styles.loginCard}>
          <img
            src="/assets/icons/org.png"
            alt="Organization logo"
            className={styles.logo}
          />

          <h2 className={styles.portalTitle}>
            Warehouse Workflow Management | LOGIN
          </h2>

          <h3 className={styles.subTitle}>
            Centralized Internal Operations Portal
          </h3>

          <form onSubmit={submitHandler}>
            <label>User ID / Email</label>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={changeData}
              className="form-control mb-3"
              placeholder="Enter User ID"
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={changeData}
              className="form-control mb-3"
              placeholder="Enter Password"
            />

            <div className={styles.optionsRow}>
              <div>
                <input
                  type="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={changeData}
                />{" "}
                Remember me
              </div>

              <span
                className={styles.forgot}
                onClick={forgotPasswordHandler}
              >
                Forgot password?
              </span>
            </div>

            <button type="submit" className={styles.loginBtn}>
              LOGIN
            </button>

            <div className="text-center mt-4">
              <small className="text-muted">
                Authorized personnel only
              </small>
            </div>
          </form>
        </div>

        {/* Notes */}
        <div className={styles.notes}>
          <strong>IMPORTANT INFORMATION:</strong>
          <ul>
            <li>This portal is intended strictly for authorized personnel.</li>
            <li>Do not share your login credentials with anyone.</li>
            <li>All activities are monitored and audited.</li>
            <li>For access issues, please contact the system administrator.</li>
          </ul>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          © 2024 Warehouse Management System. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Login;














// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../app/App";
// import styles from "./Login.module.css";

// const Login = () => {
//   const [details, setDetails] = useState({
//     userId: "",
//     password: "",
//     remember: false,
//   });

//   const { setIsLoggedIn, setRole } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const changeData = (e) => {
//     const { name, value, type, checked } = e.target;
//     setDetails({
//       ...details,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const { userId, password } = details;

//     if (userId === "admin01" && password === "admin@123") {
//       setIsLoggedIn(true);
//       setRole("ADMIN");
//       navigate("/admin/dashboard");
//     } else if (userId === "manager01" && password === "manager@123") {
//       setIsLoggedIn(true);
//       setRole("MANAGER");
//       navigate("/warehouse/dashboard");
//     } else if (userId === "inspector01" && password === "inspect@123") {
//       setIsLoggedIn(true);
//       setRole("INSPECTOR");
//       navigate("/inspector/dashboard");
//     } else {
//       alert("Invalid User ID or Password");
//     }
//   };

//   const forgotPasswordHandler = () => {
//     alert("Please contact the system administrator to reset your password.");
//   };

//   const { userId, password, remember } = details;

//   return (
//     <div className={styles.loginWrapper}>
//       <div className={styles.overlay}>

//         {/* Language Selector (UI only) */}
//         <div className={styles.language}>
//           <select className={styles.languageSelect}>
//             <option value="en">English</option>
//             <option value="hi">हिन्दी (Hindi)</option>
//           </select>
//         </div>

//         {/* Login Card */}
//         <div className={styles.loginCard}>
//           <img
//             src="/assets/icons/org.png"
//             alt="Organization logo"
//             className={styles.logo}
//           />

//           <h2 className={styles.portalTitle}>
//             Warehouse Workflow Management | LOGIN
//           </h2>

//           <h3 className={styles.subTitle}>
//             Centralized Internal Operations Portal
//           </h3>

//           <form onSubmit={submitHandler}>
//             <label>User ID / Email</label>
//             <input
//               type="text"
//               name="userId"
//               value={userId}
//               onChange={changeData}
//               className="form-control mb-3"
//               placeholder="Enter User ID"
//             />

//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={changeData}
//               className="form-control mb-3"
//               placeholder="Enter Password"
//             />

//             <div className={styles.optionsRow}>
//               <div>
//                 <input
//                   type="checkbox"
//                   name="remember"
//                   checked={remember}
//                   onChange={changeData}
//                 />{" "}
//                 Remember me
//               </div>

//               <span
//                 className={styles.forgot}
//                 onClick={forgotPasswordHandler}
//               >
//                 Forgot password?
//               </span>
//             </div>

//             <button type="submit" className={styles.loginBtn}>
//               LOGIN
//             </button>

//             <div className="text-center mt-4">
//               <small className="text-muted">
//                 Authorized personnel only
//               </small>
//             </div>
//           </form>
//         </div>

//         {/* Notes */}
//         <div className={styles.notes}>
//           <strong>IMPORTANT INFORMATION:</strong>
//           <ul>
//             <li>This portal is intended strictly for authorized personnel.</li>
//             <li>Do not share your login credentials with anyone.</li>
//             <li>All activities are monitored and audited.</li>
//             <li>For access issues, please contact the system administrator.</li>
//           </ul>
//         </div>

//         {/* Footer */}
//         <footer className={styles.footer}>
//           © 2024 Warehouse Management System. All Rights Reserved.
//         </footer>

//       </div>
//     </div>
//   );
// };

// export default Login;
