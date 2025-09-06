import React from "react";
import AppleStyleDock from "@/app/components/AppleStyleDock";
import Header from "../components/Header";
import { SpotlightCustomColor } from "../components/SpotlightCustomColor/SpotlightCustomColor";
import ProjectCard from "../components/card/ProjectCard";
import Card1 from "../../../public/card-1.jpeg";
import { apiendpoints, config } from "../../../config/config";
import { fetchProjects } from "../helper/fetchhelper";
import { IconTypes } from "../components/button/Button";
const Page = async () => {
  const projects = await fetchProjects(apiendpoints.GET_ALL_PROJECTS_API);
  const projectsData = projects ? projects.data : [];
  console.log(projects, "projects");

  if (!projectsData) {
    return <div> loading...</div>;
  }

  return (
    <SpotlightCustomColor>
      {projectsData.length > 0 && (
        <div className="flex h-[100%] hello w-[100%]">
          <div className="relative h-full w-full overflow-y-auto scrollbar scroll-smooth  ">
            <Header title="Projects" />

            {/* Masonry layout using CSS columns */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4">
              {projectsData?.map((_, i) => (
                <ProjectCard
                  key={i}
                  Title={_.Name}
                  Description={_.Description}
                  Technologies={_.Technologies.split(", ").map((item) =>
                    item.trim()
                  )}
                  ImageSrc={
                    _.Showcase != null
                      ? `${config.STRAPI_BACKEND_BASEURL}${_.Showcase[0].formats.small.url}`
                      : ""
                  }
                  Link={_.Link}
                  href={`/projects/${_.slug}`}
                  btnIcon={IconTypes.ARROW_RIGHT}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </SpotlightCustomColor>
  );
};

export default Page;
