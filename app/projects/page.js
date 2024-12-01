import dynamic from "next/dynamic"

const ProjectsComponent = dynamic(
  () => import("@/Components/projectsComponent"),
  {
    ssr: false,
  }
)
const ProjectPage = () => {
  return (
    <div>
      <ProjectsComponent />
    </div>
  )
}

export default ProjectPage
