import { client } from "@/sanity/lib/client";
import { getProjectsGridQuery } from "@/sanity/lib/queries"; // We'll reuse grid query for now
import ProjectsIndex from "../components/ProjectsIndex";

export default async function ProjectsIndexPage() {
  const projects = await client.fetch(getProjectsGridQuery);

  if (!projects?.length) {
    return <div>No projects found</div>;
  }

  return <ProjectsIndex projects={projects} />;
}