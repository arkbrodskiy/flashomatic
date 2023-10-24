import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

import CardStudyView from "./CardStudyView";

function CardStudyContainer({ cards }) {
    const [idx, setIdx] = useState(0)
    const [card, setCard] = useState(cards[idx])
    const [displayFront, setDisplayFront] = useState(true)
    const numCards = cards.length
    const history = useHistory()
    const updateIdx = (idx) => {
        if (idx === numCards - 1) {
            if (window.confirm("Restart Cards? Click Cancel to return to the home page")) {
                setIdx(0)
            } else history.push('/')
        } else setIdx(idx + 1)
    }
    const toggleSide = () => {
        setDisplayFront(!displayFront)
    }
    useEffect(() => {
        setCard(cards[idx])
        setDisplayFront(true)
    }, [idx])
    return (
        <div>
            <h3>CardStudyContainer</h3>
            <CardStudyView
                card={card}
                idx={idx}
                numCards={numCards}
                updateIdx={updateIdx}
                displayFront={displayFront}
                toggleSide={toggleSide}
            />
        </div>
    );
}

export default CardStudyContainer;