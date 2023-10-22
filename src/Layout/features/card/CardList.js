import React from "react";

import CardFullView from "./CardFullView";


function CardList({ cards }) {
    return (
        <div>
            <h3>Cards</h3>
            {cards && cards.map(card => <CardFullView key={`card-${card.id}`} card={card}/>)}
        </div>
    );
}

export default CardList;