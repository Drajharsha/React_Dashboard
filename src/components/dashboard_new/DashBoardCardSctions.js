import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import UpArrow from '../../icons/Arrow-Up.svg';
import Close from '../../icons/close.svg';
import ProgressRing from '../progress_ring/progress_ring_container';
import * as UTIL from '../../util/components/dashboard_component_util';

const DashBoardCardSections = ({ item, state }) => {


    console.log(item);

    const [isInsightVisible, setInsightVisibility] = useState(false);

    const showInsightLayer = () => {
        setInsightVisibility(true)
    }

    const hideInsightLayer = () => {
        setInsightVisibility(false)
    }

    return (
        <Col lg={4} style={{ paddingLeft: 0, paddingRight: 0, height: 250, marginTop: 15 }} key={item.key}>

            <div className="margin-left-right-5 bg-dark-blue-2 bottom-left-right-rounded flex flex-direction-column" style={{ height: '100%' }}>
                <div className="top-left-right-rounded padding-10" style={{background: 'linear-gradient(90deg, ' +item.startColor +', ' + item.endColor + ')'}}>
                    <div className="flex flex-direction-row" style={{ alignItems: 'center' }}>
                        <img src={item.icon} style={{ width: 13, height: 13 }} />
                        <label style={{ fontSize: 16, fontWeight: 'lighter', color: '#FFFFFF', marginLeft: 8 }}>
                            {item.type}
                        </label>
                    </div>
                </div>

                <div className="flex" style={{ height: '100%', width: '100%', position: 'relative' }}>
                    <div className="flex flex-direction-column center padding-top-16" style={{ height: '100%' }}>
                        {/* redux -> state.entities.user.score[0].business value */}
                        <div style={{ height: '100%', justifyContent: 'space-between', display: 'flex', flexDirection: 'column', }}>
                            <div>
                                <ProgressRing textSize={14} size={60} props={{ progress: state.entities.user.score[0][item.type] }} />
                                <div className="margin-top-13" style={{ width: '100%', alignSelf: 'center', paddingLeft: 30, paddingRight: 30 }}>
                                    <text style={{ fontWeight: '300', color: '#BACEE0', fontSize: 14 }}>
                                        {UTIL.setSubDefinitions(item.type)}
                                    </text>
                                </div>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: 'fit-content', alignSelf: 'center', backgroundColor: '#122434' }} onClick={showInsightLayer}>
                                <div className="outer-corner-insight-right" style={{ width: 10, height: 'auto' }}></div>
                                <div className="bg-dark-blue-2">
                                    <div className="top-left-right-rounded-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 12, paddingRight: 12, paddingTop: 5, backgroundColor: '#122434' }}>
                                        <img style={{ width: 16, height: 7 }} src={UpArrow} />
                                        <label style={{ fontSize: 10, color: '#BACEE0' }}>Insights</label>
                                    </div>
                                </div>

                                <div className="outer-corner-insight-left" style={{ width: 10, height: 'auto' }}></div>
                            </div>

                        </div>
                    </div>

                    {
                        isInsightVisible &&  <div className="padding-10 bottom-left-right-rounded flex flex-direction-column" style={{ width: '100%', height: '100%', backgroundColor: '#151515FA', position: 'absolute' }}>
                        <div className="flex flex-direction-row" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center', height: 'fit-content' }}>
                            <label style={{ color: '#BACEE0', fontSize: 13, fontWeight: 600 }}>Insights</label>
                            <img src={Close} style={{ width: 17, height: 17 }} onClick={hideInsightLayer}/>


                        </div>
                        <label style={{ color: '#BACEE0', fontSize: 11, overflow: 'hidden', marginTop: 5, textOverflow: 'ellipsis' }}>
                            {
                                state.entities.user.score[1][item.type]
                            }
                        </label>
                    </div> 

                    }
                    

                </div>
            </div>


        </Col>
    )
}


export default DashBoardCardSections;