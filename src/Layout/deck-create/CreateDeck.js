import React from "react";
import {Link, useHistory} from "react-router-dom";
import { listDecks, createDeck } from "../../utils/api";

import DeckForm from "../forms/DeckForm";



function CreateDeck() {
    const history = useHistory()
    const emptyDeck = {id: '', name: '', description: ''}
    const addDeck = async (newDeck, signal) => {
        try {
            const decks = await listDecks(signal)
            newDeck = {...newDeck, id: decks.length + 1}
            await createDeck(newDeck, signal)
            history.push(`/decks/${newDeck.id}`)
            history.go(0)
        } catch (err) {
            if (err.name !== 'AbortError') throw err
        }
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
            <DeckForm deck={emptyDeck} dbSubmit={addDeck}/>
        </div>
    );
}

export default CreateDeck;