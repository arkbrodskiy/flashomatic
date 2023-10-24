import React from "react";
import {Link, useHistory} from "react-router-dom";
import { updateDeck } from "../../../utils/api";

import DeckForm from "./DeckForm";



function EditDeck({deck}) {
    const history = useHistory()
    const modifyDeck = async (updatedDeck, signal) => {
        try {
            await updateDeck(updatedDeck, signal)
            history.push('/')
            history.go(0)
        } catch (err) {
            if (err.name !== 'AbortError') throw err
        }
    }
    return (
        <div>
            <h2>Breadcrumb Navbar <Link to='/'>Home</Link></h2>
            <h3>Edit Deck</h3>
            <DeckForm deck={deck} dbSubmit={modifyDeck}/>
        </div>
    );
}

export default EditDeck;