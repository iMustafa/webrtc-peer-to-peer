import Logo from "../../images/logo.png";

const Contacts = () => {
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
            <h1>Contact – Camsurf</h1>
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
            <p>
              We hope you love Camsurf random video chat as much as we do, but
              if you have any questions, complaints, or just want to say hi you
              can get in touch with us by sending an email.
            </p>
            <form
              id="main-contact-form"
              className="contact-form"
              name="contact-form"
              method="POST"
              action="javascript:void(0)"
            >
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="cf_name"
                      name="cf_name"
                      className="form-control"
                      required="required"
                      placeholder="Your Name"
                      minlength="3"
                    />
                    <p className="help-block"></p>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="cf_email"
                      name="cf_email"
                      className="form-control"
                      required="required"
                      placeholder="Your Email"
                    />
                    <p className="help-block"></p>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="cf_subject"
                      name="cf_subject"
                      className="form-control"
                      required="required"
                      placeholder="Subject"
                      minlength="3"
                    />
                    <p className="help-block"></p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <textarea
                      style={{ maxHeight: 150 }}
                      name="cf_message"
                      id="cf_message"
                      required="required"
                      className="form-control"
                      rows="8"
                      placeholder="Enter Message Here"
                      minlength="10"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="send-form-btn">
                <button type="submit">Send</button>
              </div>
            </form>
            <p>
              We hope you love Camsurf random video chat as much as we do, if
              you have any questions, complaints, or just want to say hi you can
              get in touch with us by filling out this contact form.
            </p>
            <p>
              If you are contacting us in regards to being banned from the video
              chat platform, please make sure you have fully read our guidelines
              first. While you may feel that your ban is unjust, many users
              break the guidelines without realizing which has resulted in their
              removal from the chat platform.
            </p>
            <p>
              However, if you have fully read the guidelines and still feel that
              you have been banned unfairly, please be sure to include your ban
              ID in your message and explain fully what happened at the time. We
              will then review the case on your behalf.
            </p>
            <p>
              If you are contacting us in regards to a technical issue, please
              provide as much information as possible including the device you
              are using, your OS version, and an explanation of the issue you
              have encountered. If possible, please also email us a screenshot
              of the error or issue to
              <a href="mailto:support@camsurf.com">support@camsurf.com</a>.
            </p>
            <p>
              For all other contact, please make sure you include as much
              information as possible. Please note that we usually don't respond
              to messages unless they require a response but do take all
              feedback into consideration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
