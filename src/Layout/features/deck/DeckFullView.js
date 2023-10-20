import React from "react";
import {useParams, Link} from "react-router-dom";

import CardList from "../card/CardList";

function DeckFullView({ findDeck }) {
    const { deckId } = useParams();
    const deck = findDeck(parseInt(deckId))
    return (
        <div>
            <h2>Breadcrumb Navbar <Link to='/'>Home</Link></h2>
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{deck.description}</p>
                        <a href="#" className="btn btn-secondary">Edit</a>
                        <a href="#" className="btn btn-primary">Study</a>
                        <a href="#" className="btn btn-primary">Add Cards</a>
                        <a href="#" className="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
            <CardList cards={deck.cards}/>
        </div>
    );
}

export default DeckFullView;