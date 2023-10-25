import React, {useEffect, useState} from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { deleteCard } from "../../../utils/api";

function CardFullView({ card }) {
    const history = useHistory()
    const [deletePressed, setDeletePressed] = useState(false)
    useEffect( () => {
        const abortController = new AbortController()
        const removeCard = async () => {
            try {
                if (window.confirm("Delete this card? You will not be able to recover it")) {
                    await deleteCard(card.id, abortController.signal)
                }
                history.go(0)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        if (deletePressed) removeCard()
        return () => abortController.abort()
    }, [deletePressed])
    const {url} = useRouteMatch()
    return (
        <div>
            <div className="card w-50">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <p className="card-text">{card.front}</p>
                        <p className="card-text">{card.back}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link
                            to={`${url}/cards/${card.id}/edit`}
                            className="btn btn-secondary mr-2"
                        >
                            {<FontAwesomeIcon icon={faPen} />} Edit
                        </Link>
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

export default CardFullView;