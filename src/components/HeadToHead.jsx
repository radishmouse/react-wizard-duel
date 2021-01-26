import React, { useState, useEffect } from 'react';
import { getRandomInt } from '../utils';

import Winner from './Winner';

function HeadToHead(props) {
  const {
    player1,
    player2
  } = props;
  const [isP1Turn, setIsP1Turn] = useState(false);
  const [message, setMessage] = useState('');

  // randomly generated number of turns
  const [totalTurns, setTotalTurns] = useState(getRandomInt(10));
  // number of turns already played
  const [turns, setTurns] = useState(0);
  
  function castSpell() {
    if (isP1Turn) {
      setMessage(`${player1.name} stupefies ${player2.name}`);
    } else {
      setMessage(`${player2.name} stupefies ${player1.name}`);
    }
    setIsP1Turn(!isP1Turn);
    setTurns(turns + 1);
  }

  function reset() {
    setTurns(0);
    setTotalTurns(getRandomInt(10));
  }

  useEffect(() => {
    reset();
  }, [props]);
  
  return (
    <section>
      <h2>
        {player1.name} vs {player2.name}
      </h2>
      { turns === totalTurns ? (
        <>
          <Winner player={ isP1Turn ? player1 : player2 }/>
          <button onClick={reset}>reset</button>
        </>        
      )
        : (
          <>
            <button onClick={castSpell}>cast</button>
            <p>
              {message}
            </p>
          </>
        ) }
    </section>
  );
}

export default HeadToHead;
