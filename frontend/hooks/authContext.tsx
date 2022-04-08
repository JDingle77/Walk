import * as React from "react";

export type AuthDataType = {
  AuthData: {
    accessToken: string,
    //add other stuff here
  },

  setAuthData: (value: {
    accessToken: string
    //add other stuff here
  }) => void
};

const defaultAuthData = { accessToken: "" };

const AuthDataContext = React.createContext<AuthDataType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};
export const AuthataProvider = ({ children }: Props) => {
  const [AuthData, setAuthData] = React.useState(defaultAuthData);

  React.useEffect(() => {
    // We'd get the AuthData from a web API / local storage in a real app
    // We've hardcoded the AuthData in our example
    const currentData = {
      accessToken: ""
    };
    setAuthData(currentData);
  }, []);

  return (
    <AuthDataContext.Provider value={{ AuthData, setAuthData }}>
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuthData = () => React.useContext(AuthDataContext);