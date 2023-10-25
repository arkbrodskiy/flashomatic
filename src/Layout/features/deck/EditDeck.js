import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import {readDeck, updateDeck} from "../../../utils/api";

import DeckForm from "./DeckForm";



function EditDeck() {
    const [deck, setDeck] = useState({})
    const { deckId } = useParams()
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
    const history = useHistory()
    const modifyDeck = async (updatedDeck, signal) => {
        try {
            await updateDeck(updatedDeck, signal)
            history.push('/')
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
                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </nav>
            <h3>Edit Deck</h3>
            {deck.id && <DeckForm deck={deck} dbSubmit={modifyDeck}/>}
        </div>
    );
}

export default EditDeck;