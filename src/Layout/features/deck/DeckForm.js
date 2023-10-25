import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";



function DeckForm({deck, dbSubmit}) {
    const [currentDeck, setCurrentDeck] = useState(deck)
    const [formSubmitted, setFormSubmitted] = useState(false)
    useEffect( () => {
        const abortController = new AbortController()
        if (formSubmitted) {
            dbSubmit(currentDeck, abortController.signal);
            return () => abortController.abort()
        }
    }, [formSubmitted])
    const handleChange = ({target}) => {
        setCurrentDeck({...currentDeck, [target.name]: target.value })
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        setFormSubmitted(true)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="deckName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="deckName"
                        name="name"
                        aria-describedby="deckNameHelp"
                        placeholder="Deck name"
                        value={currentDeck.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deckDescription">Description</label>
                    <textarea
                        className="form-control"
                        id="deckDescription"
                        name="description"
                        rows={3}
                        placeholder="Brief description of the deck"
                        value={currentDeck.description}
                        onChange={handleChange}
                    />
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default DeckForm;