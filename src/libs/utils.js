import MD5 from 'crypto-js/md5'
import availableEventIds from '../eventList.json'

const API_URL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

const getHash = (ts) => MD5(ts + privateKey + apiKey).toString();

const fetchHomepageComicEvents = async () => {
  const eventUrl = `${API_URL}/v1/public/events`;
  const timeStamp = Date.now().toString();
  const hash = getHash(timeStamp, privateKey, apiKey);

  const numRandomEvents = 9;

  const shuffledEventIds = [...availableEventIds].sort(() => 0.5 - Math.random());
  const selectedEventIds = shuffledEventIds.slice(0, Math.min(numRandomEvents, shuffledEventIds.length));

  const eventsData = await Promise.all(
    selectedEventIds.map(async ({ value: eventId }) => {
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
          return data.data.results[0];
        }
      } catch (error) {
        console.error(`Error fetching data for event ID ${eventId}:`, error);
      }
      return null;
    })
  );

  return eventsData.filter((event) => event !== null);
};

const fetchCharactersByName = async (name, offset) => {
  let characterUrl = `${API_URL}/v1/public/characters`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${characterUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}&nameStartsWith=${name}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data.data.results);
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchCharacterById = async (id) => {
  let characterUrl = `${API_URL}/v1/public/characters/${id}`;

  let timeStamp = Date.now().toString()
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${characterUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchSeriesByCharacterId = async (id, offset) => {
  let seriesUrl = `${API_URL}/v1/public/characters/${id}/series`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${seriesUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchCreatorsByName = async (name, offset) => {
  let creatorUrl = `${API_URL}/v1/public/creators`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${creatorUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}&nameStartsWith=${name}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchCreatorById = async (id) => {
  let creatorUrl = `${API_URL}/v1/public/creators/${id}`;

  let timeStamp = Date.now().toString()
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${creatorUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchSeriesByCreatorId = async (id, offset) => {
  let storiesUrl = `${API_URL}/v1/public/creators/${id}/series`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${storiesUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchEventsByCreatorId = async (id, offset) => {
  let eventsUrl = `${API_URL}/v1/public/creators/${id}/events`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${eventsUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchSeriesByTitle = async (title, offset) => {
  let seriesUrl = `${API_URL}/v1/public/series`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${seriesUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}&titleStartsWith=${title}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchSeriesById = async (id) => {
  let seriesUrl = `${API_URL}/v1/public/series/${id}`;

  let timeStamp = Date.now().toString()
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${seriesUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchComicsBySeriesId = async (id, offset) => {
  let comicsUrl = `${API_URL}/v1/public/series/${id}/comics`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${comicsUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

}

const fetchCharactersBySeriesId = async (id, offset) => {
  let charactersUrl = `${API_URL}/v1/public/series/${id}/characters`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${charactersUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

}

const fetchEventsBySeriesId = async (id, offset) => {
  let eventsUrl = `${API_URL}/v1/public/series/${id}/events`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${eventsUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchCreatorsBySeriesId = async (id, offset) => {
  let creatorsUrl = `${API_URL}/v1/public/series/${id}/creators`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${creatorsUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

const fetchComicByTitleAndIssue = async (title, year, issue, offset) => {
  let comicUrl = `${API_URL}/v1/public/comics`;

  let timeStamp = Date.now().toString()
  let limit = 100
  let hash = getHash(timeStamp, privateKey, apiKey)

  let url = `${comicUrl}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}&titleStartsWith=${title}&startYear=${year}&issueNumber=${issue}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.data.results;
  } catch (err) {
    console.error(err);
    return;
  }

};

export {
    fetchHomepageComicEvents, 
    fetchCharactersByName, 
    fetchCharacterById, 
    fetchSeriesByCharacterId,
    fetchCreatorsByName,
    fetchCreatorById,
    fetchSeriesByCreatorId, 
    fetchEventsByCreatorId,
    fetchSeriesByTitle,
    fetchSeriesById,
    fetchComicsBySeriesId,
    fetchCharactersBySeriesId,
    fetchEventsBySeriesId,
    fetchCreatorsBySeriesId,
    fetchComicByTitleAndIssue
};