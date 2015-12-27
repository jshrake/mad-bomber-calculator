import React from 'react';

export default function Output(props) {
    const {
        startingState,
        summary,
        outcomes
    } = props;

    return (
        <div>
        {/*Render a list of summary messages*/}
        <ul className="list-group row">
            <li className ="col-xs-12 list-group-item text-primary">Summary</li>
            <li className="col-xs-2 list-group-item text-primary">Probability</li>
            <li className="col-xs-10 list-group-item text-primary">Outcome</li>
            { 
                summary.map(({message, probability, success}, i) => {
                    const bgColor = success ? "bg-success" : "bg-danger";
                    return (
                    <li key={i}>
                        <div className="col-xs-2 list-group-item">
                        {(probability*100).toFixed(4)}%
                        </div>
                        <div className={"col-xs-10 list-group-item"}>
                            <span className={`${bgColor}`}>{message}</span>
                        </div>
                    </li>);
                })
            }
        </ul>
        {/*Render a list of all board outcomes*/}
        <ul className="list-group row">
            <li className ="col-xs-12 list-group-item text-primary">{outcomes.length} outcomes</li>
            <li className="col-xs-2 list-group-item text-primary">Probability</li>
            <li className="col-xs-5 list-group-item text-primary">Opponent board</li>
            <li className="col-xs-5 list-group-item text-primary">Your board</li>
            { 
                outcomes.map((state, i) => {
                    {/*Highlight instances where the health of a hero or token drops to 0*/}
                    const enemyHeroClassNames = state.enemyHeroHealth === 0 ? "bg-success" : "";
                    const enemyBoardClassNames = state.enemyBoard.map((h, i) => (h === 0 && startingState.enemyBoard[i] !== 0) ? "bg-success" : "");
                    const friendlyHeroClassNames = state.friendlyHeroHealth === 0 ? "bg-danger" : "";
                    const friendlyBoardClassNames = state.friendlyBoard.map((h, i) => (h === 0 && startingState.friendlyBoard[i] !== 0) ? "bg-danger" : "");
                    return (
                        <li key={i}>
                            {/*Probability of the board state*/}
                            <div key={i} className="col-xs-2 list-group-item">
                            {(state.p*100).toFixed(4)}%
                            </div>
                            {/*Opponent board state*/}
                            <div className="col-xs-5 list-group-item">
                                <div className={`col-xs-1 ${enemyHeroClassNames}`}>
                                {state.enemyHeroHealth}
                                </div>
                                <div className="col-xs-1"/>
                                {
                                    state.enemyBoard.map(((h, k) => <div className={`col-xs-1 ${enemyBoardClassNames[k]}`} key={k}>{h}</div>))
                                }
                            </div>
                            {/*Friendly board state*/}
                            <div className="col-xs-5 list-group-item">
                                <div className={`col-xs-1 ${friendlyHeroClassNames}`}>
                                {state.friendlyHeroHealth}
                                </div>
                                <div className="col-xs-1"/>
                                {
                                    state.friendlyBoard.map(((h, k) => <div className={`col-xs-1 ${friendlyBoardClassNames[k]}`} key={k}>{h}</div>))
                                }
                            </div>
                        </li>
                    );
                }) // outcomes.map(...)
            }
        </ul>
        </div>
    );
};

Output.propTypes = {
    startingState: React.PropTypes.shape({
        enemyHeroHealth: React.PropTypes.number.isRequired,
        friendlyHeroHealth: React.PropTypes.number.isRequired,
        friendlyBoard: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        enemyBoard: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    }).isRequired,
    summary: React.PropTypes.arrayOf(React.PropTypes.shape({
        message: React.PropTypes.string.isRequired,
        probability: React.PropTypes.number.isRequired,
        success: React.PropTypes.bool.isRequired,
    })).isRequired,
    outcomes: React.PropTypes.arrayOf(React.PropTypes.shape({
        enemyHeroHealth: React.PropTypes.number.isRequired,
        friendlyHeroHealth: React.PropTypes.number.isRequired,
        friendlyBoard: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        enemyBoard: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        p: React.PropTypes.number.isRequired,
    })).isRequired,
};
