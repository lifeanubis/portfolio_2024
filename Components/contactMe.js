/* eslint-disable @next/next/no-img-element */
import "@lottiefiles/dotlottie-wc"
import { useRef, useState } from "react"

const ContactMe = () => {
  const audioRefPhone = useRef(null)

  const [hover, setHover] = useState(false)

  const playAudioSnippet = () => {
    audioRefPhone.current.play()
  }
  const stopAudioSnippet = () => {
    audioRefPhone.current.pause()
  }

  return (
    <div className="w-full h-full  items-center mt-60 place-items-end grid xl:grid-cols-4 grid-cols-1 cursor-pointer ">
      <div>
        <audio ref={audioRefPhone}>
          <source src="/sounds/phone.mp3" type="audio/mp3" />
        </audio>

        <div
          className="w-full"
          onMouseEnter={() => {
            playAudioSnippet()
            setHover(true)
          }}
          onMouseLeave={() => {
            stopAudioSnippet()
            setHover(false)
          }}
        >
          <div
            className={`${
              hover === true
                ? "scale-100 duration-1000"
                : "scale-0 duration-1000"
            } text-black text-center -mt-10   font-bold text-3xl   font-mono  mx-auto  `}
          >
            +91 7049766754
          </div>
          <dotlottie-wc
            src="https://lottie.host/92952044-2e16-4628-b9ce-56d6ed2a15f8/ZxMnC0roqA.lottie"
            autoplay
            loop
          ></dotlottie-wc>

          <div className=" text-black text-center -mt-10  font-bold text-3xl animate-pulse   font-pencilFont  mx-auto    ">
            HOVER / CLICK
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3  place-items-center xl:place-items-stretch place-content-around gap-52  ">
        <a
          href="https://www.linkedin.com/in/shreyansh-sharma-3386621b2"
          target="_blank"
        >
          <div className="cursor-pointer   scale-75 xl:scale-100  w-60 h-60 items-center flex justify-center top-0 bg-center bg-cover bg-[url('/model/resume_assets/direction.png')]">
            <img
              width={100}
              height={100}
              src="/model/resume_assets/link.svg"
              alt="/model/resume_assets/direction.png"
              className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"
            />
          </div>
        </a>
        <a href="https://github.com/lifeanubis" target="_blank">
          <div className="cursor-pointer scale-75 xl:scale-100 w-60 h-60 items-center flex justify-center top-0 bg-center bg-cover bg-[url('/model/resume_assets/direction.png')]">
            <img
              width={100}
              height={100}
              src="/model/resume_assets/git.svg"
              alt="/model/resume_assets/direction.png"
              className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"
            />
          </div>
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=code.shreyansh@gmail.com"
          target="_blank"
        >
          <div className="cursor-pointer scale-75 xl:scale-100 w-60 h-60 items-center flex justify-center top-0 bg-center bg-cover bg-[url('/model/resume_assets/direction.png')]">
            <img
              width={100}
              height={100}
              src="/model/resume_assets/gmail.svg"
              alt="/model/resume_assets/direction.png"
              className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"
            />
          </div>
        </a>
      </div>
    </div>
  )
}

export default ContactMe
