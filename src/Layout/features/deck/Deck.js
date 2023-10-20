import React from "react";
import {useParams, Link, Switch, Route, useRouteMatch } from "react-router-dom";

import CardList from "../card/CardList";
import DeckFullView from "./DeckFullView";

function Deck({ findDeck }) {
    const { deckId } = useParams();
    const deck = findDeck(parseInt(deckId))
    const {path} = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <DeckFullView deck={deck}/>
                </Route>
            </Switch>
        </div>
    );
}

export default Deck;