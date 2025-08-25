import React, { createContext, useState } from 'react'
export const contextMode = createContext()
const DarkModeProvider = ({children}) => {
      const [mood, setMood] = useState(localStorage.theme);
  return (
    <contextMode.Provider value={{mood, setMood}}>
      {children}
    </contextMode.Provider>
  )
}

export default DarkModeProvider
