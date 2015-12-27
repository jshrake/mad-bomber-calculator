import React from 'react';
import Input from './Input';
import Output from './Output';
import {connect} from 'react-redux';
import * as Actions from '../actions';

const Calculator = ({cards, onChange}) => {
    return (
        <div className="container">
            <div className="col-sm-12">
              <div className="form-group form-inline">
                <select
                    className="form-control input-lg"
                    onChange={ev => onChange(cards[ev.target.value].projectiles, cards[ev.target.value].friendlyFire)}>
                    {
                        cards.map((c, idx) => <option key={idx} value={idx}>{c.name}</option>)
                    }
                </select>
                <h2> Calculator</h2>
              </div>
            </div>
            <Input/>
            <Output/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cards: state.get("cards").toJS()
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: (projectiles, friendlyFire) => dispatch((dispatch) => {
            dispatch(Actions.setNumberOfProjectiles(projectiles));
            dispatch(Actions.setFriendlyFire(friendlyFire));
        }),
    };
};

Calculator.propTypes = {
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        projectiles: React.PropTypes.number.isRequired,
        friendlyFire: React.PropTypes.bool.isRequired
    })).isRequired,
    onChange: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);