import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import CardForm from "../forms/CardForm";
import {createCard, readDeck} from "../../utils/api";




function CreateCard() {
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const { deckId } = useParams()
    const emptyCard = {id: '', front: '', back: '', deckId: deckId}
    useEffect( () => {
        const abortController = new AbortController()
        const fetchDeck = async () => {
            try {
                const deckJson = await readDeck(deckId, abortController.signal)
                setDeck(deckJson)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        fetchDeck();
        return () => abortController.abort()
    }, [deckId])
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
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
            <CardForm card={emptyCard} dbSubmit={addCard}/>
        </div>
    );
}

export default CreateCard;