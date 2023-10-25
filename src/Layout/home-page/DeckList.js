import React from "react";

import DeckSummaryView from "./DeckSummaryView";

function DeckList({ decks }) {
    return (
        <div>
            {decks.map((deck, index) => (
                <DeckSummaryView
                    key={`deck-${deck.id}`}
                    deck={deck}
                    isOdd={index % 2 !== 0}
                />)
            )}
        </div>
    );
}

export default DeckList;