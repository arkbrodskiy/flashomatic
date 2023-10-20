import React from "react";
import {Link} from "react-router-dom";

function DeckSummaryView({ deck }) {
    return (
        <div>
            <div className="card w-50">
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p>{deck.cards.length} cards</p>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                    <a href="#" className="btn btn-primary">Study</a>
                    <a href="#" className="btn btn-danger">Delete</a>
                </div>
            </div>
        </div>
    );
}

export default DeckSummaryView;