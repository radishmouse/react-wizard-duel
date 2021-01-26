import React, { useState, useEffect } from 'react';

/*
There are two ways to do the form:

- we could call useState() for each form field
  - tedious for longer forms, but probably OK for this app
- we could have useState store an object
  - this is more convenient but we have to be more clever with our onChange callback
*/

function WizardForm(props) {

  // if we were passed a wizard, use their info
  let initialData = {
    name: '',
    house: '',
    occupation: ''
  };

  if (props.wizard) {
    initialData = props.wizard;
  }
  
  const [name, setName] = useState(initialData.name);
  const [house, setHouse] = useState(initialData.house);
  const [occupation, setOccupation] = useState(initialData.occupation);

  // If they choose a different wizard to edit, I need to know...
  useEffect(() => {
    if (props.wizard) {
      setName(props.wizard.name);
      setHouse(props.wizard.house);
      setOccupation(props.wizard.occupation);
    }
  }, [props]);

  
  const saveWizard = (e) => {
    e.preventDefault(); // don't try to load a new page

    const w = {
      name,
      house,
      occupation
    };

    // if we were editing (and not creating) add the id from props
    if (props.wizard) {
      w.id = props.wizard.id;
    }
    
    // store the wizard using the function we were passed
    props.saveWizard(w);
    
    // clear the form
    setName('');
    setHouse('');
    setOccupation('');
    
    console.log('saved new wizard');
  };
  
  return (
    <section className="wizard-form">
      <h1>Wizard Form</h1>
      <form onSubmit={saveWizard}>
        <label>
          <span>Name:</span>
          <input
            placeholder="Severus Snape"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Occupation:</span>
          <input
            placeholder="Potions Master at Hogwarts"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>
        <label>
          <span>House:</span>
          <input
            placeholder="Slytherin"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
        </label>
        
        <br />
        <input type="submit" />
      </form>
    </section>
  );
  
}

export default WizardForm;
