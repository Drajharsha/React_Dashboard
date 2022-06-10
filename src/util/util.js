const axios = require('axios');
const { PROXY_URL } = require('../config');
 
 const numPicker = (boolean) => {
    var num;
    if (boolean) {
        num = Math.floor(Math.random() * 9);
    } else {
        num = Math.floor(Math.random() * 74) + 48;
    }
    return num;
 }
 
const idGenerator = (length, onlyNumBoolean) => {
    length = length || 12;
    var id = ""
    while (id.length < length) {
        var num = numPicker(onlyNumBoolean);
        while ((num > 57 && num < 65) || (num > 90 && num < 97)) num = numPicker();
        if (onlyNumBoolean) {
            id = id + num.toString();
        } else {
            id = id + String.fromCharCode(num);
        }
    }
    return id;
}

const axiosInstance = () => {
    return axios.create({
        baseURL: PROXY_URL,
    });
};

const questionCounter = (survey, currentIdx, answeredQuestions) => {
    let remainingQuestions = Object.keys(survey.questions).length - currentIdx;
    let questions = survey.questions;

    let goesTos = [];
    
    if (!(questions instanceof Array) && (questions instanceof Object)) questions = Object.values(questions);

    questions.forEach(question => {
        let arr = [];
        if (typeof question.goesTo === "object") {
            arr.push(question.number, question.goesTo[0]);
            goesTos.push(arr);
        } else if (typeof question.goesTo === "number") {
            arr.push(question.number, question.goesTo);
            goesTos.push(arr);
        } else {
            // console.log("yo")
        }
    })
    goesTos.forEach(goto => {
        if (currentIdx <= goto[0]) {
            remainingQuestions = remainingQuestions - (goto[1] - (goto[0] + 1));
        }
    })
    return remainingQuestions + answeredQuestions;
}

module.exports = { idGenerator, questionCounter, axiosInstance };