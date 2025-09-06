"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Button, { IconTypes } from "../button/Button";

const ChatApplication = () => {
  return (
    <div className="h-full w-full flex flex-col bg-[#99FFFF]  pb-20 justify-end items-center ">
      <div className="div inline  text-black">
        <div className="card card-border shadow-xl bg-base-100 w-96">
          <div className="card-body">
            <input
              autoFocus
              type="text"
              placeholder="Ask about Sumedh here..."
              className="input input-ghost "
            />
            <div className="card-actions justify-end">
              <Button className="btn btn-primary" icon={IconTypes.SEARCH}>
                ASK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApplication;
