import * as React from "react";

const defaultUserData = {
  email: "",
  password: "",
  is_admin: false,
  dogProfile: {
    owner_name: "",
    username: "",
    name: "",
    breed: "",
    gender: "",
    birthday: new Date(),
    location: "",
  }
};
export type UserDataType = {
  UserData: {
    email: string,
    password: string,
    is_admin: boolean,
    dogProfile: {
      owner_name: string,
      username: string,
      name: string,
      breed: string,
      gender: string,
      birthday: Date,
      location: string,
    }
  };
  setUserData: (value: {
    email: string,
    password: string,
    is_admin: boolean,
    dogProfile: {
      owner_name: string,
      username: string,
      name: string,
      breed: string,
      gender: string,
      birthday: Date,
      location: string,
    }
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
      is_admin: false,
      dogProfile: {
        owner_name: "",
        username: "",
        name: "",
        breed: "",
        gender: "",
        birthday: new Date(),
        location: "",
      }
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