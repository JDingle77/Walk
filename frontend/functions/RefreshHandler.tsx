import { getValueFor, save } from "../functions/SecureStore";

export async function refreshHandler(): Promise<boolean>{
    var access_token = "";
    var refresh_token = "";
    await getValueFor("access_token").then((response) => access_token = response!);
    await getValueFor("refresh_token").then((response) => refresh_token = response!);
    await fetch("http://localhost:8000/auth/refresh/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({
        refresh: refresh_token,
      }),
    })
      .then((response) => 
      {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([statusCode, data]) => {
        console.log(statusCode);
        save("access_token",data.access);
      })
      .catch((err) => {
        console.error(err);
      });
      return false;
}