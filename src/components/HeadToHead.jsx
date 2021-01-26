import React, { useState } from 'react';

function HeadToHead({
  player1,
  player2
}) {
  const [isP1Turn, setIsP1Turn] = useState(false);
  const [message, setMessage] = useState('');

  function castSpell() {
    if (isP1Turn) {
      setMessage(`${player1.name} stupefies ${player2.name}`);
    } else {
      setMessage(`${player2.name} stupefies ${player1.name}`);
    }
    setIsP1Turn(!isP1Turn);
  }
  
  return (
    <section>
      <h2>
        {player1.name} vs {player2.name}
      </h2>
      <button onClick={castSpell}>cast</button>
      <p>
        {message}
      </p>
    </section>
  );
}

export default HeadToHead;
