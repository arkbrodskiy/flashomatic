import React, { useState, useEffect } from "react";
import {Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckBtn from "./features/deck/CreateDeckBtn";
import DeckList from "./features/deck/DeckList";
import Deck from "./features/deck/Deck";
import {listDecks} from "../utils/api/index"

function Layout() {
    const [decks, setDecks] = useState([])
    useEffect( () => {
        const abortController = new AbortController()
        const fetchDecks = async () => {
            try {
                const decksJson =await listDecks(abortController.signal)
                setDecks(decksJson)
            } catch (err) {
                if (err.name !== 'AbortError') throw err
            }
        }
        fetchDecks()
        return () => abortController.abort()
    }, [])

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
                  <Deck />
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
