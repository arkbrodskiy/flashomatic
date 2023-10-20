import React from "react";

import DeckView from "./DeckView";

function DeckList({ decks }) {
    return (
        <div>
            {decks.map(deck => <DeckView key={`deck-${deck.id}`} deck={deck}/>)}
        </div>
    );
}

export default DeckList;