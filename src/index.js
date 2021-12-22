import HttpMethod from './methods/Http'
import SdkMethod from './methods/Sdk'

export default {
    http: new HttpMethod(),
    sdk: new SdkMethod(),
}
