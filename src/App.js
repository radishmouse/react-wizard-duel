import wizardsArray from './wizards';

import Home from './components/Home';
import Duel from './components/Duel';
import WizardList from './components/WizardList';
import WizardForm from './components/WizardForm';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [page, setPage] = useState('home');
  const [wizards, setWizards] = useState(wizardsArray);
  const [id, setId] = useState(''); // for editing a wizard

  function chooseWizard(wizardId) {
    console.log('choosing to edit', wizardId);
    setId(wizardId);
    setPage('edit');
  }
  
  function saveWizard(wizard) {
    if (wizard.id) {
      // if they already have an ID, that means we're updating
      // so, we can map over our existing wizards.
      // if the id matches, we return the wizard argument.
      // if the id does not match, just return the wizard we're on in the loop
      const updatedWizards = wizards.map(w => {
        if (w.id === wizard.id) {
          return wizard;
        } else {
          return w;
        }
      });
      // one-line equlivalent: wizards.map(w => w.id === wizard.id ? wizard : w)

      setWizards(updatedWizards);

      // then go "home"
      setPage('home');

    } else {
      // otherwise, we generate an ID for the new wizard
      wizard.id = uuidv4();

      // pass a NEW array to setWizards()
      // spread the old wizards
      // include the new wizard
      setWizards([
        ...wizards,
        wizard
      ]);


    }
  }
  
  return (
    <div className="App">
      <h1>{page}</h1>
      <nav>
        <ul>
          <li onClick={() => setPage('home')}>Home</li>
          <li onClick={() => setPage('create')}>Create</li>

          <li onClick={() => setPage('duel')}>Duel!</li>
        </ul>
    </nav>
      { wizards.length > 0 && (
        <WizardList
          wizards={wizards}
          chooseWizard={chooseWizard}
        />
      ) }
      { page === 'home' && <Home /> }
      { page === 'create' && <WizardForm saveWizard={saveWizard} /> }
      { page === 'edit' && id !== '' && (
        <WizardForm
          saveWizard={saveWizard}
          wizard={wizards.find(w => w.id === id)}
        />
      )}
      { page === 'duel' && <Duel wizards={wizards}/> }
      
    </div>
  );
}

export default App;
