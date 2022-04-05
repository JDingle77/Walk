import * as React from "react";

const defaultUserData = {email: "default", password: "default"};
type UserDataType = {
  UserData: {
    email: string,
    password: string,
  };
  setUserData: (value: {
    email: string,
    password: string,
  }) => void;
};
const UserDataContext = React.createContext<UserDataType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};
export const UserDataProvider = ({ children }: Props) => {
  const [UserData, setUserData] = React.useState(defaultUserData);

  React.useEffect(() => {
    // We'd get the UserData from a web API / local storage in a real app
    // We've hardcoded the UserData in our example
    const currentData = {email: "", password: ""};
    setUserData(currentData);
  }, []);

  return (
    <UserDataContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => React.useContext(UserDataContext);