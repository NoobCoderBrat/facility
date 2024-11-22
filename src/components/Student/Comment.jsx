import React from "react";

const Comment = ({ user, time, content }) => {
  return (
    <div className="flex items-start mb-2">
      <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
        {user.charAt(0)}
      </div>
      <div>
        <div className="flex items-center">
          <div className="font-semibold mr-2">{user}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export default Comment;
