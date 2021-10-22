import React, { useEffect, useState } from "react";
import Logo from "./Logo";

export default () => {
  // Stats
  const [inputText, setInputText] = useState({
    topText: "1ST TEXT",
    bottomText: "2nd TEXT",
  });
  const [randomImage, setRandomImage] = useState(
    "https://i.imgflip.com/1bhw.jpg"
  );
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  // Inputs
  const handleChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  // Random Image
  const randomImg = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImgUrl = allMemeImgs[randNum].url;
    setRandomImage(randMemeImgUrl);
  };

  // Fetch Images
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => setAllMemeImgs(response.data.memes));
  }, []);

  return (
    <div>
      {/* Logo */}
      <Logo />

      <div className="warpper container">
        {/* Photo */}
        <div className="img-wrapper">
          {/* Img and text */}
          <h3 className="top-text text">{inputText.topText}</h3>
          <img src={randomImage} />
          <h3 className="bottom-text text">{inputText.bottomText}</h3>
        </div>

        {/* Input */}
        <form className="form" onSubmit={randomImg}>
          <input
            type="text"
            name="topText"
            placeholder="Add Top Text"
            value={inputText.topText}
            onChange={handleChange}
          />

          <input
            type="text"
            name="bottomText"
            placeholder="Add Bottom Text"
            value={inputText.bottomText}
            onChange={handleChange}
          />

          {/* Btns */}
          <div className="btns">
            {/* Random Img */}
            <a onClick={randomImg} alt="Random">
              <img src="/assets/img/random.png" />
            </a>

            {/* Downlaod Img */}
            <a href={randomImage} alt="Download" download target="_blank">
              <img src="/assets/img/downlaod.png" />
            </a>

            {/* UPlaod Img */}
            <a href={randomImage} alt="Uplaod">
              <img src="/assets/img/upload.png" />
            </a>
          </div>
        </form>
      </div>

      {/* CopyRight */}
      {/* <div className='copyright'>
        By: <a href='https://github.com/moghaazi'>moghaazi</a>
      </div>*/}
    </div>
  );
};
