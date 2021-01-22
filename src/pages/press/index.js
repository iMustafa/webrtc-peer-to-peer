import Logo from "../../images/logo.png";

const Press = () => {
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
            <h2>CamSurf – Press</h2>
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
            <h2>Contacting Our Team</h2>
            <p>
              Members of the press are invited to contact us for potential
              stories about CamSurf or for any additional information about our
              website, app or service. We appreciate your interest and can be
              reached at the following:
            </p>
            <ul>
              <li>contact@camsurf.com</li>
            </ul>
            <h2>CamSurf Overview</h2>
            <p>
              CamSurf created a video chat platform where random people can meet
              each other using their webcam. We bring thousands of people
              together daily and help form bonds between complete strangers
              through laughter, similar interests and love. Our simple to use
              interface allows our users to quickly get the hang of our site to
              begin meeting new people around the world instantly.
            </p>
            <h2>How We Differ from Other Random Video Chat Apps</h2>
            <p>
              Since the original Chatroulette site launched back in 2009,
              hundreds of sites with random chat features started opening. Most
              of them are the same with absolutely nothing that makes them
              unique. CamSurf is one of the few video chat sites that has unique
              benefits.
            </p>
            <ul>
              <li>
                Camsurf developed a system that uses artificial intelligence
                combined with community reporting to help us identify users that
                violate our terms of use. This allows you to meet more people
                who actually want to have conversations.
              </li>
              <li>
                We are one of the only random video chat sites online to have a
                fully functional mobile phone app in Google Play that is
                available to use on all Android devices.
              </li>
            </ul>
            <h2>Diversified Audience</h2>
            <p>
              We attract millions of people every single month and those people
              come from all walks of life. Our audience is very diversified with
              users from over 200 different countries.
            </p>
            <p>
              When using CamSurf you will meet people of many different
              ethnicities and locations. Whether you want to learn a new
              language or even discover a different culture, we make it a
              possibility. CamSurf is the ideal place to converse online and
              have quality conversations with real people.
            </p>
            <h2>Rapid Growth</h2>
            <p className="last">
              CamSurf has been experiencing rapid growth for the past few years
              and is constantly gaining a larger fan base. With thousands of
              followers on Facebook and thousands of users always on webcam,
              there’s never a dull moment when using this video chat site. Our
              users love Camsurf and thousands of new people are joining in on
              the fun every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
