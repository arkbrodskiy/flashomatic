import React from "react";
import {Link, useHistory} from "react-router-dom";
import { listDecks, createDeck } from "../../../utils/api";

import DeckForm from "./DeckForm";



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
            <h2>Breadcrumb Navbar <Link to='/'>Home</Link></h2>
            <h3>Create Deck</h3>
            <DeckForm deck={emptyDeck} dbSubmit={addDeck}/>
        </div>
    );
}

export default CreateDeck;