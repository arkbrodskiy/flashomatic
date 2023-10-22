import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { updateDeck } from "../../../utils/api";



function DeckForm({formType, deck = {id: '', name: '', description: ''}}) {
    const [currentDeck, setCurrentDeck] = useState(deck)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const history = useHistory()
    useEffect( () => {
        const abortController = new AbortController()
        const modifyDeck = async () => {
            try {
                await updateDeck(currentDeck, abortController.signal)
                history.push('/')
                history.go(0)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        if (formSubmitted) {
            modifyDeck();
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
            <h2>Breadcrumb Navbar <Link to='/'>Home</Link></h2>
            <h3>{formType}</h3>
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
                <button className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default DeckForm;