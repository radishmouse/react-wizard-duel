import React, { useState } from 'react';

import PlayerChooser from './PlayerChooser';
import HeadToHead from './HeadToHead';

function Duel(props) {

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState(1);
  const [ready, setReady] = useState(false);
  
  const chooseWizard = (id) => {
    // id is a String and w.id is a Number.
    // need to do a loose comparison.
    const player = props.wizards.find(w => w.id == id);
    console.table(player);
    if (currentPlayerNumber === 1) {
      setPlayer1(player);
      setCurrentPlayerNumber(2);
    } else {
      setPlayer2(player);
      setReady(true);
    }
  };

  const filteredWizards = () => {
    // if we've chosen player1, filter them out.
    // otherwize return all the wizards

    if (player1) {
      return props.wizards.filter(w => w.id !== player1.id);
    } else {
      return props.wizards;
    }
  };
  
  return (
    <section>
      <h2>Duel</h2>
      { !ready && (        
        <PlayerChooser
          playerNumber={currentPlayerNumber}
          wizards={filteredWizards()}
          chooseWizard={chooseWizard}
        />                    
      )
      }
      {ready && player1 && player2 && (
        <HeadToHead player1={player1} player2={player2} />
      )
    }
    </section>
  );
}

export default Duel;
