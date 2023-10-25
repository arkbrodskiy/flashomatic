import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function CreateDeckBtn() {
    return (
        <div>
            <Link to='/decks/new'
                  type="button"
                  className="btn btn-secondary btn-lg mb-3">
                {<FontAwesomeIcon icon={faPlus} />} Create Deck
            </Link>
        </div>
    );
}

export default CreateDeckBtn;