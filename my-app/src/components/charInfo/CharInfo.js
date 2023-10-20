import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CharForm } from '../charForm/CharForm';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { process, setProcess, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateCharacter();
  }, [props.charId]);

  const updateCharacter = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharacterLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharacterLoaded = (char) => {
    setChar(char);
  };

  return (
    <div>
      <div className="char__info">
        {setContent(process, View, char, props.scrollPosition)}
      </div>
      <CharForm />
    </div>
  );
};

const View = ({ data, scrollPosition }) => {
  const _COMICS_LIMIT = 9;
  const { name, description, thumbnail, homepage, wiki, comics, comicsCount } =
    data;
  let clazz = 'char__info-img';
  if (thumbnail.includes('image_not_available')) {
    clazz += ' char__info-img404';
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} className={clazz} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics: </div>
      <ul className="char__comics-list">
        {comicsCount > 0
          ? null
          : 'There are no comics with selected character!'}
        {comics.slice(0, 10).map((item, i) => {
          const comicId = item.resourceURI.substring(43);
          return (
            <Link
              key={i}
              className="char__comics-item"
              to={`/comics/${comicId}`}
            >
              {item.name}
            </Link>
          );
        })}
      </ul>

      {scrollPosition === 0 ? null : (
        <button className="button button__main button__long">
          <div
            className="inner"
            onClick={() => {
              window.scrollTo({
                top: scrollPosition,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            Go down <br />
            &darr;
          </div>
        </button>
      )}
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
