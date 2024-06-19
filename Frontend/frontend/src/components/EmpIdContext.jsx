import React, { createContext, useState, useContext } from "react";

const EmpIdContext = createContext();

export const EmpIdProvider = ({ children }) => {
  const [updateid, setupdateid] = useState(null);

  return (
    <EmpIdContext.Provider value={{ updateid, setupdateid }}>
      {children}
    </EmpIdContext.Provider>
  );
};

export const useEmpId = () => useContext(EmpIdContext);