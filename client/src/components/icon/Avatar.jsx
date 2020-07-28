import React from "react";
function Avatar({ clbk, avatar = "" }) {
  const fileInput = React.createRef();

  return (
    <div
      htmlFor="image"
      className={"custom-upload label"}
      title="change avatar"
    >
      {avatar && <img src={avatar} alt="user avatar" />}
      <input
        ref={fileInput}
        type="file"
        className="is-hidden"
        onChange={clbk}
      />
    </div>
  );
}

export default Avatar;
