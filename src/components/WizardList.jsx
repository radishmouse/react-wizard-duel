import React from 'react';

function WizardList(props) {
  return (
    <section>
      <h1>All Wizards</h1>
      <ul>
        {props.wizards.map(w => (
          <li
            key={w.id}
            onClick={() => props.chooseWizard(w.id)}
          >{w.name} ({w.occupation}): {w.house}</li>
        ))}
      </ul>

    </section>
  );
}

export default WizardList;
