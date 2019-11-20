import axios from 'axios'
import {Event} from "./agents/Event";

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'https://mock-api.drinks.test.siliconrhino.io';
export default {
    Event: Event
};
