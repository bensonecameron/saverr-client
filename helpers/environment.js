let APIURL = "";

switch (window.location.hostname) {
  //this is the local host name of your react app
  case "localhost" || "127.0.0.1":
    // this is the localhost name of your API
    APIURL = "https://cbsaverr.herokuapp.com";
    break;
  // this is the deployed react application
  case "wd54-todo.herokuapp.com":
    APIURL = "https://cbsaverr.herokuapp.com";
}

export default APIURL;
