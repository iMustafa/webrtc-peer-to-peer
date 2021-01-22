import Logo from "../../images/logo.png";

const About = () => {
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
            <h1>About Camsurf Video Chat</h1>
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
            <img
              className="float-left"
              src="../images/about.jpg"
              alt="about Camsurf random video chat"
              width="280"
              height="280"
            />
            <p>
              Camsurf is a random video chat app that allows users to connect
              with people from all over the world. With this idea at the core of
              our service, we offer users an easy-to-use, fun, and free platform
              where they can engage in conversations with random people and make
              new friends.
            </p>
            <div className="clearfix"></div> <h2>Why we’re Different</h2>
            <p>
              Around our central idea of creating a better chat experience, we
              have built a platform which is simple to use and comes packed with
              great features. Our service is simple to use, users can begin
              chatting by simply agreeing to our terms and privacy. Then
              enabling their webcam and clicking on the large ‘Start’ button to
              begin video chatting instantly. Our servers are fast and reliable,
              ensuring that connection speeds are blazing fast, even when
              connecting to someone from the other side of the world. We also
              offer users the ability to choose the location of users they wish
              to connect with, providing a great way to learn a new language or
              find out about a different culture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
