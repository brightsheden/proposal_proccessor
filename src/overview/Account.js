import React from 'react';


const UserContext = React.createContext({
    users: [],
    selectedUsers: null,
    addUsers: () => null,
    addselectedUser: () => null
})

export const UserProvider = ({children}) => {
    const [users, setUsers] = React.useState([])
    const [selectedUser, setSelectedUser] = React.useState({})

    const addUsers = React.useCallback((data) => {
        setUsers(data)
    }, [])


    const addselectedUsers = React.useCallback((data) => {
        setSelectedUser(data)
    }, [])
    return(
        <UserContext.Provider value={{users, selectedUser, addUsers, addselectedUsers}}>
            {children}
        </UserContext.Provider>
    )

};


export const useUserContext = () => React.useContext(UserContext);