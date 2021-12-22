const AuthHeader = () => {
    const TOKEN = "poc-token";

    const tokenStr = localStorage.getItem(TOKEN);

    let token = null;
    if (tokenStr)
        token = JSON.parse(tokenStr);
  
    if (token && token.access_token) {
        return { "Authorization": 'Bearer ' + token.access_token };                
      //return { 'x-access-token': token.access_token };  // for Node.js Express back-end
    } else {
      return {};
    }
  }

  export default AuthHeader;