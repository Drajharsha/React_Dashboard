import React, { useEffect, useState } from 'react';
import ProgressRing from '../progress_ring/progress_ring';
import * as UTIL from '../../util/components/dashboard_component_util';
import { useSelector } from 'react-redux'

const OverallMLRScore = (props) => {

    console.log(props)
    const state = useSelector(state => state)
    console.log(state);
    const [overallScore, setOverallScore] = useState(0);
    const [classification, setClassification] = useState('')

    const calcOverallPercent = () => {
        let score = Math.ceil(state.entities.user.score[0]["Overall"]);
        console.log(score);
        setOverallScore(score);
    }

    // [state.entities.user.score]
    useEffect(() => {
        calcOverallPercent()

        const prps = {survey_version: props.survey_version, score: props.score }
        let classification = UTIL.setClassificationForFunctional(prps);
        setClassification(classification)
    })

    return (<div className='bg-dark-blue-2 rounder-corner-12 padding-10 width-95' style={{ display: 'flex', flexDirection: 'row', }}>
        <div>
            <ProgressRing size={80} props={{ progress: overallScore }} />
        </div>

        <div style={{alignSelf: 'center', marginLeft: 33}}>
            <text style={{color: '#BACEE0', fontWeight: 700, fontSize: 20}}>Over all MLR score renders</text>
            <div className="classification-container margin-top-7 flex-column">
                    <text className="classification color-light-gray font-weight-500 font-size-14">{classification}</text>
                    <text className="moniker color-light-gray font-size-8" style={{marginTop: 3, lineHeight: 1.2, fontWeight: 'lighter'}}>{UTIL.setMoniker(props.score)}</text>
                </div>
        </div>
    </div>)
}

export default OverallMLRScore;