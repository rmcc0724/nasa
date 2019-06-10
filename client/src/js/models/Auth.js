import axios from 'axios';

export default class Authenticated {
    constructor() {
        this.token = localStorage.getItem('token'),
        this.isAuthenticated = null,
        this.user = null
    }

    async loadUser(getState) {
        // User loading
        try {
            const result = await axios(`http://localhost:5000/api/auth/user`, tokenConfig(getState));
            this.user = result.data;
            console.log("User Loaded");
            localStorage.setItem('user', JSON.stringify(this.user));
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
                this.token = result.data.token;
                console.log("User Registered");
                localStorage.setItem('token', JSON.stringify(this.token));
                }
            catch (error) {
                console.log("Error Happened " + error);
            }
        console.log("User Registration Done");
      };


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
                console.log("Log In Success!!");
                localStorage.setItem('token', JSON.stringify(this.token));
                }
            catch (error) {
                console.log("Log In Failed " + error);
            }
      };


    
    async logout() {
        localStorage.removeItem('token');
        this.token = null,
        this.user = null,
        this.isAuthenticated = false
      };

    // persistData() {
    //     localStorage.setItem('token', JSON.stringify(this.token));
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //     // console.log("persist " + this.users);
    //     // console.log("Data Persisted");
    // }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('user'));
        if (storage) this.user = storage;
    }

    // Setup config/headers and token
    tokenConfig(getState) {
        // Get token from localStorage
        const token = getState().auth.token;
    
        // Headers
        const config = {
        headers: {
            'Content-type': 'application/json'
        }
        };
    
        // If token, add to headers
        if (token) {
        config.headers['x-auth-token'] = token;
        }
    
        return config;
  };
}
