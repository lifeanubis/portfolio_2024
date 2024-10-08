// const [alterText, setAlterText] = useState("")
// const [delayText, setDelayText] = useState<[]>()

// const [trigger, setATrigger] = useState(false)

// const scramble = (textArg: string) => {
//   const tempString = textArg?.split("")
//   setTimeout(() => {
//     tempString?.map((item, index) => {
//       setTimeout(() => {
//         tempString[index] = Math.floor(Math.random() * 10).toString()
//         setAlterText(tempString?.join(""))
//         setTimeout(() => {
//           tempString[index] = item
//           setAlterText(tempString?.join(""))
//         }, 100)
//       }, (index + 1) * 200)
//     })
//   }, 100)
// }

// const delayTextFunc = (textString: string) => {
//   const tempDelayString = textString?.split("")
//   const popo: any = []
//   tempDelayString?.map((item, index) =>
//     setTimeout(() => {
//       popo.push(item)
//       console.log(popo, "----")
//       setDelayText(popo.join(""))
//     }, index * 200)
//   )
// }

// useEffect(() => {
//   scramble("Welcome to my world")
//   delayTextFunc("lets begin")

//   return () => {
//     scramble("")
//     delayTextFunc("")
//   }
// }, [trigger])

{
  /* <h1 className="text-6xl font">{alterText}</h1>
      <h1 className="text-6xl font">{delayText}</h1> */
}
