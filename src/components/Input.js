import React from 'react';

export default function Input(props) {
    const {
        numberOfProjectiles,
        friendlyFire,
        friendlyHeroHealth,
        enemyHeroHealth,
        friendlyBoard,
        enemyBoard,
    } = props;
    const {
        onSetFriendlyFire,
        onSetEnemyHeroHealth,
        onSetNumberOfProjectiles,
        onSetFriendlyHeroHealth,
        onSetFriendlyMinionHealth,
        onSetEnemyMinionHealth,
    } = props;
    return (
        <div>
        <form className="form-horizontal" role="form">
        <div className="form-group">
            <label htmlFor="number-of-projectiles" className="col-sm-2 control-label">Projectiles</label>
            <div className="col-sm-2">
              <input
                type="number"
                min="0"
                className="form-control"
                id="number-of-projectiles"
                value={numberOfProjectiles}
                onChange={ev=>onSetNumberOfProjectiles(Number(ev.target.value))}/>
            </div>
            <div className="checkbox col-sm-7">
                <label>
                  <input
                    type="checkbox"
                    checked={friendlyFire}
                    onChange={ev=>onSetFriendlyFire(ev.target.checked)} />
                    <span>Friendly fire?</span>
                </label>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="enemy-hero-health" className="col-sm-2 control-label">Opponent</label>
            <div className="col-sm-2">
              <div className="input-group">
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="enemy-hero-health"
                    placeholder="Hero"
                    value={enemyHeroHealth}
                    onChange={ev=>onSetEnemyHeroHealth(Number(ev.target.value))} />
                <div className="input-group-addon">Hero</div>
              </div>
            </div>
            {
                enemyBoard.map((h, i) => {
                    return (
                        <div className="col-sm-1" key={i}>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                value={h}
                                onChange={ev=>onSetEnemyMinionHealth(i, Number(ev.target.value))} />
                        </div>
                    );
                })
            }
        </div>

        <div className="form-group">
            <label htmlFor="friendly-hero-health" className="col-sm-2 control-label">You</label>
            <div className="col-sm-2">
              <div className="input-group">
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="friendly-hero-health"
                    placeholder="Hero"
                    value={friendlyHeroHealth}
                    onChange={ev=>onSetFriendlyHeroHealth(Number(ev.target.value))} />
                <div className="input-group-addon">Hero</div>
              </div>
            </div>
            {
                friendlyBoard.map((h, i) => {
                    return (
                        <div className="col-sm-1" key={i}>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                value={h}
                                onChange={ev=>onSetFriendlyMinionHealth(i, Number(ev.target.value))} />
                        </div>
                    );
                })
            }
        </div>
        </form>
        </div>
    );
};

Input.propTypes = {
    enemyHeroHealth: React.PropTypes.number.isRequired,
    friendlyHeroHealth: React.PropTypes.number.isRequired,
    friendlyFire: React.PropTypes.bool.isRequired,
    friendlyBoard: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    enemyBoard: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

    onSetEnemyHeroHealth: React.PropTypes.func.isRequired,
    onSetFriendlyHeroHealth: React.PropTypes.func.isRequired,
    onSetNumberOfProjectiles: React.PropTypes.func.isRequired,
    onSetFriendlyFire: React.PropTypes.func.isRequired,
    onSetFriendlyMinionHealth: React.PropTypes.func.isRequired,
    onSetEnemyMinionHealth: React.PropTypes.func.isRequired,
};
