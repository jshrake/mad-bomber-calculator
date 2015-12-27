const hitEnemyHero = (state, p) => {
    return Object.assign({}, state, {enemyHeroHealth: state.enemyHeroHealth - 1, p});
};

const hitEnemyMinion = (state, i, p) => {
    return Object.assign({}, state, {enemyBoard: [
                    ...state.enemyBoard.slice(0, i),
                    state.enemyBoard[i] - 1,
                    ...state.enemyBoard.slice(i+1)
                ], p});
};

const hitFriendlyHero = (state, p) => {
    return Object.assign({}, state, {friendlyHeroHealth: state.friendlyHeroHealth - 1, p});
};

const hitFriendlyMinion = (state, i, p) => {
    return Object.assign({}, state, {friendlyBoard: [
                    ...state.friendlyBoard.slice(0, i),
                    state.friendlyBoard[i] - 1,
                    ...state.friendlyBoard.slice(i+1)
                ], p});
};

// Grows like O(n^(numProjectiles-1))) where n = number of non-zero tokens
const enumerateStates = startingState => {
    const friendlyFire = startingState.friendlyFire;
    let numberOfProjectiles = startingState.numberOfProjectiles;
    const q = [startingState];
    while (numberOfProjectiles--) {
        let qLength = q.length;
        while (qLength--) {
            const state = q.shift();
            const enemyHeroHealth = state.enemyHeroHealth;
            const friendlyHeroHealth = state.friendlyHeroHealth;
            if (enemyHeroHealth === 0 || (friendlyFire && friendlyHeroHealth === 0)) {
                q.push(state);
                continue;
            }
            const enemyTokenCount = state.enemyBoard.reduce((total, h) => h !== 0 ? total + 1 : total, 0);
            const friendlyTokenCount = friendlyFire ? state.friendlyBoard.reduce((total, h) => h !== 0 ? total + 1 : total, 0) : 0;
            const enemyHeroCount = 1;
            const friendlyHeroCount = friendlyFire ? 1 : 0;
            const numTargets = enemyTokenCount + friendlyTokenCount + enemyHeroCount + friendlyHeroCount;
            const newP = (state.p || 1) * 1 / numTargets;
            q.push(hitEnemyHero(state, newP));
            state.enemyBoard.forEach((h, idx) => h && q.push(hitEnemyMinion(state, idx, newP)));
            if (friendlyFire) q.push(hitFriendlyHero(state, newP));
            state.friendlyBoard.forEach((h, idx) => friendlyFire && h && q.push(hitFriendlyMinion(state, idx, newP)));
        }
    }
    return q;
};

export const enumerateOutcomes = startingState => {
    const allStates = enumerateStates(startingState);
    // NOTE(jshrake): leaves is an array of duplicated board states. We want an array of unique board states
    // NOTE(jshrake): Build a map from unique board states to probabilities
    const uniqueStates = allStates.reduce((m, leaf) => {
        // NOTE(jshrake): Dont want the probability to be part of the JSON.stringify encoding
        const p = leaf.p;
        leaf.p = undefined;
        const encoding = JSON.stringify(leaf);
        m.set(encoding, (m.get(encoding) || 0 ) + p);
        return m;
    }, new Map());
    let outcomes = [];
    uniqueStates.forEach((v, k) => outcomes.push(Object.assign({}, JSON.parse(k), {p: v})));
    outcomes.sort((a,b) => b.p - a.p);
    return outcomes;
};

export const calculateProbabilitiesForKnownEvents = (startingState, outcomes) => {
    let summary = [];
    const killedToken = (begin, end) => begin !== 0 && end === 0;
    const tokensKilled = (begin, end) => {
        let killed = 0;
        for (let i = 0; i < begin.length; ++i) {
            if (killedToken(begin[i], end[i])) {
                killed += 1;
            }
        }
        return killed;
    };
    const getGetOrdinal = n => {
        var s=["th","st","nd","rd"],
        v=n%100;
        return n+(s[(v-20)%10]||s[v]||s[0]);
    };
    // Winning probability
    const pWeWin = outcomes.reduce((total, state) => state.enemyHeroHealth === 0 ? total + state.p : total, 0);
    if (pWeWin !== 0) {
        summary.push({message: "Probability of winning", probability: pWeWin, success: true});
    }
    // Losing probability
    const pWeLose = outcomes.reduce((total, state) => state.friendlyHeroHealth === 0 ? total + state.p : total, 0);
    if (pWeLose !== 0) {
        summary.push({message: "Probability of losing", probability: pWeLose, success: false});
    }
    const boardSize = 7;
    for (let i = 1; i < boardSize; ++i) {
        // Probability to kill at least i enemy tokens
        const pKillEnemyToken = outcomes.reduce((total, state) =>
            tokensKilled(startingState.enemyBoard, state.enemyBoard) >= i ? total + state.p : total, 0);
        if (pKillEnemyToken !== 0) {
            summary.push({
                message: `Probability of destroying at least ${i} of the opponent's tokens`,
                probability: pKillEnemyToken,
                success: true});
        }
        // Probability to kill the ith enemy token
        const pKillIthEnemyToken = outcomes.reduce((total, state) =>
            killedToken(startingState.enemyBoard[i-1], state.enemyBoard[i-1]) ? total + state.p : total, 0);
        if (pKillIthEnemyToken !== 0) {
            summary.push({
                message: `Probability of destroying the opponent's ${getGetOrdinal(i)} token (the one with ${startingState.enemyBoard[i-1]} health)`,
                probability: pKillIthEnemyToken,
                success: true});
        }
        // Probability to kill at least i friendly tokens
        const pKillFriendlyToken = outcomes.reduce((total, state) =>
            tokensKilled(startingState.friendlyBoard, state.friendlyBoard) >= i ? total + state.p : total, 0);
        if (pKillFriendlyToken !== 0) {
            summary.push({
                message: `Probability of destroying at least ${i} of your tokens`,
                probability: pKillFriendlyToken,
                success: false});
        }
        // Probability to kill the ith friendly token
        const pKillIthFriendlyToken = outcomes.reduce((total, state) =>
            killedToken(startingState.friendlyBoard[i-1], state.friendlyBoard[i-1]) ? total + state.p : total, 0);
        if (pKillIthFriendlyToken !== 0) {
            summary.push({
                message: `Probability of destroying your ${getGetOrdinal(i)} token (the one with ${startingState.friendlyBoard[i-1]} health)`,
                probability: pKillIthFriendlyToken,
                success: false});
        }
    }
    summary.sort((a,b) => b.probability - a.probability);
    return summary;
};
