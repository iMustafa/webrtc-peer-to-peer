import CamSurfVideo from '../images/camsurf-video.png';
import $100Free from '../images/100-free.png';
import ClickAndChat from '../images/clickandchat.png';
import ChatOnTheGo from '../images/chatonthego.png';

const BottomPage = () => {
  return (
    <main id="wrapper" className="home-wrapper">
      <section className="flex-container">
        <div className="fc-title">
          <h1>Free Random Video Chat App!</h1>
        </div>

        <div className="fc-row">
          <div className="fcr-img">
            <a
              className="videoWrapper"
              href="https://www.youtube.com/embed/FRH4YYE9DjA?autoplay=1&amp;loop=1&amp;playlist=FRH4YYE9DjA"
            >
              <picture>
                <source
                  type="image/png"
                  srcSet={CamSurfVideo}
                />
                <img
                  src={CamSurfVideo}
                  alt="Camsurf video chat"
                />
              </picture>

              <span></span>
            </a>
          </div>

          <div className="fcr-content">
            <p>Welcome to Camsurf’s random video chat app!</p>

            <p>
              On Camsurf you can connect{" "}
              <strong>with thousands of people</strong> from all over the world
              in a <strong>fun environment</strong>. Our community reporting
              system helps make sure that people chatting on Camsurf are
              following our terms of use. Chat with confidence and meet
              interesting people just like you instantly.
            </p>

            <p>
              Our <strong>lightweight chat platform</strong> makes video chat
              easy without sacrificing great features. You’ll feel like a pro in
              seconds. Simply agree with our terms of use and privacy policy,
              allow access to your webcam and then click on the large ‘start’
              button to be instantly connected to a new and interesting person.{" "}
              <strong>
                You can even filter connections by location or language.
              </strong>
            </p>

            <p>
              Camsurf has thousands of users online at all times. If you want to
              meet someone new, simply click the ‘next’ button and you will be
              connected with a new stranger right away.{" "}
              <strong>It’s so simple to make hundreds of new friends</strong>,
              maybe you will even find that special someone.
            </p>
          </div>
        </div>
      </section>

      <section className="flex-container fc-wave fc-white">
        <div className="fc-row fc-revers">
          <div className="fcr-img">
            <picture>
              <source type="image/png" srcSet={$100Free} />
              <img
                className="img-responsive"
                src={$100Free}
                alt="Camsurf random video chat"
              />
            </picture>
          </div>

          <div className="fcr-content">
            <div className="fc-title">
              <h2>Random Video Chat</h2>
            </div>

            <p>
              Camsurf is unique in many ways. We believe that everyone should be
              able to easily meet people from all over the world using their
              webcam. That is why we created a way for you to instantly video
              chat with people worldwide or in a specific location based on your
              preference.{" "}
              <strong>
                Our random video chat app is the perfect way to chat with
                strangers and meet cool new people instantly.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="flex-container fc-wave fc-white">
        <div className="fc-row">
          <div className="fcr-img">
            <picture>
              <source
                type="image/png"
                srcSet={ClickAndChat}
              />
              <img
                className="img-responsive"
                src={ClickAndChat}
                alt="video chat with strangers"
              />
            </picture>
          </div>

          <div className="fcr-content">
            <div className="fc-title">
              <h2>Click and Cam Chat</h2>
            </div>

            <p>
              At Camsurf we want to make meeting new people as simple as
              possible. Our random video chat platform uses the{" "}
              <strong>fastest servers</strong> to allow lightning fast
              connections and <strong>ultra-high-quality streams</strong>. It
              takes less than a second to connect with someone and you can
              enable sound, chat with a mic or use our in-built text chat to
              type while still viewing the other person’s webcam.
            </p>
          </div>
        </div>
      </section>

      <section className="flex-container fc-wave">
        <div className="fc-row fc-revers">
          <div className="fcr-img">
            <picture>
              <source type="image/png" srcSet={ChatOnTheGo} />
              <img
                className="img-responsive"
                src={ChatOnTheGo}
                alt="free video chat app"
              />
            </picture>
          </div>

          <div className="fcr-content">
            <div className="fc-title">
              <h2>Mobile App on the Go</h2>
            </div>

            <p>
              As the perfect complement to our web browser-based chat platform,
              we are delighted to announce the launch of the Android Camsurf
              app. Now you can make new friends and meet new people wherever you
              are. <strong>The app is 100% free</strong> to download and
              designed to use minimal storage space on your device.
            </p>

            <p>
              We’ve designed the app to offer all the same great features you
              find on our web-based platform. Enjoy lightning fast connections,
              the ability to filter by location and language and other features
              that make Camsurf one of{" "}
              <strong>the fastest growing video chat services online</strong>.
              Keep an eye out for our Apple Store app which is in development.
            </p>
          </div>
        </div>
      </section>

      <div id="push"></div>
    </main>
  );
};

export default BottomPage;
