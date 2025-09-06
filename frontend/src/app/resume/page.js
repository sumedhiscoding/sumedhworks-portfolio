"use client";
import React, { useEffect, useRef } from "react";
import ChatApplication from "../components/ChatApplication/ChatApplication";

const ExpandCard = ({ title, desc }) => {
  return (
    <div className="bg-black p-3 rounded-md shadow-md text-sm text-white">
      <div className="font-bold text-white text-md">{title}</div>
      <div>{desc}</div>
    </div>
  );
};

export default function SineWaveCanvas() {
  const canvasRef = useRef(null);
  const milestoneRefs = useRef([]);
  const pausedRef = useRef(false); // flag for pause/resume

  // milestones.js
  const milestones = [
    {
      y: 800,
      label: "College",
      desc: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>B.E. in Computer Science</li>
          <li>Built projects in MERN stack & cloud</li>
          <li>Strong foundation in DSA & CS fundamentals</li>
        </ul>
      ),
    },
    {
      y: 650,
      label: "Congruent Solutions Intern",
      desc: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Worked on Payroll APIs with .NET 8 microservices</li>
          <li>Explored database performance tuning</li>
          <li>Hands-on with RabbitMQ & messaging patterns</li>
        </ul>
      ),
    },
    {
      y: 450,
      label: "Nirvin IT Intern",
      desc: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Worked on cloud infrastructure setup</li>
          <li>Explored Docker, Kubernetes basics</li>
          <li>Introduced to CI/CD pipelines</li>
        </ul>
      ),
    },
    {
      y: 250,
      label: "Congruent Solutions Software Engineer",
      desc: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Full-time engineer in Payroll domain</li>
          <li>Worked on 30+ microservices & batch jobs</li>
          <li>DevOps: AKS, Helm, Bicep IaC, Key Vault, CI/CD</li>
          <li>Building AI chatbot with Semantic Kernel</li>
        </ul>
      ),
    },
    {
      y: 100,
      label: "1 Year Experience",
      desc: (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>End-to-end ownership of microservices</li>
          <li>Advanced skills in cloud infra & security</li>
          <li>Specialized in database fine-tuning</li>
        </ul>
      ),
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let phase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw sine wave
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);

      for (let y = 0; y < height; y++) {
        const x = width / 2 + Math.sin((y + phase) * 0.015) * 90;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
      ctx.stroke();

      // Update milestone positions
      milestones.forEach((m, idx) => {
        const x = width / 2 + Math.sin((m.y + phase) * 0.015) * 90;
        const el = milestoneRefs.current[idx];
        if (el) {
          el.style.left = `${x - 6}px`;
          el.style.top = `${m.y - 6}px`;
        }
      });

      // Only advance animation if not paused
      if (!pausedRef.current) {
        phase += 0.5;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      className="relative container border-l-2 border-r-2 border-solid flex items-center gap-4"
      style={{ height: "900px" }}
    >
      {/* Left: Career Wave */}
      <div className="relative flex justify-center items-center z-10 bg-white">
        <svg className="absolute h-full w-full">
          <defs>
            <pattern
              id="grid-pattern"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 12H12M12 0V12"
                stroke="currentColor"
                strokeOpacity="0.08"
                className="stroke-gray-500"
              />
              <rect
                x="5"
                y="5"
                width="2"
                height="2"
                fill="currentColor"
                fillOpacity="0.008"
                className="fill-gray-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        <canvas ref={canvasRef} height={900} width={500} className="" />

        {/* Milestones rendered on top */}
        {milestones.map((m, idx) => (
          <div
            key={idx}
            ref={(el) => (milestoneRefs.current[idx] = el)}
            className="absolute"
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            {/* Hoverable milestone dot with tooltip */}
            {idx === 0 ? (
              <div className="tooltip  tooltip-top">
                <div className="tooltip-content ">
                  <ExpandCard title={m.label} desc={m.desc} />
                </div>
                <div className="w-5 h-5 rounded-full bg-pink-400 shadow-lg shadow-pink-300 border-2 border-white hover:scale-110 transition-transform cursor-pointer"></div>
              </div>
            ) : idx === milestones.length - 1 ? (
              <div className="tooltip tooltip-bottom">
                <div className="tooltip-content">
                  <ExpandCard title={m.label} desc={m.desc} />
                </div>
                <div className="w-5 h-5 rounded-full bg-pink-400 shadow-lg shadow-pink-300 border-2 border-white hover:scale-110 transition-transform cursor-pointer"></div>
              </div>
            ) : (
              <div className="tooltip tooltip-right">
                <div className="tooltip-content tooltip-[#white]">
                  <ExpandCard title={m.label} desc={m.desc} />
                </div>
                <div className="w-5 h-5 rounded-full bg-pink-400 shadow-lg shadow-pink-300 border-2 border-white hover:scale-110 transition-transform cursor-pointer"></div>
              </div>
            )}

            {/* Label */}
            <div
              className="mt-1 px-3 py-1.5 text-sm font-medium text-black
             bg-white rounded-md shadow-md
             hover:scale-[1.02] hover:shadow-lg
             transition-transform duration-200 ease-out cursor-default"
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Resume */}
      <div className="flex-1 z-0 h-full w-full bg-white">
        <ChatApplication />
      </div>
    </div>
  );
}
