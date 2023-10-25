import React, {useEffect, useState} from "react";
import {Link, useHistory } from "react-router-dom";
import {deleteDeck} from "../../../utils/api";

function DeckSummaryView({ deck }) {
    const history = useHistory()
    const [deletePressed, setDeletePressed] = useState(false)
    useEffect( () => {
        const abortController = new AbortController()
        const removeDeck = async () => {
            try {
                if (window.confirm("Delete the deck? You will not be able to recover it")) {
                    await deleteDeck(deck.id, abortController.signal)
                }
                history.go(0)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        if (deletePressed) removeDeck()
        return () => abortController.abort()
    }, [deletePressed])
    return (
        <div>
            <div className="card w-50">
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p>{deck.cards.length} cards</p>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                    <button onClick={() => setDeletePressed(true)} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeckSummaryView;