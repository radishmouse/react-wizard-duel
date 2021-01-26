
# Wizard Duel

Demos forms and `useState()`.

Two components need `useEffect()` to update state when new props are passed.

Creates unique ID with the uuid npm package: `yarn add uuid`

---

# Notes and thought process

where to start?

How about a form for creating a Wizard.
It needs its own state (because each of the form elements will be a controlled component).

As you type and click, we could also have a WizardCard that shows the Wizard's info...but that's not the focus right now.

And, it would require either:
- rendering a child so that we can pass the current props to it
- or sending the wizard info through a callback up to a parent (who would then pass it down to the WizardCard)

Considering whether I should conditionally render the `<h1>` of the WizardForm so that it can either say "Create New" or "Edit {name}"

For now, sticking with "create"

Created a nav that sets a page name in App state
Conditionally rendering a Home and WizardForm

Adding a 'browse' page that shows a WizardList

Considering how to store multiple wizards.
Either we keep an obj (with id as key) or an array of objects.
Since we'd normally get an array of objects back from an API, let's do that.
We'll generate a unique ID using https://github.com/uuidjs/uuid


The wizard form has gotten a little complicated because I'm reusing it for editing.

One problem is that after saving the form, the fields clear out (because that's what you'd expect). But the specific wizard is technically still loaded.

And the nav has gotten weird. We're always listing the wizards, we can click a wizard to pull up the editing form. But this means we might be on the 'create' page...meaning you see two forms on the screen.

I've made it so that clicking one of the wizards in the list sets the page to 'edit' and I've added another condition to the rendering of the edit form.

To know what page I'm on, I'm rendering it at the top of App.

Another weird thing, re: editing. If I'm editing, I should pass the wizard's data to useState(). So, I've created an `initialData` object with blank values for name, occupation, and house. If a wizard was passed via props. I just set initialData to that wizard object.

I tried doing `props.wizard.name || ''`, but if now wizard is passed, then you get an error (because you can't props.`undefined`.name --- that's an error).

So far, all good. there's no real dueling yet.

How will dueling work?
I can create a Duel component that receives all the wizards as props.
It can have state for two wizards (basically two slots)

And then it can show the two wizards and a list of spells they can cast.
Essentially, you take turns casting spells and it's just a madlib. ("Hermione casts stupefy on Ron");

I could add an effect... ("Hermione casts stupefy on Ron. Ron gets stupid.")

I could make a form for creating spells along with their effects.

And there's no end to the duel. You just navigate away.

There's got to be an idea of "who's turn is it?"
So, I need a third piece of state. Essentially which of the two wizards (player 1 or player 2) we're currently on. Alternatively, I could do a boolean that I just flip back and forth.

Dueling becomes...a mini app in itself.
Yeah, thinking about how complex this will be...

- before we choose two wizards, we only show the list.
- I can a drop down list and label it player 1
- I'd need a "next" button
- then I show a drop down with the remaining wizards and label it player 2

once both players are chosen, I then show the main dueling component

For the dropdown...is that `onChange` for the `<select>`? Need to check the docs. Also, I can experiment with the event handler and do `console.log()`


Bug found: if I choose a wizard for editing, I can't choose a different wizard without navigating away. Reason: I'm not passing state directly to the WizardForm. So, React doesn't know to re-render.

Need another piece of state.
And [id, setId] becomes unnecessary.

Hmmm... is it actually that the bug is in WizardForm?
Since I've received new props, but the form is already loaded. (We only look at props.wizard for the initial value to pass to useState).

I need a hook for knowing when I've received new props.
When I have a new wizard, I need to call setName, setHouse, etc.

Yep. I need `useEffect()`
OK, that fixed it.
We call useEffect and tell it that we want to run if props have changed.

Back to the Duel...
It is `event.target.value` that I can use on the `onChange`.

OK, on PlayerChooser, I need a way to signal back to the Duel that I've chosen a player.
The form needs an onSubmit, but only the select knows which player got chosen. In order for these two to talk, I need some state.

Back in the duel, I need to pass it a function for choosing a wizard.
It was getting a little wordy, so I've moved it out of the prop and into a named function. I don't need a closure so, this is totally OK.

Alright, those are wired up (when we submit the form in PlayerChooser, it calls the chooseWizard function in Duel). But...I'm not getting a player object.

Found the bug: in chooseWizard, I'm doing a .find and doing `w.id === id`. This never matches because the form (in PlayerChooser) sends a string. Each wizard's id is a number. So, I need to do a loose comparison with `==`.

Now that I can choose two players...I need them to take turns and write out the madlibs.

For now, they'll just stuepfy.
I could create a separate component, but I'd need to duplicate all the info about the two players and who's turn it is (currentPlayerNumber).

It's not a lot of duplication, but could get tedious...
Alternatively, it makes the Duel less cluttered.

But: my players aren't getting chosen.
That is, if I want to choose the first player (shown by default in the dropdown), I have to click a different player, then click the one I want before I submit.
I need another option like "choose a player" and I need to tell the form not to submit if they don't have a valid choice.

OK, implemented a basic message "so and so stupefies other wizard"

Now, a new bug: can't create a wizard because of useEffect trying to get the info out of props.wizard.

Adding a feature: don't let a wizard battle themselves.
If fitler out player1 if we're selecting player2.

Improvement: my WizardForm could probably just rely on `useEffect()` for setting state from props. I probably don't need the whole `initialData` thing.

Implements a Winner component to show after a random number of turns.
Also needed a reset button (in addition to resetting if we got a fresh set of players). Reset needs to be called from `useEffect()` if we get new players.
