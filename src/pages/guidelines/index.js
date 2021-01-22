import Logo from "../../images/logo.png";

const GuideLines = () => {
  return (
    <div id="wrapper">
      <div id="header">
        <div id="header-content">
          <a href="/" title="CamSurf">
            <img src={Logo} alt="" title="" height="58" />
          </a>
        </div>
      </div>
      <div id="content">
        <div id="welcome">
          <div id="welcome-content">
            <h1>Chat Guidelines</h1>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/faq/">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-block">
          <div className="text-block-content">
            <ol>
              <li>
                <a name="1">
                  It is a violation of our Terms of Use show disrespect to other
                  chat users, including:
                </a>
                <ul>
                  <li>obscene, indecent, or abusive commentaries;</li>
                  <li>
                    harrassing activities towards other chat users based on
                    their perceived religion, race, sexual orientation, gender
                    or other factors;
                  </li>
                  <li>threatening behavior towards other chat users;</li>
                  <li>
                    engaging in, or portraying violent or illegal behavior.
                  </li>
                </ul>
              </li>
              <li>
                <a name="2">
                  Our Terms of Use prohibits indecent behavior, namely:
                </a>
                <ul>
                  <li>to be naked or undressed while chatting;</li>
                  <li>
                    <u>to show naked portions of your body to the camera</u>;
                  </li>
                  <li>to offer virtual sex to other chat users;</li>
                  <li>to touch intimate parts of the body through clothing;</li>
                  <li>
                    lowering your camera aim to below your chest (please keep
                    the camera centered on your face);
                  </li>
                  <li>to otherwise simulate or suggest sexual activity.</li>
                </ul>
              </li>
              <li>
                <a name="3">Our Terms of Use also prohibits Users:</a>
                <ul>
                  <li>to broadcast your monitor’s image;</li>
                  <li>to aim the web camera at the images;</li>
                  <li>to aim the web camera at any text;</li>
                  <li>to use some software that imitates web cameras.</li>
                </ul>
              </li>
              <li>
                <a name="4">Our Terms of Use prohibits spam, which includes:</a>
                <ul>
                  <li>
                    to demonstrate commercial images and to post marketing
                    comments;
                  </li>
                  <li>to send uninvited commercial links in messages;</li>
                  <li>to be engaged in blanket mailing;</li>
                  <li>
                    to otherwise request users to review materials or engage in
                    commercial activity.
                  </li>
                </ul>
              </li>
              <li>
                <a name="5">Complaint Mechanism</a>
                <ul>
                  <li>
                    Every chat guest can file a complaint against another chat
                    user. We request that you provide as much information as you
                    have available about the incident, including screenshots.
                  </li>
                  <li>
                    Complaints are reviewed and evaluated on the basis of the
                    amount of complaints the user has recieved and the nature of
                    the complaint.
                  </li>
                </ul>
              </li>
            </ol>
            <p>
              Reporting violations of our Terms of Use assists us in providing a
              safe, and enjoyable community. We appreciate your participation,
              and will review complaints as they are received and decide what
              action should be taken at our discretion.
            </p>
            <p className="last"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideLines;
