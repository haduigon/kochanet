import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (localUser) => {
      setUser(localUser || null);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// /* eslint-disable */
// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { Navigate } from "react-router-dom";
// import Loader from "../components/Loader";
// import React from "react";

// type Props = {
//   children: any,
// }

// const ProtectedRoute: React.FC<Props> = ({ children }) => {
//   const [user, setUser] = useState<any>(undefined);

//   useEffect(() => {
//     const listen = onAuthStateChanged(getAuth(), (localUser) => {
//       if (!localUser) {
//         setUser(null);
//       }
//       if (localUser) {
//         setUser(localUser);
//       }

//       return () => {
//         listen();
//       }
//     });
//   }, []);
  
//   return (
//     <div >
//       {user === undefined && <Loader />}
//       {user === null && <Navigate to='/' />}
//       {user && <>{children}</>}
//     </div>
//   )
// }
// export default ProtectedRoute;