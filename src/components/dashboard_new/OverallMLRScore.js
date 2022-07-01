import React, { useEffect, useState } from 'react';
import ProgressRing from '../progress_ring/progress_ring';
import * as UTIL from '../../util/components/dashboard_component_util';
import { useSelector } from 'react-redux'
import BusinessValue from '../../icons/Business Value.svg'
import CareerTrajectory from '../../icons/Career Trajectory.svg';
import DataPreparation from '../../icons/Data-Preparation.svg';
import MLAptitude from '../../icons/ML Aptitude.svg';
import Modeling from '../../icons/Modeling.svg';



const OverallMLRScore = (props) => {

    const state = useSelector(state => state)
    const [overallScore, setOverallScore] = useState(0);
    const [classification, setClassification] = useState('')
    const [surveyVersion, setSurveyVersion] = useState(props.survey_version);

    const [staticKeys, setStaticKeys] = useState({
        "ML_READINESS": [{ type: "Overall", key: 1, icon: BusinessValue }, { type: "Data Preparation", key: 2, icon: DataPreparation }, { type: "Model Development", key: 3, icon: Modeling }, { type: "Model Monitoring", key: 4, icon: Modeling }, { type: "Business Value", key: 5, icon: BusinessValue }],
        "STUDENT_SURVEY": [{ type: "Overall", key: 1, icon: BusinessValue }, { type: "Data Preparation", key: 2, icon: DataPreparation }, { type: "Modeling", key: 3, icon: Modeling }, { type: "Career Trajectory", key: 4, icon: CareerTrajectory }, { type: "ML Aptitude", key: 5, icon: MLAptitude }, { type: "Business Value", key: 6, icon: BusinessValue }]
    })

    const calcOverallPercent = () => {
        let score = Math.ceil(state.entities.user.score[0]["Overall"]);
        setOverallScore(score);
    }

    // [state.entities.user.score]
    useEffect(() => {
        calcOverallPercent()

        const prps = { survey_version: props.survey_version, score: props.score }
        let classification = UTIL.setClassificationForFunctional(prps);
        setClassification(classification)
    })

    return (<div className='bg-dark-blue-2 rounder-corner-12 padding-10 width-95' style={{ display: 'flex', flexDirection: 'row', }}>
        <div className='margin-left-24 margin-top-24 margin-bottom-24'>
            <ProgressRing textSize={25} size={80} props={{ progress: overallScore }} />
        </div>

        <div style={{ alignSelf: 'center', marginLeft: 33 }}>
            <div className='flex flex-direcction-row' style={{justifyContent: 'space-between'}}>
                <text style={{ color: '#BACEE0', fontWeight: 700, fontSize: 24 }}>Overall MLR score</text>
                <select disabled class="disabled form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>Analysis 1</option>
                    
                </select>
            </div>

            <div className="classification-container margin-top-7 flex-column">
                <text className="classification color-light-gray font-weight-500 font-size-18">{classification}</text>
                <text className="moniker color-light-gray font-size-14 font-Nunito" style={{ marginTop: 3, lineHeight: 1.2, fontWeight: 300 }}>{UTIL.setMoniker(props.score)}</text>
            </div>
        </div>




    </div>)
}

export default OverallMLRScore;