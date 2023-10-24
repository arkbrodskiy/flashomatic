import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import CardForm from "./CardForm";
import { readCard, updateCard } from "../../../utils/api";




function EditCard() {
    const { deckId, cardId } = useParams()
    const [card, setCard] = useState({})
    useEffect(() => {
        const abortController = new AbortController()
        const fetchCard = async () => {
            try {
                const cardJson =await readCard(cardId, abortController.signal)
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
            <h2>Breadcrumb Navbar <Link to='/'>Home</Link></h2>
            <h3>Edit Card</h3>
            {card.id && <CardForm card={card} dbSubmit={modifyCard}/>}
        </div>
    );
}

export default EditCard;