import React, { useState, useEffect } from "react";
import {Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckBtn from "./features/deck/CreateDeckBtn";
import DeckList from "./features/deck/DeckList";
import Deck from "./features/deck/Deck";
import { listDecks } from "../utils/api/index"

function Layout() {
    const [decks, setDecks] = useState([])
    useEffect(async () => {
        const abortController = new AbortController()
        const decksJson =await listDecks(abortController.signal)
        setDecks(decksJson)
        return abortController.abort()
    }, [])

    const selectDeckById = (deckId) => {
        return decks.filter(deck => deck.id === deckId)[0]
    }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
          <Switch>
              <Route exact path='/'>
                  <CreateDeckBtn />
                  <DeckList decks={decks}/>
              </Route>
              <Route path={`/decks/:deckId`}>
                  <Deck findDeck={selectDeckById}/>
              </Route>
              <Route>
                  <NotFound />
              </Route>
          </Switch>
      </div>
    </>
  );
}

export default Layout;
