import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import CardForm from "../forms/CardForm";
import {readCard, readDeck, updateCard} from "../../utils/api";




function EditCard() {
    const { deckId, cardId } = useParams()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
    useEffect(() => {
        const abortController = new AbortController()
        const fetchCard = async () => {
            try {
                const deckJson = await readDeck(deckId, abortController.signal)
                setDeck(deckJson)
                const cardJson = await readCard(cardId, abortController.signal)
                setCard(cardJson)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        fetchCard()
        return () => abortController.abort()
    }, []);
    const history = useHistory()
    const modifyCard = async (updatedCard, signal) => {
        try {
            await updateCard(updatedCard, signal)
            history.push(`/decks/${deckId}`)
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
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>Deck {deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            {card.id && <CardForm card={card} dbSubmit={modifyCard}/>}
        </div>
    );
}

export default EditCard;