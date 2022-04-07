import * as React from "react";

const defaultUserData = {
  email: "default value",
  password: "default value",
  ownerName: "default value",
  dogUsername: "default value",
  dogName: "default value",
  dogBreed: "default value",
  dogGender: "default value",
  dogBirthday: "default value",
  dogLocation: "default value",
};
export type UserDataType = {
  UserData: {
    email: string,
    password: string,
    ownerName: string,
    dogUsername: string,
    dogName: string,
    dogBreed: string,
    dogGender: string,
    dogBirthday: string,
    dogLocation: string,
  };
  setUserData: (value: {
    email: string,
    password: string,
    ownerName: string,
    dogUsername: string,
    dogName: string,
    dogBreed: string,
    dogGender: string,
    dogBirthday: string,
    dogLocation: string,
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
    const currentData = {
      email: "",
      password: "",
      ownerName: "",
      dogUsername: "",
      dogName: "",
      dogBreed: "",
      dogGender: "",
      dogBirthday: "",
      dogLocation: "",
    };
    setUserData(currentData);
  }, []);

  return (
    <UserDataContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => React.useContext(UserDataContext);