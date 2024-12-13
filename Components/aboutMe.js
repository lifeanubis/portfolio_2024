const AboutMe = () => {
  return (
    <div className="bg-[url('/model/resume_assets/notice_board.png')] bg-contain   bg-repeat-round w-full h-[90vh]  ">
      <div className="grid grid-cols-2  relative gap-10">
        <div className="text-start  absolute top-3  col-span-1  ">
          <div className="    text-black bg-[url('/model/resume_assets/photo_frame.jpg')] bg-cover bg-center min-h-80 min-w-80 ">
            <h1 className="text-black relative top-14  text-center font-bold text-2xl  ">
              asdasd
            </h1>
          </div>
        </div>
        <div className=" absolute top-3 right-2  col-span-1  ">
          <div className="  font-pencilFont      text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-80 min-w-80 ">
            {/* <div className=" text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-[30rem] min-w-96 "> */}
            <p className="text-black relative top-28  text-center max-w-80 text-wrap font-bold text-lg  ">
              i like{" "}
              <h1 className="text-green-800">martial arts , chess, cooking </h1>
            </p>
            <p className="relative top-28 text-green-800  text-center max-w-80 text-wrap   text-lg font-semibold ">
              learning new technologies
            </p>
            <p className=" relative top-28  max-w-40 mx-auto text-center text-xl font-semibold text-gray-800  ">
              i am also very fond of bike rides
            </p>
          </div>
        </div>
        <div className="text-start  absolute top-3 left-80  col-span-1  ">
          <div className=" font-pencilFont    text-black bg-[url('/model/resume_assets/notes_color.png')] bg-cover bg-center min-h-[30rem] min-w-96 ">
            <p className="text-black relative top-40  text-center max-w-96 text-wrap font-bold text-xl  ">
              I am a<h1 className="text-green-800"> MERN stack developer</h1>
            </p>
            <p className=" relative top-40  text-right max-w-80 text-wrap   text-xl font-semibold text-gray-800  ">
              {`with "FOUR YEARS" of experence`}
            </p>
            <p className=" relative top-40  text-center max-w-80 text-wrap   text-xl font-semibold text-gray-800  ">
              currently serving in
              <h1 className="text-green-800">fps lounge</h1>
            </p>
          </div>
        </div>
        <div className="font-pencilFont text-start  absolute top-64 right-5  col-span-1  ">
          <div className="    text-black bg-[url('/model/resume_assets/notes_yellow.png')] bg-cover bg-center min-h-80 min-w-80 ">
            <div className="    text-black bg-[url('/model/resume_assets/notes_yellow.png')] bg-cover bg-center min-h-80 min-w-96 ">
              <p className="text-slate-700 relative top-14 text-wrap    text-center font-semibold text-lg  ">
                as a developer i like
                <br />
                crafting new products
                <br />
                from raw vision and ideas
                {/* since my inception in to programming */}
              </p>
            </div>
          </div>
        </div>
        <div className="font-pencilFont   absolute top-64 right-64    ">
          <div className="    text-black bg-[url('/model/resume_assets/notes_yellow.png')] bg-cover bg-center min-h-80 min-w-96 ">
            <p className="text-slate-700 relative top-14 text-wrap    text-center font-semibold text-lg  ">
              completed my graduation in
              <h2 className="font-mono">2019</h2>
              from mechanical
              <br />
              working as a developer since then
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
