import axios from 'axios';
import { key, proxy } from '../config';

export default class Asteroid {
    constructor(id) {
        this.id = id;
    }

    async getAsteroid() {
        try {
            const res = await axios(`${proxy}https://api.nasa.gov/neo/rest/v1/neo/${this.id}?api_key=${key}`);
            this.name = res.data.name;
            this.diameter = res.data.estimated_diameter.miles.estimated_diameter_max;
            this.hazardous = res.data.is_potentially_hazardous_asteroid;
            this.miss_distance = res.data.close_approach_data;

            // console.log(`Name: ${this.name}`);
            // console.log(`Diameter: ${this.diameter} miles`);
            // console.log(`Hazardous: ${this.hazardous}`);
            // console.log(' ');
            // console.log(`Close Approach Data:`);
            // this.miss_distance.forEach(e => {
            //     console.log(`Date: ${e.close_approach_date}`);
            //     console.log(`Miss Distance: ${e.miss_distance.miles} miles`);
            //     console.log(`Orbiting Body: ${e.orbiting_body}`);
            //     console.log(`Relative Velocity: ${e.relative_velocity.miles_per_hour} mph`);
            //     console.log(' ');
            // });
        }
        catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }



}
