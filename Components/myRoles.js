import gsap from "gsap"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const MyRoles = () => {
  const [divId, setDivId] = useState("")
  const divRef = useRef([null])
  const first = () => {
    gsap.to("#assets", {
      x: 110,
      duration: 5,
      ease: "elastic.inOut",
      repeat: -1,
      yoyo: true,
      rotation: (Math.random() - 0.5) * 100,
    })
  }

  useEffect(() => {
    first()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When div comes into view
          if (entry.isIntersecting) {
            // Animate to 100% width
            console.log(entry.target.id, "45a45d545a4sd")

            setDivId(entry.target.id)
          } else {
            // Reset when out of view
            setDivId("")
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 10% visible
        rootMargin: "50px", // Start animation 50px before element comes into view
      }
    )

    if (divRef.current.length > 0) {
      divRef.current?.map((item) => {
        observer.observe(item)
      })
    }

    return () => {
      if (divRef.current.length > 0) {
        divRef.current?.map((item) => {
          observer.observe(item)
        })
      }
    }
  }, [])

  return (
    <div className="">
      <div
        id="mobile-view"
        className="lg:hidden  font-pencilFont font-semibold grid grid-cols-1 gap-10 text-center tracking-widest text-xl h-full"
      >
        <div
          ref={(el) => (divRef.current[0] = el)}
          id="item-1"
          className={` h-[40rem] ${
            divId === "item-1"
              ? "scale-100 duration-1000"
              : "scale-0 duration-1000"
          }  bg-center bg-cover pt-32  bg-[url('/model/resume_assets/black_board.png')]`}
        >
          <div id="title">
            e-sports
            <Image
              src="/model/resume_assets/controller.png"
              width={100}
              height={100}
              alt="sds"
              id="assets"
              className=" text-white"
            />
          </div>
          <div id="project">
            <p className="">
              fps lounge is a project that enables pro e-sports players to pass
              their knowledge to passionate and new emerging players{" "}
            </p>
          </div>
          <div id="role">
            <p className="text-wrap">
              I joined as a full stack dev
              <br />
              my role was to re write the entire app in next js and also made
              beta version for the app with new Ui
            </p>
          </div>
        </div>
        <div
          id="item-2"
          className={` h-[40rem]  ${
            divId === "item-2"
              ? "scale-100 duration-1000"
              : "scale-0 duration-1000"
          } bg-center bg-cover pt-32  bg-[url('/model/resume_assets/black_board.png')]`}
          ref={(el) => (divRef.current[1] = el)}
        >
          <div id="title">
            Pharmacy benefit management
            <Image
              src="/model/resume_assets/health.png"
              width={100}
              height={100}
              alt="asa"
              id="assets"
            />
          </div>
          <div id="project">
            <p className="text-wrap  p-10">
              created data visualization for pharmacy companies for monitoring
              price variation of drugs with the help of charts and graphs
            </p>
            <p className="text-wrap  p-10">
              I joined as a FE dev
              <br />
              my role was to write the app in react.js and use chat.js for data
              visualization
            </p>
          </div>
        </div>
        <div
          id="item-3"
          className={`h-[40rem] ${
            divId === "item-3"
              ? "scale-100 duration-1000"
              : "scale-0 duration-1000"
          } bg-center bg-cover pt-32  bg-[url('/model/resume_assets/black_board.png')]`}
          ref={(el) => (divRef.current[2] = el)}
        >
          <div id="title">
            natty-hatty talant management and sports
            <Image
              src="/model/resume_assets/football.png"
              width={100}
              height={100}
              alt="sds"
              id="assets"
              className=" animate-bounce"
            />
          </div>
          <div id="project">
            <p className="text-wrap  p-10">
              developed and maintained a talent management App for students and
              clubs using next.js , material-ui and redux toolkit{" "}
            </p>
            <p className="text-wrap  p-10">
              I joined as a FE dev
              <br />
              {`my role was to create ui and connect api's`}
            </p>
          </div>
        </div>

        <div
          id="item-4"
          className={`h-[40rem] ${
            divId === "item-4"
              ? "scale-100 duration-1000"
              : "scale-0 duration-1000"
          } bg-center bg-cover pt-32  bg-[url('/model/resume_assets/black_board.png')]`}
          ref={(el) => (divRef.current[3] = el)}
        >
          <p>
            <p className="text-[#bafbd9]">other honorable mentions :</p>
            <br />
            in my career spanning over four years as a dev i have also worked
            with tech like react-native, node js for creating e-comerce market ,
            web scraping tools etc
          </p>
        </div>
      </div>
      {/*  */}
      <table className="w-full lg:block hidden   text-white overflow-auto p-10 bg-green-800   font-pencilFont font-semibold  text-center tracking-widest text-2xl    ">
        <tr>
          <th className="w-auto p-10 text-wrap">industry</th>
          <th className="p-10 text-wrap ">project</th>
          <th className=" p-10 text-wrap ">role</th>
        </tr>
        <tr>
          <td className=" min-w-max">
            e-sports
            <Image
              src="/model/resume_assets/controller.png"
              width={100}
              height={100}
              alt="sds"
              id="assets"
              className="bg-transparent text-white   to-white"
            />
          </td>
          <td className="text-wrap  p-10">
            {" "}
            fps lounge is a project that enables pro e-sports players to pass
            their knowledge to passionate and new emerging players{" "}
          </td>
          <td className="text-wrap  p-10">
            I joined as a full stack dev
            <br />
            my role was to re write the entire app in next js and also made beta
            version for the app with new Ui
          </td>
        </tr>
        <tr>
          <td>
            Pharmacy benefit management
            <Image
              src="/model/resume_assets/health.png"
              width={100}
              height={100}
              alt="asa"
              id="assets"
              className="bg-transparent text-white   my-5  to-white"
            />
          </td>
          <td className="text-wrap  p-10">
            created data visualization for pharmacy companies for monitoring
            price variation of drugs with the help of charts and graphs
          </td>
          <td className="text-wrap  p-10">
            I joined as a FE dev
            <br />
            my role was to write the app in react.js and use chat.js for data
            visualization
          </td>
        </tr>
        <tr>
          <td className="w-max text-nowrap">
            natty-hatty talant management and sports
            <Image
              src="/model/resume_assets/football.png"
              width={100}
              height={100}
              alt="asa"
              className="bg-transparent text-white animate-bounce  my-5  to-white"
            />
          </td>
          <td className="text-wrap  p-10">
            developed and maintained a talent management App for students and
            clubs using next.js , material-ui and redux toolkit{" "}
          </td>
          <td className="text-wrap  p-10">
            I joined as a FE dev
            <br />
            {`my role was to create ui and connect api's`}
          </td>
        </tr>
        <tr className=" text-[#e9e3d3] ">
          <td></td>
          <td>
            <p className="text-[#bafbd9]">other honorable mentions :</p>
            <br />
            in my career spanning over four years as a dev i have also worked
            with tech like react-native, node js for creating e-comerce market ,
            web scraping tools etc
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  )
}

export default MyRoles
