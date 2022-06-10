import { PROXY_URL, __client } from '../../config';

function jumpToEnd(that) {
    let inputs = document.querySelector("#jump-to-end").querySelectorAll("input");
    if (Array.from(inputs).some(input => input.value === "")) return alert("input name and email")
    let NAME = inputs[0].value;
    let EMAIL = inputs[1].value.toLowerCase();
    that.newUserData = {NAME, EMAIL};
    that.activePrompt = "submit";
    that.setState(() => that.activePrompt);
}

export function renderLandingPage() {
    this.jumpToEnd = jumpToEnd.bind(this);
    let landing = this.survey.prompts['welcome'];
    let customer = this.survey.customer || __client;
    let goesTo = landing.goesTo;
    let goesToPrompt = landing.goesToPrompt;
    let skipProgress = true;
    let color = landing.color;
    return (
        <div id="landing-container">
            {/* <div id="jump-to-end">
                <input type="text" placeholder="Name"/>
                <input type="text" placeholder="Email"/>
                <div className="jump-to-end" onClick={() => jumpToEnd(this)}>Test End of Survey</div>
            </div> */}
            <div id="landing-banner-container">
                <img src={PROXY_URL + `/api/assets/images/customer-logo/${customer}`} alt="" className="customer-logo" />
            </div>
            <div id="landing-body-container">
                <div className="landing-split-container left">
                    <div id="landing-header">{landing.prompt}</div>
                    <div id="landing-header-divider" style={{ "background-color": color }} />
                    {landing.prompts && landing.prompts.map((p, i) => <div className='landing-prompts' key={"prompt-message" + i.toString()}>{p}</div>)}
                </div>
                <div className="landing-split-container right">
                    <img id="prompt-img" src={PROXY_URL + `/api/assets/images/dash-preview/${customer}`} alt="" />
                    <div id="prompt-bullets-container">
                        <div className="prompt-bullet-container">
                            <div className="bullet lime" />
                            <div className="bullet-text">Discover your ML Aptitude</div>
                        </div>
                        <div className="prompt-bullet-container">
                            <div className="bullet royalblue" />
                            <div className="bullet-text">Map out your Career Trajectory</div>
                        </div>
                        <div className="prompt-bullet-container">
                            <div className="bullet teal" />
                            <div className="bullet-text">Discover your strengths in ML</div>
                        </div>
                        <div className="prompt-bullet-container">
                            <div className="bullet salmon" />
                            <div className="bullet-text">Unlock the Dashboard and Insights</div>
                        </div>
                    </div>
                    {/* <img id="prompt-img" src={dashPrev} alt="" /> */}
                    <div id="landing-submit-button" onMouseDown={() => this.selectQuestion({ target: { id: "next" } }, false, { "dataset": { goesTo, goesToPrompt }, skipProgress })} style={{ "border": `${color} 2px solid`, "--hover-color": color }} >{landing.button}</div>
                </div>
            </div>
            <div id="landing-footer-container"></div>
        </div>
    )
}