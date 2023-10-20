import React from "react";

function DeckView({ deck }) {
    return (
        <div>
            <div className="card w-50">
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p>{deck.cards.length} cards</p>
                    <p className="card-text">{deck.description}</p>
                    <a href="#" className="btn btn-secondary">View</a>
                    <a href="#" className="btn btn-primary">Study</a>
                    <a href="#" className="btn btn-danger">Delete</a>
                </div>
            </div>
        </div>
    );
}

export default DeckView;