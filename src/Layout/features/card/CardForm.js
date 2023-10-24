import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";



function CardForm({card, dbSubmit}) {
    const [currentCard, setCurrentCard] = useState(card)
    const [formSubmitted, setFormSubmitted] = useState(false)
    useEffect( () => {
        const abortController = new AbortController()
        if (formSubmitted) {
            dbSubmit(currentCard, abortController.signal);
            return () => abortController.abort()
        }
    }, [formSubmitted])
    const handleChange = ({target}) => {
        setCurrentCard({...currentCard, [target.name]: target.value })
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        setFormSubmitted(true)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cardFront">Front</label>
                    <textarea
                        className="form-control"
                        id="cardFront"
                        name="front"
                        rows={3}
                        placeholder="Front side of card"
                        value={currentCard.front}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardBack">Back</label>
                    <textarea
                        className="form-control"
                        id="cardBack"
                        name="back"
                        rows={3}
                        placeholder="Back side of card"
                        value={currentCard.back}
                        onChange={handleChange}
                    />
                </div>
                <Link to={`/decks/${card.deckId}`} className="btn btn-secondary">Done</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default CardForm;