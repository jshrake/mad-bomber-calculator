// Actions
export const SET_ENEMY_HERO_HEALTH = "SET_ENEMY_HERO_HEALTH";
export const SET_FRIENDLY_HERO_HEALTH = "SET_FRIENDLY_HERO_HEALTH";
export const SET_NUMBER_OF_PROJECTILES = "SET_NUMBER_OF_PROJECTILES";
export const SET_FRIENDLY_FIRE = "SET_FRIENDLY_FIRE";
export const SET_ENEMY_MINION_HEALTH = "SET_ENEMY_MINION_HEALTH";
export const SET_FRIENDLY_MINION_HEALTH = "SET_FRIENDLY_MINION_HEALTH";

// Action creators
export const setEnemyHeroHealth = (health) => {
    return {
        type: SET_ENEMY_HERO_HEALTH,
        health
    };
};

export const setFriendlyHeroHealth = (health) => {
    return {
        type: SET_FRIENDLY_HERO_HEALTH,
        health
    };
};

export const setNumberOfProjectiles = (numberOfProjectiles) => {
    return {
        type: SET_NUMBER_OF_PROJECTILES,
        numberOfProjectiles
    };
};

export const setFriendlyFire = (friendlyFire) => {
    return {
        type: SET_FRIENDLY_FIRE,
        friendlyFire
    };
};

export const setEnemyMinionHealth = (index, health) => {
    return {
        type: SET_ENEMY_MINION_HEALTH,
        index,
        health
    };
};

export const setFriendlyMinionHealth = (index, health) => {
    return {
        type: SET_FRIENDLY_MINION_HEALTH,
        index,
        health
    };
};