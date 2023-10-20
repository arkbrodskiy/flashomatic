import React from "react";

import DeckSummaryView from "./DeckSummaryView";

function DeckList({ decks }) {
    return (
        <div>
            {decks.map(deck => <DeckSummaryView key={`deck-${deck.id}`} deck={deck}/>)}
        </div>
    );
}

export default DeckList;