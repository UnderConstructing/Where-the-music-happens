import React from 'react';



const AuthContext = React.createContext({
    user: undefined,
    auth: () => undefined
});

export default AuthContext;