export default function AuthHeader() {
    const TOKEN = "poc-token";

    const userStr = localStorage.getItem(TOKEN);

    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.accessToken) {
       return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot, Symfoni or DJango back-end
      //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }