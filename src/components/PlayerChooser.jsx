import React, { useState } from 'react';

function PlayerChooser(props) {

  const [id, setId] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('choosing player', id);
    if (id !== 0) {      
      props.chooseWizard(id);
    }
  };
  
  return (
    <section>
      <h3>Player {props.playerNumber}</h3>
      <form onSubmit={onSubmit}>
        <select onChange={(e) => {
          setId(e.target.value);
        }}>
          <option value="0">--Choose a Wizard--</option>
          {props.wizards.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
        <input type="submit" value="next" />
      </form>
    </section>
  );
}

export default PlayerChooser;
