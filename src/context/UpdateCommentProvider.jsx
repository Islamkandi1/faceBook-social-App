import React, { createContext, useState } from "react";
export const commentCotext = createContext();
const UpdateCommentProvider = ({ children }) => {
  const [activeUpdateComment, setActiveUpdateComment] = useState(null);
  const valuse = {
    setActiveUpdateComment,
    activeUpdateComment
  };
  return (
    <commentCotext.Provider value={valuse}>{children}</commentCotext.Provider>
  );
};

export default UpdateCommentProvider;
