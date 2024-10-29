import React, {createContext} from 'react';

const Context = createContext({
    agent: null,
    session: null,
    timezone: null,
    dictionary: null,
    loading: false,
    setLoading: (value = false) => {},
    setSession: (session = {}) => {},
});

export default Context;