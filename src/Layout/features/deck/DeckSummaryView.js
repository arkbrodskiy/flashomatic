import React, {useEffect, useState} from "react";
import {Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faBookBookmark, faTrashCan } from '@fortawesome/free-solid-svg-icons'
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
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="text-muted">{deck.cards.length} cards</p>
                    </div>
                    <p className="card-text">{deck.description}</p>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link
                                to={`/decks/${deck.id}`}
                                className="btn btn-secondary"
                            >
                                {<FontAwesomeIcon icon={faEye} />} View
                            </Link>
                            <Link
                                to={`/decks/${deck.id}/study`}
                                className="btn btn-primary ml-2"
                            >
                                {<FontAwesomeIcon icon={faBookBookmark} />} Study
                            </Link>
                        </div>
                        <button
                            onClick={() => setDeletePressed(true)}
                            className="btn btn-danger"
                        >
                            {<FontAwesomeIcon icon={faTrashCan} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeckSummaryView;