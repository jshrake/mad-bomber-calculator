import * as Actions from '../actions';
import Immutable from 'immutable';

const cards = [{ name: "Arcane Missiles", projectiles: 3, friendlyFire: false },
               { name: "Avenging Wrath", projectiles: 8, friendlyFire: false },
               { name: "Mad Bomber", projectiles: 3, friendlyFire: true },
               { name: "Madder Bomber", projectiles: 6, friendlyFire: true }];
const startingCard = 0;
const initialState = Immutable.fromJS({
    cards: cards,
    enemyHeroHealth: 3,
    friendlyHeroHealth: 17,
    numberOfProjectiles: cards[startingCard].projectiles,
    friendlyFire: cards[startingCard].friendlyFire,
    enemyBoard: [2, 1, 3, 0, 0, 0, 0],
    friendlyBoard: [1, 6, 0, 0, 0, 0, 0]
});

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_ENEMY_HERO_HEALTH:
            return state.set("enemyHeroHealth", action.health);
        case Actions.SET_FRIENDLY_HERO_HEALTH:
            return state.set("friendlyHeroHealth", action.health);
        case Actions.SET_NUMBER_OF_PROJECTILES:
            return state.set("numberOfProjectiles", action.numberOfProjectiles);
        case Actions.SET_FRIENDLY_FIRE:
            return state.set("friendlyFire", action.friendlyFire);
        case Actions.SET_ENEMY_MINION_HEALTH:
            return state.update("enemyBoard", board => board.set(action.index, action.health));
        case Actions.SET_FRIENDLY_MINION_HEALTH:
            return state.update("friendlyBoard", board => board.set(action.index, action.health));
        default:
            return state;
    }
};