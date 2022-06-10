import { connect } from 'react-redux';
import ProgressRing from './progress_ring';

const mSTP = state => {
    return {
        radius: state.radius,
        stroke: state.stroke,
        progress: state.progress
    };

}

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(ProgressRing);