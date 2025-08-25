import React from 'react'
import { ScaleLoader } from "react-spinners";
const AuthLoading = () => {
  
  return (
    <>
      <ScaleLoader height={10} width={1} color="#fff" />
    </>
  )
}

export default React.memo(AuthLoading)
