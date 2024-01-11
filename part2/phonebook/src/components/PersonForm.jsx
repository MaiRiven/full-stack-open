import Part from "./Part"
import Button from "./Button"

const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <Part text='name:' value={newName} onChange={handleNewName} />
            <Part text='number:' value={newNumber} onChange={handleNewNumber} />
            <Button text='add' type='submit' />
        </form>
    )
}

export default PersonForm