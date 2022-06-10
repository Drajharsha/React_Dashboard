import { connect } from 'react-redux';
import { getVisuals } from '../../../actions/dashboard_actions';
import Scatterplot from './scatterplot';

const mSTP = state => {
    return {

    }
}

const mDTP = dispatch => {
    return {
        visuals: (path) => getVisuals(path)
    }
}

export default connect(mSTP, mDTP)(Scatterplot);
