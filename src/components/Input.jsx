import html2canvas from 'html2canvas'
import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import Logo from './Logo'
import Typed from 'react-typed'

export default function MemeGenerator() {
  const [inputText, setInputText] = useState({
    topText: 'Your Top Text Here',
    bottomText: 'Your Bottom Text Here',
  })

  const [selectedImage, setSelectedImage] = useState(null)
  const [fontSize, setFontSize] = useState(35)

  // Font Size
  let incFont = () => setFontSize(prevFontSize => prevFontSize + 4)
  let decFont = () => setFontSize(prevFontSize => prevFontSize - 4)

  // Function to handle input text change
  const handleChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  // Function to handle image upload
  const uploadImg = e => setSelectedImage(e.target.files[0])

  // Function to remove uploaded image
  const removeUplaodedImg = () => setSelectedImage(null)

  // Function to download the meme


const downloadMeme = () => {
  const memeContainer = document.querySelector('.img-container')

  // Render the image on the HTML canvas
  const canvas = document.createElement('canvas')
  canvas.width = memeContainer.clientWidth
  canvas.height = memeContainer.clientHeight

  html2canvas(memeContainer).then(canvas => {
    // Append the text to the memeContainer element
     const link = document.createElement('a')
    link.href = canvas.toDataURL()
    link.download = 'meme.png'
    link.click()
  })
}

  return (
    <div>
      {/* Logo */}
      <Logo />

      {/* React Tooltip */}
      <ReactTooltip place='bottom' type='light' effect='solid' />

      {/* Meme Temeplate */}
      <div className='warpper container'>
        {/* Photo */}
        <div className='img-container'>
          <div className='img-wrapper'>
            {/* Img and text */}
            <h3 className='top-text text' style={{ fontSize: `${fontSize}px` }}>
              {inputText.topText}
            </h3>
            <img
              src= {selectedImage ? URL.createObjectURL(selectedImage) : "./assets/img/spiderman.jpg"}
              style={{ marginRight: '30px' }}
            />
            <h3
              className='bottom-text text'
              style={{ fontSize: `${fontSize}px` }}
            >
              {inputText.bottomText}
            </h3>
          </div>
        </div>

        {/* Input */}
        <form className='form'>
          <Typed strings={['Start Type Meme Lord']} typeSpeed={40} />
          <br />

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

          {/* Buttons */}
          <div className='btns'>
            {/* Font Size */}

            {/* Increament Font Size */}
            <img
              onClick={incFont}
              src='./assets/img/plus.png'
              alt='Increament'
              data-tip='Increase Text Size'
            />

            {/* Decreament Font Size  */}
            <img
              onClick={decFont}
              src='./assets/img/minus.png'
              alt='Decrease Text Size'
              data-tip='Decrease Text Size'
            />

            {/* Download Image */}
            <a onClick={downloadMeme} data-tip='Download' alt='Download'>
              <img src='/assets/img/downlaod.png' alt='Download Img' />
            </a>

            {/* Upload Image */}
            <input type='file' onChange={uploadImg} id='fileUpload' />
            <label htmlFor='fileUpload' data-tip='Upload'>
              <img src='/assets/img/upload.png' alt='Upload Img' />
            </label>

            {/* Remove Image */}
            <img
              onClick={removeUplaodedImg}
              data-tip='Remove'
              src='/assets/img/delete.png'
              alt='Remove image'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
>>>>>>> d8bccfa (.)
