/* eslint-disable @next/next/no-img-element */
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

const TechStack = () => {
  const refs = useRef([])

  const [screenSize, setScreenSize] = useState(768)

  const imgList = [
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
      src: "/model/resume_assets/git.svg",
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
    let speed = screenSize < 768 ? 1 : 2 // Pixels per second

    // console.log(window.screen.availWidth, "----------")
    setScreenSize(window.screen.availWidth)
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
    const positions = Array.from(elements).map(() =>
      screenSize < 768 ? -window.innerWidth * 11 : -window.innerWidth * 3
    )

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
          positions[index] =
            screenSize < 768 ? -window.innerWidth * 11 : -window.innerWidth * 3
        }
      })
    })
  }, [screenSize])

  return (
    <div className="w-full h-screen  backdrop-blur-sm  ">
      <div className="   flex justify-center  items-baseline    w-full h-full ">
        <div className="  w-full lg:w-1/2  flex justify-between  items-end gap-60 ">
          <img
            width={1200}
            height={1200}
            src="/model/resume_assets/tv_frame.png"
            alt="asdasd"
            className="z-50 "
          />
          {imgList.map((item, index) => (
            <div
              key={index}
              id="tech_item"
              ref={(el) => (refs.current[index] = el)}
              className="-z-10 mb-20  xl:mb-52"
            >
              <div id={`popoMo${index}`} className="">
                <img
                  width={200}
                  height={200}
                  src={item?.src}
                  alt="asdasd"
                  className=" w-full  h-20"
                />
                <p className="font-semibold  text-center w-[10rem]     font-pencilFont  text-xs p-2">
                  {item?.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechStack
