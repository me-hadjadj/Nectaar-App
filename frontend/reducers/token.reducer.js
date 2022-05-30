export default function (tokenRedux = "", action) {
    if (action.type === "addToken") {
      let newTokenRedux = action.token;
      console.log("log new Token :", newTokenRedux);
      return newTokenRedux;
    }else if(action.type === 'deleteToken'){
      return "";
    }else{
      return tokenRedux;
    }
  }