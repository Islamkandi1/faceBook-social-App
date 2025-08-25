import React, { createContext, useState } from "react";
export const updateContext = createContext();
const UpdatePostProvider = ({ children }) => {
  const [showForm, setShowForm] = useState("");
  const [removeOldimage,setRemoveOldimage] = useState("")
  const [newImage,setNewImage]=useState(null)
  const shareUpdate = {
    setShowForm,
    showForm,
    setRemoveOldimage,
    removeOldimage,
    setNewImage,
    newImage,
  };
  return <updateContext.Provider value={shareUpdate}>{children}</updateContext.Provider>;
};

export default UpdatePostProvider;
