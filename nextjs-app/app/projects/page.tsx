import { client } from "@/sanity/lib/client";
import { getProjectsGridQuery } from "@/sanity/lib/queries";
import { ProjectsGrid } from "./components/ProjectsGrid";

export default async function ProjectsPage() {
  const projects = await client.fetch(getProjectsGridQuery);

  return (
    <ProjectsGrid projects={projects} />
  );
}