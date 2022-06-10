import React from 'react';
import Plot from 'react-plotly.js';
import { heatmapArr } from '../../../util/components/heatmap_util';

class Heatmap extends React.Component {

    generateHeatmap() {
        var data = [
            {
                // z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
                z: Object.values(heatmapArr),
                type: 'heatmap'
            }
        ];
        return (
            <div className="plot-container">
                <Plot 
                    data={data}
                />
            </div>
        )
    }

    render() {
        return (
            this.generateHeatmap()
        )
    }
}

export default Heatmap;
