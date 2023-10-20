import React from "react";

function CardFullView({ card }) {
    return (
        <div>
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <p className="card-text">{card.front}</p>
                        <p className="card-text">{card.back}</p>
                        <a href="#" className="btn btn-secondary">Edit</a>
                        <a href="#" className="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardFullView;