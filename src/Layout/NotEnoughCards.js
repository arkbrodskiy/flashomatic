import React from "react";

function NotEnoughCards({ numCards }) {
    return (
        <div className="NotFound">
            <h2>Not enough Cards</h2>
            <p>You need at least 3 cards to study. There are {numCards} cards in this deck</p>
            <button className="btn btn-primary">Add Cards</button>
        </div>
    );
}

export default NotEnoughCards;