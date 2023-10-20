import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=4fff097dace49e97bdb0d384fa5f71ab';
  const _baseOffset = 210;
  const _STR_LIMIT = 210;

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComic);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    return res.data.results.map(_transformCharacter);
  };

  const getAllCharacters = async (offset = 0) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description:
        comic.description || 'There is no description for this comic',
      pageCount: comic.pageCount
        ? `${comic.pageCount}p.`
        : 'No information about the number of pages',
      price:
        comic.prices[0].price === 0
          ? 'NOT AVAILABLE'
          : `${comic.prices[0].price}$`,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      language: comic.textObjects.language || 'en-us',
    };
  };

  const _transformCharacter = (char) => {
    let desc = char.description;

    if (desc.length >= _STR_LIMIT) {
      desc = `${desc.slice(0, _STR_LIMIT)}...`;
    }

    return {
      name: char.name,
      description: desc ? desc : 'There is no description for this character',
      //Another case
      //description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character'
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
      comicsCount: char.comics.items.length,
    };
  };

  return {
    clearError,
    process,
    setProcess,
    getCharacter,
    getCharacterByName,
    getAllCharacters,
    getComic,
    getAllComics,
  };
};

export default useMarvelService;
