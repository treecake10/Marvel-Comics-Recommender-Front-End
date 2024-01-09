import MD5 from 'crypto-js/md5'

const API_URL = process.env.REACT_APP_BASE_URL;

const getHash = (ts, secretKey, publicKey) => {
    return MD5(ts + secretKey + publicKey).toString()
}

const fetchComicEvents = async () => {

    let eventUrl = `${API_URL}/v1/public/events`

    let timeStamp = Date.now().toString()
    let apiKey = process.env.REACT_APP_API_KEY
    let privateKey = process.env.REACT_APP_PRIVATE_KEY
    let hash = getHash(timeStamp, privateKey, apiKey)

    let url = `${eventUrl}?apikey=${apiKey}&ts=${timeStamp}&hash=${hash}`

    try {
        let response = await fetch(url)
        let data = await response.json()
        return data
    } catch (err) {
        console.error(err)
        return
    }

    
};

export {fetchComicEvents};
