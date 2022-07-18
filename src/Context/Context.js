import React, { createContext, useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

export const MyContext = createContext(null);

const ContextProvider = (props) => {
  /* ========================================================================================= */

  const [user, setUser] = useState();
  const userId = user?.attributes.sub;
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      const { event } = data.payload;
      if (event == "signOut") {
        setUser(null);
      }
      if (event == "signIn") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);
  /* ========================================================================================= */

  return (
    <MyContext.Provider value={{ userId }}>{props.children}</MyContext.Provider>
  );
};

export default ContextProvider;
