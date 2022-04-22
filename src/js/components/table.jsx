import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import images from '../helpers/pokemons';

function Table({ setAttemps, seTmsg }) {
  const [cards, setCards] = useState([]);
  // /* eslint-disable no-param-reassign */
  const shuffle = (arr) => {
    const tempArr = arr;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      tempArr[i] = arr[randomIndex];
      tempArr[randomIndex] = temp;
    }
    return tempArr;
  };

  useEffect(() => {
    const list = [];

    for (let index = 0; index < 8; index += 1) {
      const random = Math.floor(Math.random() * 20 + 1);
      if (!list.includes(random)) {
        list.push(random);
      }
    }

    const tempList = [...list, ...list];
    const listShuffle = shuffle(tempList);
    // console.log(listShuffle);

    setCards(listShuffle || []);
  }, []);

  const [firstCard, setFirstCard] = useState();
  const [firstIndex, setFirstIndex] = useState('');

  const [selectedCards, setselectedCards] = useState([]);

  const selectCard = (num, i) => {
    const temp = document.getElementById(`${num}${i}`);
    if (temp.checked) {
      temp.disabled = true;
      if (!selectedCards.includes(`${num}${i}`)) {
        if (firstCard === '') {
          setFirstCard(num);
          setFirstIndex(i);
        } else {
          setAttemps((prev) => prev + 1);

          if (parseInt(firstCard, 10) === parseInt(`${num}`, 10)) {
            setselectedCards((prev) => {
              if ([...prev, `${num}${i}`].length === cards.length / 2) {
                seTmsg('Has ganado!');
              }

              return [...prev, `${num}${i}`];
            });
          } else {
            const cardTemp1 = document.getElementById(`${firstCard}${firstIndex}`);
            const cardTemp2 = document.getElementById(`${num}${i}`);

            setTimeout(() => {
              cardTemp1.checked = false;
              cardTemp2.checked = false;

              cardTemp1.disabled = false;
              cardTemp2.disabled = false;
            }, 500);
          }
          setFirstCard('');
        }
      }
    }
  };

  return (
    <div className="table">
      <div className="columns is-multiline">
        {cards?.map((card, i) => (
          <label htmlFor={`${card}${i}`} key={card} className="column is-flex">
            <input
              type="checkbox"
              id={`${card}${i}`}
              onClick={() => selectCard(card, i)}
            />
            <div className="card">
              <div className="front">Front</div>
              <div className="back">
                <img src={images[`p${card}.png`]?.default} alt="pokemon" />
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

Table.propTypes = {
  setAttemps: PropTypes.func.isRequired,
  seTmsg: PropTypes.func.isRequired,
};
export default Table;
