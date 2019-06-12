import axios from 'axios';

export default class Authenticated {
    constructor() {
        this.token = localStorage.getItem('token');
        this.isAuthenticated = null;
        this.user = null;
    }

    async loadUser(token) {
        // User loading
        try {
            const result = await axios(`http://localhost:5000/api/auth/`, this.tokenConfig(token));
            this.user = result.data;
            this.isAuthenticated = true;
            console.log("User Loaded");
        }
        catch (error) {
            console.log("Error Happened " + error);
        }
        console.log("User Load Done");
    }

    // Register User
    async register({ name, email, password }) {
        // Headers
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
      
        // Request body
        const body = JSON.stringify({ name, email, password });

            try {
                const result = await axios.post(`http://localhost:5000/api/users`, body, config);
                console.log("User Registered");
                }
            catch (error) {
                console.log("User already Registered");
            }
        console.log("Registration Function Done");
      };

    //User LogIn
    //'api/auth'

    async login({ email, password }){
    // Headers
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
      
        // Request body
        const body = JSON.stringify({ email, password });
            try {
                const result = await axios.post(`http://localhost:5000/api/auth`, body, config);
                this.token = result.data.token;
                this.user = result.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('token', JSON.stringify(this.token));
                console.log("User logged in")
                }
            catch (error) {
                console.log("Log In Failed " + error);
            }
      };

    //User LogOut
    async logout() {
        localStorage.removeItem('token');
        this.token = false;
        this.user = null,
        this.isAuthenticated = false
        console.log("User logged out")
      };

    // Setup config/headers and token
    tokenConfig(token) {
        // Headers
        const config = {
        headers: {
            'Content-type': 'application/json'
        }
        };
        // If token, add to headers
        if (token) {
        config.headers['x-auth-token'] = token.replace(/\"/g, "");
        }
        return config;
  };
}
