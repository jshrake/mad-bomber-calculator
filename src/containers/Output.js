import Output from '../components/Output';
import {connect} from 'react-redux';
import {enumerateOutcomes, calculateProbabilitiesForKnownEvents} from '../utils';

const mapStateToProps = state => {
    const startingState = state.toJS();
    const outcomes = enumerateOutcomes(startingState);
    const knownEvents = calculateProbabilitiesForKnownEvents(startingState, outcomes);
    return {
        startingState: startingState,
        summary: knownEvents,
        outcomes: outcomes
    };
};

export default connect(mapStateToProps)(Output);
