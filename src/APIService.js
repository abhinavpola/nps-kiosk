import axios from 'axios';

export class APIService {
    constructor() {

    }
    
    getCards() {
        const url = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=8IM8T7wUtRMc8yiwfTaaWeTXMDJeEXhmZWDdmJ1b"
        return axios.get(url)
        .then(response => console.log(response.data));
    }
}