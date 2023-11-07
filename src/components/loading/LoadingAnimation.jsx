import React from "react";
import "./loadingAnimation.css";
export default function LoadingAnimation() {
  return (
    <div className="flex-center flex-column width100 height100vh loading-position">
      <div className="loading flex-column">
        <div className="flex">
          <div className="circle-loading" />
          <div className="circle-loading" />
          <div className="circle-loading" />
        </div>
      </div>
      <div className="mt-20 fz-24 color-black fw-800 loading-text">
        載入中...
      </div>
    </div>
  );
}
