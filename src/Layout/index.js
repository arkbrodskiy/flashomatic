import React, { useState, useEffect } from "react";
import {Switch, Route} from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckBtn from "./features/deck/CreateDeckBtn";
import DeckList from "./features/deck/DeckList";
import { listDecks } from "../utils/api/index"

function Layout() {
    const [decks, setDecks] = useState([])
    useEffect(async () => {
        const abortController = new AbortController()
        const decksJson =await listDecks(abortController.signal)
        setDecks(decksJson)
        return abortController.abort()
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
              <Route>
                  <NotFound />
              </Route>
          </Switch>
      </div>
    </>
  );
}

export default Layout;
