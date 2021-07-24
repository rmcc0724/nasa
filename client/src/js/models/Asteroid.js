import axios from 'axios';
import { key, proxy } from '../config';
export default class Asteroid {
    constructor(id) {
        this.id = id;
    }
    async getAsteroid() {
        console.log(`Get Astroid`);
        try {
            const res = await axios(`${proxy}https://api.nasa.gov/neo/rest/v1/neo/${this.id}?api_key=${key}`);
            this.name = res.data.name;
            this.diameter = res.data.estimated_diameter.miles.estimated_diameter_max;
            this.hazardous = res.data.is_potentially_hazardous_asteroid;
            this.miss_distance = res.data.close_approach_data;
        }
        catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
}