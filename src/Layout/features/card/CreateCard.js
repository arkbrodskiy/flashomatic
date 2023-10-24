import React from "react";
import {Link, useHistory} from "react-router-dom";

import CardForm from "./CardForm";
import { createCard } from "../../../utils/api";




function CreateCard({ deck }) {
    const history = useHistory()
    const emptyCard = {id: '', front: '', back: '', deckId: deck.id}
    const addCard = async (newCard, signal) => {
        try {
            newCard = {...newCard, id: deck.cards.length + 10}
            await createCard(deck.id, newCard, signal)
            history.push(`/decks/${deck.id}`)
            history.go(0)
        } catch (err) {
            if (err.name !== 'AbortError') throw err
        }
    }
    return (
        <div>
            <h2>Breadcrumb Navbar <Link to='/'>Home</Link></h2>
            <h3>{deck.name}: Add Card</h3>
            <CardForm card={emptyCard} dbSubmit={addCard}/>
        </div>
    );
}

export default CreateCard;