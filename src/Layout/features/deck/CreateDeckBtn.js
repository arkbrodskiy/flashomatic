import React from "react";
import { Link } from "react-router-dom";

function CreateDeckBtn() {
    return (
        <div>
            <Link to='/decks/new' type="button" className="btn btn-secondary btn-lg">Create Deck</Link>
        </div>
    );
}

export default CreateDeckBtn;