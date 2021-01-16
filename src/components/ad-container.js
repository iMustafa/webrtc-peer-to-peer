import { Fragment } from "react";
import { useSelector } from "react-redux";
import AdImage from "../images/ad-placeholder.jpg";

const AdPlaceholder = () => {
  const { isShowingAd } = useSelector((state) => state.user);

  return isShowingAd ? (
    <div className="overlay">
      <div className="buttons-container">
        <img src={AdImage} />
      </div>
    </div>
  ) : (
    <Fragment />
  );
};

export default AdPlaceholder;
