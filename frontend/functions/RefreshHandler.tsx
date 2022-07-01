import { getValueFor, save } from "../functions/SecureStore";

// attempt to refresh access token
async function refreshHandler() {
  var access_token = "";
  var refresh_token = "";
  await getValueFor("access_token").then((response) => access_token = response!);
  await getValueFor("refresh_token").then((response) => refresh_token = response!);
  let response = await fetch("http://localhost:8000/auth/refresh/", {
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
  return response
}

// indicates whether refresh attempt was successful or not
export function refreshAccess() {
  return new Promise<void> ((resolved, rejected) => {
    refreshHandler().then((response) => 
    {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    })
    .then(([statusCode, data]) => {
      if (statusCode >= 200 && statusCode < 300)
      { // received new access token
        save("access_token",data.access);
        resolved()
      }
      else // refresh token is invalid
        rejected()
    })
    .catch((err) => {
      console.error(err);
    });
  });
}