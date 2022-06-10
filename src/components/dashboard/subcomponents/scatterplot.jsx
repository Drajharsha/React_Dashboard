import React from 'react';
import { getVisuals } from '../../../actions/dashboard_actions';

class Scatterplot extends React.Component {
    constructor(props) {
        super(props)
        this.test = "test"
    }

    componentDidMount() {
        getVisuals('matlab.py')
            .then(res => {
                let figure = document.querySelector('.figure');
                let child = document.createDocumentFragment();
                figure.appendChild(child);
            })
        // console.log(html)
        // debugger
    }

    render() {
        return (
            <div className="figure">empty</div>
        )
    }
}

export default Scatterplot;