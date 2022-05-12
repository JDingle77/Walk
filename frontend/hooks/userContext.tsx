import * as React from "react";

const defaultUserData = {
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


// export const handleChange = (UserData: UserDataType, text: string, name: string): void => {
//   // console.log(name);
//   UserDataProvider.setUserData({
//     ...UserData,
//     [name]: text
//   });
// };