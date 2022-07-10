import React, { createContext, useState } from "react";

export const MyContext = createContext(null);

const ContextProvider = (props) => {
  const [notas, setnotas] = useState([
    { tema: "", nota: "ejemplo1", key: "2" },
    {
      tema: "2",
      nota: "ejemplo2",
      key: "1",
    },
  ]);

  return (
    <MyContext.Provider value={{ notas, setnotas }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
