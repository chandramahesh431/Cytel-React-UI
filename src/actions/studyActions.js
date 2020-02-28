import getAPI from '../lib/Helper'
import axios from 'axios'
import { header } from '../lib/Helper'

export const getStudies = async () => {
    //const url = getAPI('getStudies')
    //   const url = "https://localhost:44391/api/studies";
    const url =
        'http://cyteltopapi-dev.ap-south-1.elasticbeanstalk.com/api/studies'
    const result = await axios({
        url,
        method: 'GET',
    })

    if (result) {
        return result.data
    } else {
        throw new Error('Something went wrong')
    }
}

export const createStudy = async study => {
    //const url = getAPI('createStudies')
    //const url = 'https://localhost:44391/api/studies'
    const url =
        'http://cyteltopapi-dev.ap-south-1.elasticbeanstalk.com/api/studies'
    const result = await axios({
        url,
        method: 'POST',
        data: study,
        header,
    })
    if (result.statusText) {
        return result.data
    } else {
        throw new Error('Something went wrong')
    }
}

export const deleteStudy = async id => {
    let url =
        'http://cyteltopapi-dev.ap-south-1.elasticbeanstalk.com/Cytel/DeleteById?id=' +
        id
    //url = `${url}/${id}`
    const result = await axios({
        url,
        method: 'DELETE',
        header,
    })
    if (result.statusText) {
        return result.data
    } else {
        throw new Error('Something went wrong')
    }
}
