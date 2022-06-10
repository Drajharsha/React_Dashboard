export const gatherWidth = () => {
    return window.innerWidth;
}

export const gatherHeight = () => {
    return window.innerHeight;
}

export const gatherAspectRatio = (bool) => {
    let [ height, width ] = [ gatherHeight(), gatherWidth() ]
    let ratio = height / width;
    if (!bool) return ratio;
    return { height, width, ratio }
}

export const LANDSCAPE = "LANDSCAPE";
export const PORTRAIT = "PORTRAIT";

export const determineOrientation = (bool) => {
    let { height, width, ratio } = gatherAspectRatio(true);

    let orientation = (function() {
        if (ratio < 1) return LANDSCAPE;
        if (ratio > 1) return PORTRAIT;
        return "SQUARE";
    })()

    if (!bool) return orientation;
    return { orientation, ratio, height, width }
}

export const calcScoreAndClassPOS = (radius, fontSize, classification, score) => {
    let pos = {
        "score": [radius - (fontSize / 1.7), radius * 1.1],
        "class": [radius - (fontSize / 1.7), radius * 1.4]
    };
    return pos;
}

export const calcProgressRingRadius = (obj) => {
    console.log(obj)
    let { orientation, ratio, height, width } = determineOrientation(true);
    let radius = 0;
    let fontSize = 0;
    let stroke = 20;
    
    
    if (orientation === LANDSCAPE) {
        if (width <= 1500) {
            radius = 100;
        } else if (width > 1500 && width < 2000) {
            radius = 125;
        } else {
            radius = 175
            stroke = 30;
        }
        fontSize = Math.ceil(radius * 0.5);
        stroke = Math.ceil(radius * 0.15);
    }
    
    if (orientation === PORTRAIT) {
        if (width <= 500) {
            radius = 83;
            fontSize = 42;
        } else if (width > 500 && width < 1200) {
            radius = 115;
            fontSize = 85;
        } else {
            radius = 125
            fontSize = 90;
        }
    } 
    
    radius = Math.floor(radius);

    // console.log(orientation, ratio, height, width, radius, fontSize)
    
    if (!obj.bool) return radius;
    let pos = calcScoreAndClassPOS(radius, fontSize, obj.classification, obj.progress)
    return { radius, fontSize, orientation, ratio, height, width, stroke, pos }

}

// const classes = ["Observer", "Partipant", "Innovator", "Leader"]