import { Canvas, useFrame } from "@react-three/fiber"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

const TechStack = () => {
  const techRef = useRef(null)
  const refs = useRef([])

  const timeLine = gsap.timeline()
  const imageList = [
    {
      src: "/model/resume_assets/typescript.svg",
      text: "Typescript reduces bugs and improve code",
    },
    {
      src: "/model/resume_assets/react.svg",
      text: "React is a great tool that transformed web dev",
    },
    {
      src: "/model/resume_assets/firebase.svg",
      text: "firebase is an easy solution for fast back-end dev",
    },
    {
      src: "/model/resume_assets/github.svg",
      text: "git ensures seamless cordination between teams ensures code continuty",
    },
    {
      src: "/model/resume_assets/storybook.svg",
      text: "Storybook is great for visualization of ui parts in isolation",
    },
    {
      src: "/model/resume_assets/nodejs.svg",
      text: "Node js creates connection b/w FE and BE via api end points",
    },
    {
      src: "/model/resume_assets/graphql.svg",
      text: "Graphql uses graph nodes for data fetching extreamly usefull for complex apps",
    },
    {
      src: "/model/resume_assets/postman.svg",
      text: "Postman is used to mock api's before integration",
    },
    {
      src: "/model/resume_assets/redux.svg",
      text: "Redux is a state management library for easy state manupulation",
    },
    {
      src: "/model/resume_assets/material-ui.svg",
      text: "Material Ui helps in spinning up app Ui ultra fast using pre designed components",
    },
    {
      src: "/model/resume_assets/javascript.svg",
      text: "Javascript is a great language for developing web applications",
    },
    {
      src: "/model/resume_assets/mongodb.svg",
      text: "MongoDb is a nosql database that has great features when it comes to data base",
    },
  ]

  useEffect(() => {
    let speed = 2 // Pixels per second

    const popoMo = (ele) => {
      gsap.to(`#popoMo${ele} p`, {
        scale: 2,
        duration: 2.0,
        opacity: 1,
        backgroundColor: "black",
        background: "rgb(2,0,36)",
        background:
          "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(121,9,101,0) 35%, rgba(0,212,255,1) 100%)",
        borderRadius: "25px",
      })
      gsap.to(`#popoMo${ele} img`, {
        scale: 2,
        duration: 2.0,
      })
      gsap.to(`#popoMo${ele}`, {
        marginTop: "-7rem",
      })
    }

    const popoMoShrink = (ele) => {
      gsap.to(`#popoMo${ele} p`, {
        marginTop: "0px",
        scale: 1,
        duration: 2.0,
        backgroundColor: "transparent",
        opacity: 0,
      })
      gsap.to(`#popoMo${ele} img`, {
        marginTop: "0px",
        scale: 1,
        duration: 2.0,
        backgroundColor: "transparent",
      })
      gsap.to(`#popoMo${ele}`, {
        marginTop: "0rem",
      })
    }
    const elements = document.querySelectorAll("#tech_item")
    const positions = Array.from(elements).map(() => -window.innerWidth)

    gsap.ticker.add(() => {
      const delta = gsap.ticker.deltaRatio() // Get frame time delta ratio

      elements.forEach((element, index) => {
        if (
          element.getBoundingClientRect().x > window.innerWidth / 4 &&
          element.getBoundingClientRect().x < window.innerWidth / 2
        ) {
          popoMo(index)
        } else {
          popoMoShrink(index)
        }

        positions[index] += speed * delta
        // Apply the updated position
        element.style.transform = `translateX(${positions[index]}px)`

        if (positions[index] > window.innerWidth) {
          positions[index] = -window.innerWidth * 2.5
        }
      })
    })
  }, [])

  return (
    <div className="w-full h-screen  backdrop-blur-sm  ">
      <div className="z-50   flex justify-center   w-full h-full ">
        <img
          src="/model/resume_assets/tv_frame.png"
          alt="asdasd"
          className="w-[50rem] h-[35rem] z-50 "
        />
      </div>
      <div className="-z-10  items-center  w-full flex justify-between gap-60 ">
        {imageList.map((item, index) => (
          <div
            id="tech_item"
            ref={(el) => (refs.current[index] = el)}
            className="-mt-[40rem]"
          >
            <div id={`popoMo${index}`} className="">
              <img src={item.src} alt="asdasd" className=" w-full  h-20" />
              <p className="font-semibold  text-center w-[10rem]     font-pencilFont  text-xs p-2">
                {item?.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <div
        style={{
          background: "rgb(2,0,36)",
          background:
            "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(121,9,101,0) 35%, rgba(0,212,255,1) 100%)",
        }}
        className="  w-52 h-52"
      >
        asd
      </div> */}
    </div>
  )
}

export default TechStack
