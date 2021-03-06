import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.query}&end_date=${this.query}&api_key=${key}`);
            this.result = res.data.near_earth_objects;
            console.log(this.result);
        }
        catch (error) {
            alert(`There was an error in your search.`);
        }
    }
}