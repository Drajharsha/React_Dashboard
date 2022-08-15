import React from "react";
import { determineOrientation, gatherAspectRatio, calcProgressRingRadius } from '../util/responsive_util';

class ProgressRing extends React.Component {
    
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            isTransform: props.isTransform
        }
    }
    componentDidMount() {
        this.orientation = determineOrientation();
        this.aspectRatio = gatherAspectRatio();
    }

    handleClick() {
        // this.orintationn = determineOrientation();
        console.log(this.aspectRatio)
        // alert(determineOrientation());
    }

    goToMeaning() {
        debugger
    }

    render() {
        var { progress, classification } = this.props.props;
        const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
        let { radius, fontSize, stroke, pos } = calcProgressRingRadius({ progress, classification, "bool": true });
        // this.normalizedRadius = radius - stroke * 2;
        this.normalizedRadius = (this.props.size) - stroke * 2;
        this.circumference = this.normalizedRadius * 2 * Math.PI;
        const size = this.props.size;


        return (
            <div className={`${this.state.isTransform? 'animate-progress-bar': ''} progress-ring-container`} onClick={() => this.goToMeaning()}>

                <svg
                    className="progress-ring-svg"
                    height={size}
                    width={size}
                    style={{ overflow: 'inherit' }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00bc9b" />
                            <stop offset="100%" stopColor="#5eaefd" />
                        </linearGradient>
                        <filter id="blur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
                        </filter>
                    </defs>

                    <circle className="progress-ring-background"
                        stroke="#122434"
                        fill="transparent"
                        strokeWidth={5}
                        strokeDasharray={this.circumference}
                        style={{ strokeDashoffset: 0 }}
                        r={this.normalizedRadius}
                        // r={size / 2}
                        cx={size/2}
                        cy={size/2}
                    />
                    {/* <text className="overall-percent" x={pos.score[0]} y={pos.score[1]} style={{ fontSize }}>
                        {progress}
                    </text> */}
                    {/* {classification && <text className="ml-role-container" textDecoration="underline" x={pos.class[0]} y={pos.class[1]} style={{ fontSize: fontSize * .25 }} >{classification}</text>} */}



                    <text  className="overall-percent" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style={{ fontSize: this.props.textSize }}>
                        {progress}%
                        
                    </text>
                    

                    {/* <div dominant-baseline="middle" text-anchor="middle"  x="50%" y="50%" style={{ backgroundColor: 'green', width: 40, height: 40, flexDirection: 'row' }} className="overall-percent ml-role-container">
                        <text>Sample</text>
                        <text>Text</text>
                    </div> */}

                    {/* {classification && <text className="ml-role-container" textDecoration="underline" dominant-baseline="middle" text-anchor="middle" x="50%" y="65%" style={{ fontSize: fontSize * .25 }} >{classification}</text>} */}
                    <circle
                        className="progress-ring"
                        stroke="url(#gradient)"
                        fill="transparent"
                        strokeWidth={5}
                        strokeDasharray={this.circumference}
                        style={{ strokeDashoffset }}
                        r={this.normalizedRadius}
                        // r={size/2}
                        cx={size/2}
                        cy={size/2}
                    />
                </svg>
                {/* <svg id="progress-ring-shadow-svg" width="200" height="200" >
                    <circle id="progress-ring-shadow" cx="100" cy="100" r="40" filter="url(#blur)"/>
                </svg> */}


            </div>
        );
    }

}

export default ProgressRing;