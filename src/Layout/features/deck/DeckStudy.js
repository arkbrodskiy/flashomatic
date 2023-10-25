import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom"

import {readDeck} from "../../../utils/api";
import CardStudyContainer from "../card/CardStudyContainer";
import NotEnoughCards from "../../NotEnoughCards";


function DeckStudy() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})
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
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </nav>
            <h3>Study: {deck.name}</h3>
            {deck.id && deck.cards.length < 3 && <NotEnoughCards deck={deck}/>}
            {deck.id && deck.cards.length > 2 && <CardStudyContainer cards={deck.cards}/>}

        </div>
    );
}

export default DeckStudy;