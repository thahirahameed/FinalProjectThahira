import React, {createContext, useContext, useState, useEffect} from 'react';

const UserContext = createContext({state: {}, actions: {}});

export function UserContextProvider({children, data}) {
  const [userId, setUserId] = useState(data);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const value = {
    state: {userId},
    actions: {setUserId},
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
