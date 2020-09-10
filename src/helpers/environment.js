let APIURL = "http://localhost:3001";

switch (window.location.hostname) {
  //this is the local host name of your react app
  case "localhost" || "127.0.0.1":
    // this is the localhost name of your API
    APIURL = "http://localhost:3001";
    break;
  // this is the deployed react application
  case "wd54-todo.herokuapp.com":
    APIURL = "http://localhost:3001";
}

export default APIURL;
