import React, { useEffect, useState } from "react";
import {useParams, Link, Switch, Route, useRouteMatch } from "react-router-dom";

import DeckFullView from "./DeckFullView";
import DeckForm from "./DeckForm";
import { readDeck } from "../../../utils/api";

function Deck() {
    const [deck, setDeck] = useState({deck: 'empty'})
    const { deckId } = useParams()
    const {path} = useRouteMatch()

    useEffect( () => {
        const abortController = new AbortController()
        const fetchDeck = async () => {
            try {
                const deckJson = await readDeck(deckId, abortController.signal)
                setDeck(deckJson)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        fetchDeck();
        return () => abortController.abort()
    }, [deckId])
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <DeckFullView deck={deck}/>
                </Route>
                <Route path={`${path}/edit`}>
                    <DeckForm formType={'Edit Deck'} deck={deck}/>
                </Route>
            </Switch>
        </div>
    );
}

export default Deck;