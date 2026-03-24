import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { MdOutlineLiveTv } from "react-icons/md";
import ConditionalRenderer from "@/components/shared/ConditionalRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTypes } from "@/constants/iconTypes";

export default function ProjectCard({
  Title,
  Description,
  Technologies = [],
  Link: externalLink,
  ImageSrc,
  href,
  btnIcon,
  btnLabel = "Read More",
}) {
  return (
    <div className="mb-4 max-w-full cursor-pointer break-inside-avoid rounded-xl bg-white p-4 shadow-md transition duration-500 ease-in-out hover:shadow-lg">
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
        {ImageSrc ? (
          <img
            src={ImageSrc}
            alt="Project preview"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <h3 className="mb-2 text-lg font-semibold">{Title}</h3>
      <p className="mb-3 text-sm text-gray-700">{Description}</p>

      {Technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Technologies.map((tech, idx) => (
            <Badge key={idx} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <FaGithub className="text-black" />
            <a
              href={externalLink || "#"}
              className="text-sm text-neutral-800 underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Github Link
            </a>
          </span>

          <span className="flex items-center gap-1">
            <MdOutlineLiveTv className="text-sky-600" />
            <a
              href={externalLink || "#"}
              className="text-sm text-sky-700 underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Live Site
            </a>
          </span>
        </div>
      </div>
      <ConditionalRenderer condition={href}>
        <div className="card-actions mt-4 justify-end">
          <Button asChild variant="default" size="default">
            <Link to={href} className="inline-flex items-center gap-2">
              {btnLabel || "Read More"}
              {btnIcon === IconTypes.ARROW_RIGHT ? (
                <FaArrowRight className="text-inherit" />
              ) : null}
            </Link>
          </Button>
        </div>
      </ConditionalRenderer>
    </div>
  );
}
