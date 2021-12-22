import CrawlerMethod from './methods/Crawler'
import HttpMethod from './methods/Http'
import SdkMethod from './methods/Sdk'

export default {
    crawler: new CrawlerMethod(),
    http: new HttpMethod(),
    sdk: new SdkMethod(),
}
