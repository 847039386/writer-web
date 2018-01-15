
import Conf from '../../conf'

const GetURL = (path ) => {
    const host = Conf.host + '/v1' || 'http://test.com/'
    var dramas = new RegExp("^"+host+ path +"(\\?.+)?$")
    return dramas
}






export { GetURL  }