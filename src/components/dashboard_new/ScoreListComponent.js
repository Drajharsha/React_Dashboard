
import React, {useState, useEffect} from "react";

const ScoreListComponent = (props) => {


    const [user, setUser] = useState(props.user);
    const [userScores, setUserScores] = useState([]);

    useEffect(() => {
        console.log(user.score[0]);

        
    }, [])

    return (
        <div className="padding-10" style={{width: '95%', marginTop: 24}}>
            Score List component
        </div>
    )
}

export default ScoreListComponent;