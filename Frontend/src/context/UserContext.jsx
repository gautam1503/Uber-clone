import React, { createContext, useState } from 'react'

export const userDataContext = createContext()

const UserContext = ({children}) => {
  const user = {
    fullName: {
      firstName: "",
      lastName: ""
    },
    email: "",
    password: "",
  }
  const [userData, setUserData] = useState(user)



  return (
    <userDataContext.Provider value={[userData, setUserData]}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext