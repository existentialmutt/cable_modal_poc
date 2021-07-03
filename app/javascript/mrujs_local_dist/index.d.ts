import { Mrujs } from './mrujs';
import { FetchRequest } from './http/fetchRequest';
import { FetchResponse } from './http/fetchResponse';
declare global {
    interface Window {
        mrujs: Mrujs;
        Rails: Mrujs;
        Turbolinks?: any;
    }
}
declare const mrujs: Mrujs;
export { Mrujs };
export { FetchRequest, FetchResponse };
export default mrujs;
export { CableCar } from './plugins/cableCar';
//# sourceMappingURL=index.d.ts.map