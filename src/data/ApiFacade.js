function getResultOrError(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() })
    }
   //  console.log(res.json());
    return res.json();
   }

class ApiFacade {
    urls = {
      quest: 'http://localhost:8080/quest',
      query: 'http://localhost:8080/query',
      answer: 'http://localhost:8080/evaluate/CHOICE'
    };

    fetchData = (ressource) => {
      console.log('ressource: ',this.urls[ressource.request]);
        const url = this.urls[ressource.request]+'/'+ressource.id;
        console.log('fetch data url: ',url);
        const options = this.makeOptions("GET",false); //True add's the token
        return fetch(url, options).then(getResultOrError);
       }
    postData = (ressource) => {
      console.log('POST to ressource: ',this.urls[ressource.request]);
        const id = ressource.id;
        const url = this.urls[ressource.request]+'/'+id;
        const data = ressource.data;
        console.log('fetch data url: ',url);
        const options = this.makeOptions("POST",false,data); //True add's the token
        return fetch(url, options).then(getResultOrError);
       }


    makeOptions(method,addToken,body) {
      var opts = {
        method: method,
        headers: {
          "Content-type": "application/json",
          'Accept': 'application/json',
        }
      }
      if (addToken && this.loggedIn()) {
        opts.headers["x-access-token"] = this.getToken().token;
      }
      if (body) {
        opts.body = JSON.stringify(body);
      }
      return opts;
    }
    login = (user, pass) => {
       const options = this.makeOptions("POST", true,{ username: user, password: pass });
       return fetch(URL + "/api/login", options, true)
         .then(getResultOrError)
         .then(res => { 
             // console.log(res);
             this.setToken(res.token,user) })
     }

      
    setToken = (token, username) => {
       localStorage.setItem('jwtToken', token);
       localStorage.setItem('username',username);
     }
     getToken = () => {
       const token = localStorage.getItem('jwtToken');
       const username = localStorage.getItem('username');
       return token && username?{token,username}:null;
     }
     loggedIn = () => {
       const loggedIn = this.getToken() != null;
       return loggedIn;
     }
     logout = () => {
       localStorage.removeItem("jwtToken");
     }
    
}
const facade = new ApiFacade();
export default facade;
   