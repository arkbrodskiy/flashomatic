import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function NotEnoughCards({ deck }) {
    return (
        <div className="NotFound">
            <h2>Not enough Cards</h2>
            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck</p>
            <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary"
            >
                {<FontAwesomeIcon icon={faPlus} />} Add Cards
            </Link>
        </div>
    );
}

export default NotEnoughCards;