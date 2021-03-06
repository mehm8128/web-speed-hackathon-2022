import React, { useCallback, useContext, useMemo, useState } from "react";

/**
 * @typedef AuthContextValues
 * @property {string | null} userId
 * @property {(userId: string) => void} setUserId
 */

/** @type {React.Context<AuthContextValues>} */
const AuthContext = React.createContext({
  setUserId: () => {
    throw new Error("AuthContext value is not set");
  },
  userId: null,
});

export const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        setUserId,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { userId } = useContext(AuthContext);

  const res = useMemo(
    () => ({
      loggedIn: userId != null,
      userId,
    }),
    [userId],
  );

  return res;
};

export const useRegister = () => {
  const { setUserId } = useContext(AuthContext);

  const register = useCallback(async () => {
    let res;
    await fetch("/api/users/me")
      .then((response) => response.json())
      .then((json) => {
        res = json;
      });
    setUserId(res.id);
  }, [setUserId]);

  return register;
};
