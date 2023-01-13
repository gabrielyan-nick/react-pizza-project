import React from "react";
import ContentLoader from "react-content-loader";
import '../Skeleton/skeleton.scss';

const Skeleton = () => (
  <ContentLoader
  className="pizza-skeleton"
    speed={2}
    width={280}
    height={491}
    viewBox="0 0 280 491"
    backgroundColor="#ffffff"
    foregroundColor="#ffdf8c"
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="54" />
    <rect x="0" y="334" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="442" rx="6" ry="6" width="88" height="45" />
    <rect x="130" y="442" rx="6" ry="6" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
