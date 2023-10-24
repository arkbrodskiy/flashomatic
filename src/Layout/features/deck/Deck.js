import React, { useEffect, useState } from "react";
import {useParams, Switch, Route, useRouteMatch } from "react-router-dom";

import DeckFullView from "./DeckFullView";
import EditDeck from "./EditDeck";
import DeckStudy from "./DeckStudy";
import CreateCard from "../card/CreateCard";
import EditCard from "../card/EditCard";
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
                    <EditDeck deck={deck}/>
                </Route>
                <Route path={`${path}/study`}>
                    <DeckStudy />
                </Route>
                <Route path={`${path}/cards/new`}>
                    <CreateCard deck={deck} />
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <EditCard />
                </Route>
            </Switch>
        </div>
    );
}

export default Deck;