import React from "react";

import CardFullView from "./CardFullView";


function CardList({ cards }) {
    return (
        <div>
            <h3 className="my-3">Cards</h3>
            {cards && cards.map((card, index) => (
                <CardFullView
                    key={`card-${card.id}`}
                    card={card}
                    isOdd={index % 2 !== 0}
                />)

            )}
        </div>
    );
}

export default CardList;