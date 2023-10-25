import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import CardList from "../card/CardList";
import {deleteDeck} from "../../../utils/api";

function DeckFullView({ deck }) {
    const { url } = useRouteMatch()
    const history = useHistory()
    const [deletePressed, setDeletePressed] = useState(false)
    useEffect( () => {
        const abortController = new AbortController()
        const removeDeck = async () => {
            try {
                if (window.confirm("Delete the deck? You will not be able to recover it")) {
                    await deleteDeck(deck.id, abortController.signal)
                    history.push('/')
                    history.go(0)
                } else history.go(0)

            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        if (deletePressed) removeDeck()
        return () => abortController.abort()
    }, [deletePressed])
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{deck.description}</p>
                        <div className="d-flex justify-content-between">
                            <div>

                                <Link to={`${url}/study`} className="btn btn-primary mr-2">Study</Link>
                                <Link to={`${url}/cards/new`} className="btn btn-primary">Add Cards</Link>
                            </div>
                            <div>
                                <Link to={`${url}/edit`} className="btn btn-secondary mr-2">Edit</Link>
                                <button onClick={() => setDeletePressed(true)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CardList cards={deck.cards} />
        </div>
    );
}

export default DeckFullView;