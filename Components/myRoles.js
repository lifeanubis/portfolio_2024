import gsap from "gsap"
import { useEffect } from "react"

const MyRoles = () => {
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

  return (
    <div className="overflow-x-auto  w-full h-screen p-10  ">
      <table className="w-full   text-white overflow-auto p-10 bg-green-800   font-pencilFont font-semibold  text-center tracking-widest text-2xl    ">
        <tr>
          <th className="w-auto p-10 text-wrap">industry</th>
          <th className="p-10 text-wrap ">project</th>
          <th className=" p-10 text-wrap ">role</th>
        </tr>
        <tr>
          <td className=" min-w-max">
            e-sports
            <img
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
            <img
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
            <img
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
