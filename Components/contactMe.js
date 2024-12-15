import "@lottiefiles/dotlottie-wc"

const ContactMe = () => {
  return (
    <div className="w-full h-full  items-center mt-60 place-items-end grid grid-cols-4 ">
      <div className="w-full  ">
        <dotlottie-wc
          src="https://lottie.host/92952044-2e16-4628-b9ce-56d6ed2a15f8/ZxMnC0roqA.lottie"
          autoplay
          loop
        ></dotlottie-wc>
      </div>

      <div className="cursor-pointer w-60 h-60 items-center flex justify-center top-0 bg-center bg-cover bg-[url('/model/resume_assets/direction.png')]">
        <img
          width={100}
          height={100}
          src="/model/resume_assets/link.svg"
          alt="/model/resume_assets/direction.png"
          className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"
        />
        {/* <div className="w-20 h-20 relative bottom-1/4    cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"></div> */}
      </div>

      <a href="https://www.w3schools.com" target="_blank">
        <div className="cursor-pointer w-60 h-60 items-center flex justify-center top-0 bg-center bg-cover bg-[url('/model/resume_assets/direction.png')]">
          <img
            width={100}
            height={100}
            src="/model/resume_assets/git.svg"
            alt="/model/resume_assets/direction.png"
            className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"
          />
        </div>
      </a>
      {/* <div className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"></div> */}

      <div className="cursor-pointer w-60 h-60 items-center flex justify-center top-0 bg-center bg-cover bg-[url('/model/resume_assets/direction.png')]">
        <img
          width={100}
          height={100}
          src="/model/resume_assets/gmail.svg"
          alt="/model/resume_assets/direction.png"
          className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"
        />
        {/* <div className="w-20 h-20 relative   bottom-1/4 cursor-pointer bg-green-800/20 p-2 rounded-full  hover:scale-90 hover:drop-shadow-2xl hover:shadow-2xl hover:translate-x-5  shadow-inner transition-all ease-out duration-500"></div> */}
      </div>
    </div>
  )
}

export default ContactMe
