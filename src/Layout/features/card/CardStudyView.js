import React from "react";

function CardStudyView({ card, idx, numCards, updateIdx, displayFront, toggleSide }) {
    return (
        <div>
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-text">Card {idx + 1} of {numCards}</h5>
                        {displayFront && <p className="card-text">{card.front}</p>}
                        {!displayFront && <p className="card-text">{card.back}</p>}
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={toggleSide}>
                            Flip
                        </button>
                        {!displayFront &&
                            <button
                                className="btn btn-primary"
                                onClick={() => updateIdx(idx)}
                            >
                                Next
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardStudyView;