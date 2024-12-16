import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

const AboutMe = () => {
  const first = () => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      "#notes",
      {
        rotate: "-10",
      },
      {
        duration: 5,
        rotate: "10",
        ease: "sine",
        repeat: -1,
        yoyo: true,
      }
    )
    gsap.fromTo(
      "#photo",
      {
        rotate: "10",
      },
      {
        duration: 5,
        rotate: "-10",
        ease: "back.inOut",
        repeat: -1,
        yoyo: true,
      }
    )
  }

  useEffect(() => {
    first()
  }, [])

  return (
    <div className="bg-[url('/model/resume_assets/notice_board.png')] bg-contain bg-repeat-round scale-100 xl:scale-100  h-full w-full overflow-hidden ">
      <div className="grid grid-cols-2  place-content-center   place-items-center ">
        <div
          id="photo"
          className="font-pencilFont scale-75 xl:scale-125 mt-32   text-black bg-[url('/model/resume_assets/photo_frame.jpg')] bg-cover bg-center min-h-80 min-w-80 "
        >
          <div className=" col-span-2  font-pencilFont scale-75 xl:scale-75  text-black bg-[url('/model/resume_assets/ss_texture.jpg')] bg-cover bg-center min-h-80 min-w-80 "></div>
        </div>
        <div
          id="notes"
          className="  font-pencilFont scale-75 xl:scale-125 tracking-widest    text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-80 min-w-80 "
        >
          <h3 className="text-zinc-800 relative top-28   text-center max-w-full text-wrap font-bold text-lg  ">
            my name is
          </h3>
          <h1 className="text-zinc-800 relative top-28   text-center max-w-full text-wrap font-bold text-lg  ">
            SHREYANSH SHARMA
            <br />
            you can call me
            <br />
            :-shrey-:
          </h1>
          <h3 className="text-zinc-800 relative top-28    text-center max-w-full text-wrap font-bold text-lg  ">
            I am from "India"
          </h3>
        </div>
        <div
          id="notes"
          className="  font-pencilFont scale-75 xl:scale-125    text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-80 min-w-80 "
        >
          <p className="text-black relative top-28   text-center max-w-full text-wrap font-bold text-lg  ">
            I am a<p className="text-[#6cd8ff]"> MERN stack developer</p>
          </p>
          <p className="relative top-28 text-lime-200   max-w-52 mx-auto text-wrap text-center   text-lg font-semibold ">
            {`with "FOUR YEARS" of experence`}
          </p>
          <h3 className=" relative top-28  max-w-40 mx-auto text-center text-xl font-semibold text-gray-800  ">
            currently serving in
            <p className="text-zinc-300">{`"fps lounge"`}</p>
          </h3>
        </div>
        <div
          id="notes"
          className=" font-pencilFont scale-75 xl:scale-125    text-black bg-[url('/model/resume_assets/notes_yellow.png')] bg-cover bg-center min-h-80 min-w-80 "
        >
          {/* <div className=" text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-[30rem] min-w-96 "> */}
          <p className="text-slate-700 relative top-20   text-center max-w-full text-wrap font-bold text-lg  ">
            as a developer i like
            <br />
            crafting new products
            <br />
            from raw vision and ideas{" "}
          </p>
        </div>
        <div
          id="notes"
          className="  font-pencilFont scale-75 xl:scale-125    text-black bg-[url('/model/resume_assets/notes_yellow.png')] bg-cover bg-center min-h-80 min-w-80 "
        >
          {/* <div className=" text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-[30rem] min-w-96 "> */}
          <p className="text-slate-800 relative top-20 text-nowrap text-center items-center min-w-52 font-bold text-lg  ">
            completed my graduation in
            <p className="font-mono">2019</p>
            from mechanical
            <br />
            working as a software
            <br />
            developer since then
          </p>
        </div>
        <div
          id="notes"
          className="  font-pencilFont scale-75 xl:scale-125    text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-80 min-w-80 "
        >
          {/* <div className=" text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-[30rem] min-w-96 "> */}
          <p className="text-black relative top-28   text-center max-w-full text-wrap font-bold text-lg  ">
            i like{" "}
            <p className="text-[#6cd8ff]">martial arts , chess, cooking </p>
          </p>
          <p className="relative top-28 text-[#6cd8ff]  text-center max-w-80 text-wrap text-lg font-semibold ">
            learning new technologies
          </p>
          <p className=" relative top-28  max-w-40 mx-auto text-center text-xl font-semibold text-zinc-700  ">
            i am also very fond of bike rides
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
