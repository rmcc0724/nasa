import axios from 'axios';
import { key, proxy } from '../config';

export default class Asteroid {
    constructor(id) {
        this.id = id;
    }

    async getAsteroid() {
        try {
            const res = await axios(`${proxy}https://api.nasa.gov/neo/rest/v1/neo/${this.id}?api_key=${key}`);
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    

}
