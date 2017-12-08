
import Conf from '../conf'

const GetURL = (path ) => {
    const host = Conf.host || 'http://test.com/'
    var dramas = new RegExp("^"+Conf.host+ path +"(\\?.+)?$")
    return dramas
}






export { GetURL  }