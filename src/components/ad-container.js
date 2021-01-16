import { Fragment } from "react";
import { useSelector } from "react-redux";
import AdImage from "../images/ad-placeholder.jpg";

const AdPlaceholder = () => {
  const { isShowingAd, skips } = useSelector((state) => state.user);

  return isShowingAd ? (
    <div className="overlay">
      <img src={AdImage} style={{width: '100%', height: '100%'}} />
    </div>
  ) : (
    <Fragment />
  );
};

export default AdPlaceholder;
