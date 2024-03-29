import React from 'react';
import { determineOrientation, gatherAspectRatio, calcProgressRingRadius } from '../util/responsive_util';

const ProgressRingNew = (props) => {


    console.log(props.isTransform)
    let { radius, fontSize, stroke, pos } = calcProgressRingRadius({ progress, classification, "bool": true });
    // this.normalizedRadius = radius - stroke * 2;
    const normalizedRadius = (props.size) - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    var { progress, classification } = props.props;
    const strokeDashoffset = circumference - progress / 100 * circumference;
    

    const size = props.size;

    function goToMeaning() {
        debugger
    }


    return (
        <div className={`${props.isTransform ? 'animate-progress-bar' : 'reanimate'} progress-ring-container`} onClick={() => goToMeaning()}>

            <svg
                className="progress-ring-svg"
                height={size}
                width={size}
                style={{ overflow: 'inherit' }}
            >
                <defs>
                    <linearGradient id={`gradient${props.itemKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={props.isTransform ? '#ffffff' : props.startColor} />
                        <stop offset="100%" stopColor={props.isTransform ? '#ffffff' : props.endColor} />
                    </linearGradient>
                    <filter id="blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
                    </filter>
                </defs>

                <circle className="progress-ring-background"
                    stroke="#122434"
                    stroke-opacity={props.isTransform ? 0.3 : 1}
                    fill="transparent"
                    strokeWidth={5}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: 0 }}
                    r={normalizedRadius}
                    // r={size / 2}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* <text className="overall-percent" x={pos.score[0]} y={pos.score[1]} style={{ fontSize }}>
                    {progress}
                </text> */}
                {/* {classification && <text className="ml-role-container" textDecoration="underline" x={pos.class[0]} y={pos.class[1]} style={{ fontSize: fontSize * .25 }} >{classification}</text>} */}



                <text className="overall-percent" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style={{ fontSize: props.textSize }}>
                    {progress}%

                </text>


                {/* <div dominant-baseline="middle" text-anchor="middle"  x="50%" y="50%" style={{ backgroundColor: 'green', width: 40, height: 40, flexDirection: 'row' }} className="overall-percent ml-role-container">
                    <text>Sample</text>
                    <text>Text</text>
                </div> */}

                {/* {classification && <text className="ml-role-container" textDecoration="underline" dominant-baseline="middle" text-anchor="middle" x="50%" y="65%" style={{ fontSize: fontSize * .25 }} >{classification}</text>} */}
                
                {/* change the gradient color here */}
                <circle
                    className="progress-ring"
                    stroke={`url(#gradient${props.itemKey})`}
                    fill="transparent"
                    strokeWidth={5}
                    strokeLinecap='round'
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    // r={size/2}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            {/* <svg id="progress-ring-shadow-svg" width="200" height="200" >
                <circle id="progress-ring-shadow" cx="100" cy="100" r="40" filter="url(#blur)"/>
            </svg> */}


        </div>
    );

}

export default ProgressRingNew;