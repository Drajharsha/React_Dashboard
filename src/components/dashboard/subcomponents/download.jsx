import React, { useEffect } from 'react';
import jsPDF from 'jspdf'
import "../../../stylesheets/download.css"
import gradient from '../../../icons/bars.png';
import logo from '../../../images/logos/logo_teal.png'

export const Download = (props) => {

  const generatePDF = (props) => {
    let doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(10, 49, 68);
    doc.rect(0, 0, 10000, 50, 'F'); // blue header
    doc.addImage(gradient, 60, 20, 50, 10)
    doc.addImage(logo, 20, 15, 20, 20)
    doc.setTextColor(255, 255, 255)
    doc.text(150, 30, props.user.company)
    doc.text(400, 30, props.user.name + " " + props.user.surname)
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let date = month + "/" + day + "/" + year;
    doc.text(250, 30, date)

    
    doc.setTextColor(0, 0, 0)
    let y = 100
    Object.keys(props.score[0]).map(function (key, index) {
      doc.text(50, y, key + ": ")
      doc.text(200, y, props.score[0][key].toString() + "%")
      y = y + 100;
    });

    //second page

    // header
    doc.addPage()
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(10, 49, 68);
    doc.rect(0, 0, 10000, 50, 'F');
    doc.addImage(gradient, 60, 20, 50, 10)
    doc.addImage(logo, 20, 15, 20, 20)
    doc.setTextColor(255, 255, 255)
    doc.text(150, 30, props.user.company)
    doc.text(400, 30, props.user.name + " " + props.user.surname)
    doc.text(250, 30, date)

    //content
    doc.setTextColor(0, 0, 0)
    y = 100
    Object.keys(props.score[1]).map(function (key, index) {
      if (key === "null") {
        doc.text(50, y, "Next Steps")
      } else {
        doc.text(50, y, key)
      }

      y = y + 50
      doc.text(50, y, props.score[1][key].toString(), { maxWidth: 500 })
      y = y + 80;
      doc.line(0, y, 5000, y);
      y = y + 30;
    });
    doc.save('report.pdf')
  }
/*
  useEffect(() => {
    let doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(10, 49, 68);
    doc.rect(0, 0, 10000, 50, 'F'); // blue header
    doc.addImage(gradient, 60, 20, 50, 10)
    doc.addImage(logo, 20, 15, 20, 20)
    doc.setTextColor(255, 255, 255)
    doc.text(250, 30, props.user.company)
    doc.text(400, 30, props.user.name + " " + props.user.surname)

    doc.setTextColor(0, 0, 0)
    let y = 100
    Object.keys(props.score[0]).map(function (key, index) {
      doc.text(50, y, key + ": ")
      doc.text(200, y, props.score[0][key].toString() + "%")
      y = y + 100;
    });

    //second page

    // header
    doc.addPage()
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(10, 49, 68);
    doc.rect(0, 0, 10000, 50, 'F');
    doc.addImage(gradient, 60, 20, 50, 10)
    doc.addImage(logo, 20, 15, 20, 20)
    doc.setTextColor(255, 255, 255)
    doc.text(250, 30, props.user.company)
    doc.text(400, 30, props.user.name + " " + props.user.surname)


    //content
    doc.setTextColor(0, 0, 0)
    y = 100
    Object.keys(props.score[1]).map(function (key, index) {
      if (key === "null") {
        doc.text(50, y, "Next Steps")
      } else {
        doc.text(50, y, key)
      }

      y = y + 50
      doc.text(50, y, props.score[1][key].toString(), { maxWidth: 500 })
      y = y + 80;
      doc.line(0, y, 5000, y);
      y = y + 30;
    });

    //deploy to iframe
   // document.getElementById('main-iframe').setAttribute('src', doc.output('bloburl'));
  });
*/
  return (
    <div id="download-container">
      
      <br></br>
      {/*  <iframe id="main-iframe"></iframe>*/}

      <div class="card">
        <h2>Scores Report</h2>
        <p>Overall: {props.score[0].Overall.toString()}</p>
        <h2></h2>
        <p></p>
          <span class="line"></span>
          <span class="line"></span>
      <button class="download-button" onClick={() => generatePDF(props)} type="primary">Download PDF</button>
      </div>

    </div>
  );
}

/*
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
*/