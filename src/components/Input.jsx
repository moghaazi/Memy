import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import Logo from './Logo'

export default () => {
  // Stats
  const [inputText, setInputText] = useState({
    topText: '1ST TEXT',
    bottomText: '2ND TEXT',
  })

  const [randomImage, setRandomImage] = useState(
    'https://i.imgflip.com/1bhw.jpg'
  )

  const [allMemeImgs, setAllMemeImgs] = useState([])

  const [selectedImage, setSelectedImage] = useState(null)

  // Inputs
  const handleChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  // Random Image
  const randomImgFunc = e => {
    e.preventDefault()
    const randNum = Math.floor(Math.random() * allMemeImgs.length)
    const randMemeImgUrl = allMemeImgs[randNum].url
    setRandomImage(randMemeImgUrl)
  }

  // Fetch Images
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => setAllMemeImgs(res.data.memes))
  }, [])

  // Upload image
  let uploadImg = e => setSelectedImage(e.target.files[0])

  // Remove uploaded image
  let removeUplaodedImg = () => setSelectedImage(null)

  // Download image

  return (
    <div>
      {/* Logo */}
      <Logo />

      {/* React Tooltip */}
      <ReactTooltip place='bottom' type='light' effect='solid' />

      <div className='warpper container'>
        {/* Photo */}
        <div className='img-wrapper'>
          {/* Img and text */}
          <h3 className='top-text text'>{inputText.topText}</h3>

          {selectedImage ? (
            <img src={URL.createObjectURL(selectedImage)} />
          ) : (
            <img src={randomImage} />
          )}

          <h3 className='bottom-text text'>{inputText.bottomText}</h3>
        </div>

        {/* Input */}
        <form className='form' onSubmit={randomImgFunc}>
          <input
            type='text'
            name='topText'
            placeholder='Add Top Text'
            value={inputText.topText}
            onChange={handleChange}
          />

          <input
            type='text'
            name='bottomText'
            placeholder='Add Bottom Text'
            value={inputText.bottomText}
            onChange={handleChange}
          />

          {/* Btns */}
          <div className='btns'>
            {/* Random Img */}
            <a
              onClick={randomImgFunc}
              data-tip='Random Image'
              alt='Random'
            >
              <img src='/assets/img/random.png' />
            </a>

            {/* Downlaod Img */}
            <a
              href={randomImage}
              data-tip='Downlaod Image'
              alt='Download'
              target='_blank'
              onClick={e => download(e)}
            >
              <img src='/assets/img/downlaod.png' />
            </a>

            {/* Upload Image */}
            <input type='file' onChange={uploadImg} id='fileUpload' />
            <label htmlFor='fileUpload' data-tip='Upload Image'>
              <img src='/assets/img/upload.png' />
            </label>

            {/* Remove Image */}
            <img
              onClick={removeUplaodedImg}
              data-tip='Remove Image'
              src='/assets/img/delete.png'
              alt='Remove image'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
