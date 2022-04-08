import React, { useState, useEffect } from "react";

import { images } from "../helpers/pokemons";

export const Table = ({ setAttemps, seTmsg }) => {
  const [cards, setCards] = useState([]);

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
    return arr;
  };

  useEffect(() => {
    let list = [];

    for (let index = 0; index < 8; index++) {
      let random = Math.floor(Math.random() * 20 + 1);
      if (!list.includes(random)) {
        list.push(random);
      }
    }

    let tempList = [...list, ...list];
    let listShuffle = shuffle(tempList);
    // console.log(listShuffle);

    setCards(listShuffle || []);
  }, []);

  const [firstCard, setFirstCard] = useState("");
  const [firstIndex, setFirstIndex] = useState("");

  const [selectedCards, setselectedCards] = useState([]);

  const selectCard = (num, i) => {
    let temp = document.getElementById(`${num}${i}`);
    if (temp.checked) {
      temp.disabled = true
      if (!selectedCards.includes(`${num}${i}`)) {
        if (firstCard === "") {
          setFirstCard(num);
          setFirstIndex(i)
          console.log("Primera carta seleccionada");
        } else {
          console.log("Segunda carta seleccionada");
          setAttemps((prev) => prev + 1);

          console.log(firstCard, num)
          if (parseInt(firstCard) === parseInt(`${num}`)) {
            console.log("Las cartas son iguales");
            setselectedCards((prev) => {
              if ([...prev, `${num}${i}`].length === cards.length / 2) {
                console.log("Has ganado!");
                seTmsg("Has ganado!");
              }

              return [...prev, `${num}${i}`];
            });
          } else {
            console.log("Las cartas son diferentes");

            let cardTemp1 = document.getElementById(`${firstCard}${firstIndex}`);
            let cardTemp2 = document.getElementById(`${num}${i}`);

            setTimeout(() => {
              cardTemp1.checked = false;
              cardTemp2.checked = false;

              cardTemp1.disabled = false;
              cardTemp2.disabled = false;
            }, 500);
          }
          setFirstCard("");
        }
      }
    }
  };

  return (
    <>
      <div className="table">
        <div className="columns is-multiline">
          {cards?.map((card, i) => (
            <label key={`${card}${i}`} className="column is-flex">
              <input
                type="checkbox"
                id={`${card}${i}`}
                onClick={() => selectCard(card, i)}
              />
              <div class="card">
                <div class="front">Front</div>
                <div class="back">
                  <img src={images[`p${card}.png`].default} alt="" />
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
