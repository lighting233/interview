import Axios from './Axios';
import { AxiosInstance } from './types'
function createInstance() {
    let context: Axios<any> = new Axios();
    let instance: AxiosInstance = Axios.prototype.request.bind(context);
    instance = Object.assign(instance, Axios.prototype, context);
    return instance;
}

let axios = createInstance();

export default axios;
export * from './types'