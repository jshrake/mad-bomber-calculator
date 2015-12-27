import Input from '../components/Input';
import {connect} from 'react-redux';
import * as Actions from '../actions';

const mapStateToProps = state => {
    return {
        numberOfProjectiles: state.get("numberOfProjectiles"),
        friendlyFire: state.get("friendlyFire"),
        friendlyHeroHealth: state.get("friendlyHeroHealth"),
        friendlyBoard: state.get("friendlyBoard").toArray(),
        enemyHeroHealth: state.get("enemyHeroHealth"),
        enemyBoard: state.get("enemyBoard").toArray(),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetEnemyHeroHealth: (health) => dispatch(Actions.setEnemyHeroHealth(health)),
        onSetFriendlyHeroHealth: (health) => dispatch(Actions.setFriendlyHeroHealth(health)),
        onSetNumberOfProjectiles: (count) => dispatch(Actions.setNumberOfProjectiles(count)),
        onSetFriendlyFire: (friendlyFire) => dispatch(Actions.setFriendlyFire(friendlyFire)),
        onSetFriendlyMinionHealth: (index, health) => dispatch(Actions.setFriendlyMinionHealth(index, health)),
        onSetEnemyMinionHealth: (index, health) => dispatch(Actions.setEnemyMinionHealth(index, health)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
