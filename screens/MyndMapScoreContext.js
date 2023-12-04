import React, { createContext, useState, useContext } from "react";

const MyndMapScoreContext = createContext();

export const useMyndMapScore = () => useContext(MyndMapScoreContext);

export const MyndMapScoreProvider = ({ children }) => {
  const [myndMapScore, setMyndMapScore] = useState("");

  return (
    <MyndMapScoreContext.Provider value={{ myndMapScore, setMyndMapScore }}>
      {children}
    </MyndMapScoreContext.Provider>
  );
};
