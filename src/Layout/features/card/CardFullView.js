import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function CardFullView({ card }) {
    const {url} = useRouteMatch()
    return (
        <div>
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <p className="card-text">{card.front}</p>
                        <p className="card-text">{card.back}</p>
                        <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                        <a href="#" className="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardFullView;