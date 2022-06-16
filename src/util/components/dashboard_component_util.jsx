import dataPrepIcon from '../../icons/loxz-database.SVG';
import modelDepIcon from '../../icons/loxz-deployment.SVG';
import modelDevIcon from '../../icons/loxz-development.SVG';
import modelMonIcon from '../../icons/loxz-monitoring.SVG';
import busValIcon from '../../icons/loxz-business.SVG';
import CdataPrepIcon from '../../icons/color-subcat-logos/Data Preparedess.png';
import CmodelDepIcon from '../../icons/color-subcat-logos/Ml Deployment.png';
import CmodelDevIcon from '../../icons/color-subcat-logos/ML Development.png';
import CmodelMonIcon from '../../icons/color-subcat-logos/ML Monitoring.png';
import CbusValIcon from '../../icons/color-subcat-logos/Business Value.png';

// import ProgressRing from '../../components/progress_ring/progress_ring_container';

export const OVERALL = "Overall";
export const DATA_PREPARATION = "Data Preparation";
export const MODEL_DEVELOPMENT = "Model Development";
export const MODEL_DEPLOYMENT = "Model Deployment";
export const MODEL_MONITORING = "Model Monitoring";
export const BUSINESS_VALUE = "Business Value";

export const ML_APTITUDE = "ML Aptitude";
export const MODELING = "Modeling";
export const CAREER_TRAJECTORY = "Career Trajectory";

export const delay = async (func, delay) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    func();
}

export const setClassification = that => {
    // debugger
    let standard = that.survey_version === "ML_READINESS";
    if (that.score["Overall"] < 25) {
        return standard ? "Observer" : "Observer";
    } else if (that.score["Overall"] < 50) {
        return standard ? "Participant" : "Apprentice";
    } else if (that.score["Overall"] < 75) {
        return standard ? "Innovator" : "Career Seeker";
    } else {
        return standard ? "Leader" : "Dean's List"
    }
}

export const setClassificationForFunctional = that => {
    // debugger
    let standard = that.survey_version === "ML_READINESS";
    if (that.score["Overall"] < 25) {
        return standard ? "Observer" : "Observer";
    } else if (that.score["Overall"] < 50) {
        return standard ? "Participant" : "Apprentice";
    } else if (that.score["Overall"] < 75) {
        return standard ? "Innovator" : "Career Seeker";
    } else {
        return standard ? "Leader" : "Dean's List"
    }
}

export const setMoniker = that => {
    console.log(that)
    if (that.Overall < 25) {
        return "Glad you entered the realm of Machine Learning!  You are currently an ML Observer who just started exploring ML basics from a theoretical foundation such as probability and statistics to programming skills. Keep up the Good Work!";
    } else if (that.Overall < 50) {
        return "You have been practicing for a while. You have been equipped with some of the fundamentals of ML and started to implement those knowledge into a few ML models with your programming skills.";
    } else if (that.Overall < 75) {
        return "At this stage you are well prepared with all the basics and looking to build a career in Machine Learning. Refining your resume, taking some mock interviews, further deepen the understanding ML algorithms and sharpen your coding skills will definitely build a successful career for you!";
    } else {
        return "Congratulations on your achievement in Academia! You are more than ready to become either a ML researcher to speak at top tier conferences, or dive into the ML industry to make a huge impact.";
    }
}

const colorIcons = [CdataPrepIcon, CmodelDevIcon, CmodelDepIcon, CmodelMonIcon, CbusValIcon]
const icons = [dataPrepIcon, modelDevIcon, modelDepIcon, modelMonIcon, busValIcon]

export const setIcons = (section, colorBool) => {
    switch (section) {
        case DATA_PREPARATION:
            return colorBool ? CdataPrepIcon : dataPrepIcon;
        case MODEL_DEVELOPMENT:
            return colorBool ? CmodelDevIcon : modelDevIcon;
        case MODEL_DEPLOYMENT:
            return colorBool ? CmodelDepIcon : modelDepIcon;
        case MODEL_MONITORING:
            return colorBool ? CmodelMonIcon : modelMonIcon;
        case BUSINESS_VALUE:
            return colorBool ? CbusValIcon : busValIcon;
        case MODELING:
            return colorBool ? CmodelDepIcon : modelDepIcon;
        case ML_APTITUDE:
            return colorBool ? CmodelMonIcon : modelMonIcon;
        case CAREER_TRAJECTORY:
            return colorBool ? CmodelDevIcon : modelDevIcon;
        default:
            let length = colorBool ? colorIcons.length : icons.length;
            let num = Math.floor(Math.random() * length);
            return colorBool ? colorIcons[num] : icons[num];
    }
}

export const toggleInsights = e => {
    // e.currentTarget.children[0].lastElementChild.classList.toggle('selected');
    let insight = document.querySelector(`.${e.currentTarget.dataset['subsection']}-insights`);
    if (insight) {
        console.log(window.scrollY, insight.getBoundingClientRect().y)
        if (insight.classList.value.includes('invisible')) {
            insight.classList.remove('invisible');
            e.currentTarget.children[0].lastElementChild.classList.add('selected-subcat');
            setTimeout(() => insight.classList.remove('offscreen'), 100)
            setTimeout(() => {
                if (insight.scrollHeight < (window.innerHeight - (window.innerHeight * 0.6))) {
                    window.scrollTo({ left: 0, top: insight.getBoundingClientRect().y, behavior: 'smooth' })
                }
                // insight.scrollIntoView({bevahior: 'smooth'})
            }, 100)
            setTimeout(() => document.querySelector('.contact-container').classList.remove('offscreen-down'), 2000)
        } else {
            insight.classList.add('offscreen');
            e.currentTarget.children[0].lastElementChild.classList.remove('selected-subcat');
            setTimeout(() => insight.classList.add('invisible'), 1000)
        }
    }

    let selected = document.querySelectorAll('.selected-subcat');
    if (selected.length > 0) {
        document.querySelector('.insights-instructions').classList.add('invisible')
    } else {
        document.querySelector('.insights-instructions').classList.remove('invisible')
    }
}

export const setScoreAnimation = that => {
    if (!that.score) return <div></div>;
    let overallScore = Math.ceil(that.score["Overall"]);
    let modelMonScore = Math.ceil(that.score["Model Monitoring"]);
    let modelDevScore = Math.ceil(that.score["Model Development"]);
    let modelDeployScore = Math.ceil(that.score["Model Deployment"]);
    let mlValueScore = Math.ceil(that.score["Business Value"]);
    let dataPrepScore = Math.ceil(that.score["Data Preparation"]);
    let mlAptitudeScore = Math.ceil(that.score[ML_APTITUDE]);
    let modelingScore = Math.ceil(that.score[MODELING]);
    let careerTrajScore = Math.ceil(that.score[CAREER_TRAJECTORY]);

    let overallBar = document.querySelectorAll('.Overall');
    let modelMonBar = document.querySelectorAll('.Model-Monitoring');
    let modelDevBar = document.querySelectorAll('.Model-Development');
    let modelDeployBar = document.querySelectorAll('.Model-Deployment');
    let busValueBar = document.querySelectorAll('.Business-Value');
    let dataPrepBar = document.querySelectorAll('.Data-Preparation');
    let mlAptitudeBar = document.querySelectorAll('.ML-Aptitude');
    let modelingBar = document.querySelectorAll('.Modeling');
    let careerTrajBar = document.querySelectorAll('.Career-Trajectory');

    if (overallBar) setTimeout(() => overallBar.forEach(ele => ele.style.width = overallScore.toString() + "%"), 250);
    if (modelMonBar) setTimeout(() => modelMonBar.forEach(ele => ele.style.width = modelMonScore.toString() + "%"), 250);
    if (modelDevBar) setTimeout(() => modelDevBar.forEach(ele => ele.style.width = modelDevScore.toString() + "%"), 250);
    if (modelDeployBar) setTimeout(() => modelDeployBar.forEach(ele => ele.style.width = modelDeployScore.toString() + "%"), 250);
    if (busValueBar) setTimeout(() => busValueBar.forEach(ele => ele.style.width = mlValueScore.toString() + "%"), 250);
    if (dataPrepBar) setTimeout(() => dataPrepBar.forEach(ele => ele.style.width = dataPrepScore.toString() + "%"), 250);
    if (mlAptitudeBar) setTimeout(() => mlAptitudeBar.forEach(ele => ele.style.width = mlAptitudeScore.toString() + "%"), 250);
    if (modelingBar) setTimeout(() => modelingBar.forEach(ele => ele.style.width = modelingScore.toString() + "%"), 250);
    if (careerTrajBar) setTimeout(() => careerTrajBar.forEach(ele => ele.style.width = careerTrajScore.toString() + "%"), 250);
    // debugger
    // console.log(overallScore, modelMonScore, modelDevScore, modelDeployScore, mlValueScore, dataPrepScore)
}

export const getScores = THIS => {
    let score;
    let insight;
    if (THIS.props.archivalScore) {
        if (!Array.isArray(THIS.props.archivalScore)) {
            if (THIS.props.archivalScore) score = THIS.props.archivalScore;
        } else {
            if (THIS.props.archivalScore) {
                score = THIS.props.archivalScore[0];
                insight = THIS.props.archivalScore[1];
            }
        }
    }

    if (THIS.props.currentScore) {
        if (!Array.isArray(THIS.props.currentScore)) {
            if (THIS.props.currentScore) score = THIS.props.currentScore;
        } else {
            if (THIS.props.currentScore) {
                score = THIS.props.currentScore[0];
                insight = THIS.props.currentScore[1];
            }
        }
    }

    if (insight) return [ score, insight ]
    return [ score ]
}

export const getScoresFunctionalComponent = props => {

    console.log(props);
    
    let score;
    let insight;
    if (props.archivalScore) {
        if (!Array.isArray(props.archivalScore)) {
            if (props.archivalScore) score = props.archivalScore;
        } else {
            if (props.archivalScore) {
                score = props.archivalScore[0];
                insight = props.archivalScore[1];
            }
        }
    }

    if (props.currentScore) {
        if (!Array.isArray(props.currentScore)) {
            if (props.currentScore) score = props.currentScore;
        } else {
            if (props.currentScore) {
                score = props.currentScore[0];
                insight = props.currentScore[1];
            }
        }
    }

    if (insight) return [ score, insight ]
    return [ score ]
}

export const setSubDefinitions = section => {
    switch (section) {
        case DATA_PREPARATION:
            return "Quantifies the indelible chores associated with synthesizing data before development"
        case MODEL_DEVELOPMENT:
            return "Quantifies the frequency and strategy to construct ML modes accurately and efficiently";
        case MODEL_DEPLOYMENT:
            return "Quantifies the infrastructure, scalability, and methodology used to efficiently deploy or integrate models into platforms";
        case MODEL_MONITORING:
            return "Quantifies the ability to set thresholds, monitor concept and data drift, while detecting broken pipelines using logs";
        case BUSINESS_VALUE:
            return "Quantifies the alignment of strategic ML initiatives to unlock value for businesses";
        case MODELING:
            return "Quanitifies competency around model training"
        case CAREER_TRAJECTORY:
            return "Quantifies a students propensity and exposure to succeed in specific characteristics of Machine Learning"
        case ML_APTITUDE:
            return "Quantifies your educational foundation and progression towards a career in ML"
        default:
            break;
    }
}

// export const renderOverviewComponents = (panelName, subscoreSection, THIS) => {
//     let classification = setClassification(THIS);

//     if (subscoreSection === "date") return;
//     if (subscoreSection === "Overall") return (
//         <div className="overall-score-container">
//             <ProgressRing props={{ radius: 100, stroke: 20, progress: Math.ceil(THIS.score["Overall"]) }} />
//             <div className="ml-role-container">
//                 <img src="" alt="" className="ml-role-img" />
//                 <div className="ml-role-txt">Role: <span className='role-classification'>{classification}</span></div>
//             </div>
//         </div>
//     )

//     let subscoreClass = subscoreSection.split(" ");
//     return (
//         <div
//             className={`${panelName}-component-container`}
//             onClick={THIS.toggleInsights}
//             data-subsection={subscoreSection.split(' ').join('-')}
//         >
//             <div className={`${panelName}-subheader-container`}>
//                 <img src={setIcons(subscoreSection)} alt="" className="subheader-img" />
//                 <div className={`${panelName}-subheader`}>{subscoreSection}</div>
//             </div>
//             <div className="score-animation-bar-container">
//                 <div className={`score-animation-bar ${subscoreClass[0]}${subscoreClass.length > 1 ? `-${subscoreClass[1]}` : ""}`}></div>
//                 <div className={`${panelName}-score-container`}>
//                     <div className="subscore-percent">{Math.ceil(THIS.score[subscoreSection])}%</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

    // async generateX() {
    //     let x = []
    //     let i = 1;
    //     while (x.length < this.sampleSurveyLength) {
    //         x.push(i);
    //         i++
    //     }
    //     return x;
    // }

    // async generateY() {
    //     let y = []
    //     while (y.length < this.sampleSurveyLength) {
    //         let num = Math.floor(Math.random() * 100);
    //         y.push(num);
    //     }
    //     return y;
    // }

    // async produceSamplePeer() {
    //     for (let i = 0; i < this.sampleSurveyLength; i++) {
    //         // let x = await this.generateX()
    //         let x = await this.generateX();
    //         let y = await this.generateY();
            
    //         let sample = {
    //             type: 'scatter',
    //             x,
    //             y, 
    //             mode: 'markers', 
    //             marker: { color: "grey" }, 
    //             name: 'peer',
    //             hoverinfo: `yo`
    //         };
    //         return sample;
    //     }
    // }

    // async produceSampleDataSet() {
    //     let sampleSet = [];
    //     while (sampleSet.length < 1) {
    //         let peer = await this.produceSamplePeer();
    //         sampleSet.push(peer);
    //     }
    //     sampleSet.push({ type: 'scatter', x: [this.sampleSurveyLength + 1], y: [this.score], mode: 'markers', marker: { color: "blue", size: 11 }, name: "you" })
    //     this.sampleSet = sampleSet;
    //     this.setState(() => this.sampleSet);
    // }