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

  const availableEventIds = [320, 227, 303, 330, 240, 302, 255, 151, 270, 219, 316, 306]
  const numRandomEvents = 9;

  const eventsData = [];

  const shuffledEventIds = [...availableEventIds].sort(() => 0.5 - Math.random());

  for (let i = 0; i < Math.min(numRandomEvents, shuffledEventIds.length); i++) {

    const eventId = shuffledEventIds[i];

    const params = new URLSearchParams({
      apikey: apiKey,
      ts: timeStamp,
      hash: hash,
    });

    const url = `${eventUrl}/${eventId}?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.data && data.data.results) {
        eventsData.push(data.data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching data for event ID ${eventId}:`, error);
    }
    
  }

  return eventsData 

};

const fetchHeroesByName = async (name) => {
  let heroUrl = `${API_URL}/v1/public/characters`;

  let timeStamp = Date.now().toString()
  let apiKey = process.env.REACT_APP_API_KEY
  let privateKey = process.env.REACT_APP_PRIVATE_KEY
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${heroUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&nameStartsWith=${name}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.data.results);
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

export {fetchComicEvents, fetchHeroesByName};
