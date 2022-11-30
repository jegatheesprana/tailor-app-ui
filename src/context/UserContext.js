import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.user };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false, user: {} };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, user: {} };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    user: JSON.parse(localStorage.getItem("user") || '{}')
  });

  function customFetch(url, { method = 'GET', headers = {}, ...rest } = {}) {
    return fetch(process.env.REACT_APP_API_HOST + url, {
      method,
      // headers: { "Authorization": "Bearer " + token, ...headers },
      headers: headers,
      ...rest
    }).then(res => {
      if (res.status === 401) {
        throw new Error("Expired")
      }
      return res
    });
  }

  const value = {
    ...state,
    customFetch
  }

  return (
    <UserStateContext.Provider value={value}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signUpUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    fetch(process.env.REACT_APP_API_HOST + '/user/login', {
      method: 'POST',
      // headers: { "Authorization": "Bearer " + token, ...headers },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: login, password })
    }).then(res => res.json())
      .then(data => {
        if (data.token && data.user) {
          localStorage.setItem('id_token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS', user: data.user })
          // setToken(data.token)
          // setUser(data.user)
          history.replace('/app/dashboard')
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          setError(true);
          setIsLoading(false);
        }
      })
      .catch(e => {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      })
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signUpUser(dispatch, user, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!user) {
    fetch(process.env.REACT_APP_API_HOST + '/user/signup', {
      method: 'POST',
      // headers: { "Authorization": "Bearer " + token, ...headers },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        setError(null)
        setIsLoading(false)
        dispatch()
      })
      .catch(e => {
        setError(true);
        setIsLoading(false);
      })
  } else {
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
