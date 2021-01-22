import Logo from "../../images/logo.png";

const FAQ = () => {
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
            <h2>Video Chat FAQ</h2>
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
            <h2>How to Start</h2>
            <div className="accordion ui-accordion ui-widget ui-helper-reset">
              <details>
                <summary className="ui-accordion-header">
                  How do I begin viewing webcams?
                </summary>
                <div>
                  To start viewing random people on webcam, simply press on
                  "Allow" and then press on the large "Start" button.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  Can I filter the people that I see?
                </summary>
                <div>
                  As a random chat site, we have not developed many filters
                  because we want to keep the entire concept of this chat site
                  random. However, you do have the ability to filter users
                  according to their location. In order to do so, click on the
                  Country dropdown menu near the top of the screen and choose a
                  country that you wish to meet people from. You can either
                  choose to meet people from one country at a time or you can
                  view all users randomly.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  How do I talk to strangers I meet?
                </summary>
                <div>
                  There are two ways for you to communicate with the people you
                  meet on CamSurf - you can either text chat by typing in the
                  text area or you can talk directly into the microphone/webcam
                  if you have enabled your microphone.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  I don't like the person I'm talking to - how do I meet someone
                  new?
                </summary>
                <div>
                  Swapping between users is the easiest thing ever! Simply press
                  on the "Next" button, which is located under your own webcam
                  and you will instantly be brought to someone else's webcam.
                  Keep pressing the "Next" button to go from cam to cam.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  Can I stop seeing webcams without exiting the website?
                </summary>
                <div>
                  Absolutely! There is a "Stop" button located right under your
                  webcam screen - press it at any time to immediately stop
                  viewing webcams. You can resume viewing webcams at any time by
                  pressing on the "Start" button.
                </div>
              </details>
            </div>
            <h2>Common Issues</h2>
            <div className="accordion ui-accordion ui-widget ui-helper-reset">
              <details>
                <summary className="ui-accordion-header">
                  It says I'm from a different country.
                </summary>
                <div>
                  CamSurf determines your country according to your IP. The most
                  common reason for your country being wrong is that you are
                  using a proxy or you are using an IP that is based in a
                  different country. If you are not using a proxy, please
                  contact our support team for additional assistance.
                </div>
              </details>
            </div>
            <h2>Webcam FAQs</h2>
            <div className="accordion ui-accordion ui-widget ui-helper-reset">
              <details>
                <summary className="ui-accordion-header">
                  CamSurf isn't detecting my webcam.
                </summary>
                <div>
                  First, make sure that your webcam is plugged in properly and
                  is turned on. Next, verify that your firewall isn't blocking
                  access to your webcam. Try turning off your firewall
                  completely to see if the problem gets resolved. If your webcam
                  still isn't detected even when your firewall is turned off,
                  contact our support team for further assistance.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  My webcam seems to be working fine, but others cannot see me.
                </summary>
                <div>
                  <p>
                    If you can see yourself in your webcam screen area and your
                    webcam seems to be working fine, but others cannot see you,
                    contact our support team and provide the following
                    information:
                  </p>
                  <ol>
                    <li>
                      Your internet browser (Google Chrome, Firefox, Safari)
                    </li>
                    <li>Your operating system (Windows 10, OS X Yosemite)</li>
                    <li>
                      Your type of internet connection (DSL, Wi-Fi, Cable)
                    </li>
                  </ol>
                  <p>
                    We will look into the issue and get back to you as soon as
                    possible.
                  </p>
                </div>
              </details>
            </div>
            <h2>Terms and Community Guideline FAQ</h2>
            <div>
              <b>
                Below are some common questions regarding how CamSurf exercises
                their discretion to ban or suspend users for violating our Terms
                of Use, and how the examples given in our Community Guidelines
                are used to alert us that such a violation is threatened or
                imminent.
              </b>
            </div>
            <div className="accordion ui-accordion ui-widget ui-helper-reset">
              <details>
                <summary className="ui-accordion-header">
                  Are users allowed to record the webcam of others and post it
                  online?
                </summary>
                <div>
                  Recording and distributing the content broadcast by another
                  user without their permission may be a violation of our Terms,
                  and that Users rights to publicity and privacy, or under
                  copyright law. In some limited instances you may chose to
                  record abusive behavior, or behavior you believe to be a
                  violation of our Terms of Use — CamSurf can make no
                  determination when this may be warranted, but will review the
                  material if submitted to us. As our Privacy policy explains,
                  there may be instances where other users record of broadcast
                  your content without your consent. If you become aware of this
                  please report it. Although such recording, and distribution is
                  against our Terms and Policies, be aware that it can occur,
                  whether or not permitted, accordingly we advise that you don't
                  do anything that you wouldn't want others to see. While we
                  prohibit such recordings, be aware it could happen and in some
                  cases neither you, nor CamSurf would be aware of it at the
                  time.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  Can I save the text chats?
                </summary>
                <div>
                  The same provisions as those above apply to content delivered
                  as chat. In limited circumstances it may be permissible to
                  save content for your own use, or to keep a record, but we do
                  not provide you with any tools to do so.
                </div>
              </details>
            </div>
            <h2>Abuse FAQs</h2>
            <div className="accordion ui-accordion ui-widget ui-helper-reset">
              <details>
                <summary className="ui-accordion-header">
                  How do I report someone with an inappropriate behavior?
                </summary>
                <div>
                  If you are subjected to behavior from another user you believe
                  to be in violation of our Terms of Use, this should be
                  reported to CamSurf immediately especially if that behavior is
                  persistent and harassing. You may do so by pressing on the
                  "Report Abuse" button located on the user's webcam when
                  hovering. If you see nudity, abusive or illegal behavior,
                  please report it, so appropriate actions may be taken where we
                  believe they are warranted. Including reporting it to the
                  appropriate authorities.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  What happens when I report someone for abuse?
                </summary>
                <div>
                  We will take appropriate actions, considering your report and
                  any information collected or provided. Depending on our
                  decision — OR in the period in which a decision is being made
                  — that User may be banned while the issue is being reviewed,
                  or as a finding of our review, they may be banned or
                  permanently suspended.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  What can I do if I was banned for abuse?
                </summary>
                <div>
                  Users who have been banned, will receive a notification
                  identifying the length of the ban and other information, which
                  we may provide, at our discretion. The length of a ban is
                  determined based on a number of factors, including the conduct
                  being reported, as well as that User's history of past
                  complaints or violations under our Terms. In some instances,
                  Users may have the option to expedite the review period, or
                  ban, by using our Fast Track service. The availability or use
                  of this service, is at CamSurf's discretion, and will not be
                  offered to Users who have demonstrated a pattern of violations
                  of our Terms of Use. Fast Track services do NOT relieve Users
                  of their obligation to observe our Terms of Use in the future.
                </div>
              </details>
            </div>
            <h2>Banning</h2>
            <div className="accordion ui-accordion ui-widget ui-helper-reset">
              <details>
                <summary className="ui-accordion-header">
                  Why Do Users Get Banned?
                </summary>
                <div>
                  CamSurf users may be banned when CamSurf reasonably believes a
                  violation of our Terms of Use has occurred. Reviewing our
                  Acceptable Use Policy contained in the Terms of Use will
                  explain many of the circumstances that constitute a violation.
                  Our Community Guidelines page offers some illustrations, and
                  suggestions, to avoid having your account banned, or possibly
                  permanently suspended.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  How Can I Get Unbanned?
                </summary>
                <div>
                  You must either wait the duration of the period of the ban
                  that will be communicated to you via our Service. In some
                  instances, you may be provided the opportunity to have your
                  User activity reviewed immediately and reinstated, if we
                  believe appropriate by using our Fast Track services. Cam Surf
                  is not under a duty to offer this service to all users.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  How Long Does the Ban Last?
                </summary>
                <div>
                  The Ban Screen, viewable when entering chat, will provide you
                  with this information. A number of factors determine the
                  length of your ban, including the severity of the activity
                  reported, the number of past similar instances, as well as the
                  length of your ban. Ban duration is the amount of time,
                  CamSurf has reasonably determined the matter will take to
                  review in order to ensure our Service remains safe and adheres
                  to community guidelines.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  Why are Some Bans Permanent?
                </summary>
                <div>
                  CamSurf may decide in some instances to convert a ban into a
                  permanent suspension, if they find that the frequency or
                  nature of your violation presents an appreciable threat to our
                  Service.
                </div>
              </details>
              <details>
                <summary className="ui-accordion-header">
                  What If I Was Wrongly Banned?
                </summary>
                <div>
                  CamSurf strives to maintain accuracy in the use of our banning
                  system. The duration of the ban is a calculation we feel is
                  reasonable. Providing a safe community is among our main
                  goals, and one of the reasons you have chosen to use CamSurf.
                  If you feel another User has reported you in order to harass
                  you, we advise that you report this to us, misuse of any
                  portion of the CamSurf services can constitute a violation,
                  and we will deal with such abuse accordingly.
                </div>
              </details>
            </div>
            <div>
              DISCLAIMER: All guidance, whether in the form of Guidelines, or
              Frequently Asked Questions, is meant to supplement or explain
              provisions in the Terms of Use. Nothing contained in this guidance
              should be construed to limit our Terms, in the event of any
              conflict between this guidance, and our Terms, the Terms control,
              nothing contained herein is presented as an exhaustive list of
              prohibited behaviors.
            </div>
            <p className="last"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
