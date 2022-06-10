import React, { useState, useEffect } from "react";
import { Alert } from 'react-bootstrap';
import "../../stylesheets/validationAlert.css"

export const ValidationAlert = (props) => {
    const [alertShown, setAlertShown] = useState(props.ValidationValue);
    const [alertBody, setAlertBody] = useState(props.ValidationBody);

    useEffect(() => {
        setAlertShown(props.ValidationValue);
        setAlertBody(props.ValidationBody);
    }, [props.ValidationValue, props.ValidationBody]);

    return (
        <Alert id="alert-container" show={alertShown} >
            <p className="alert-body">{alertBody}</p>
        </Alert>
    );
} 