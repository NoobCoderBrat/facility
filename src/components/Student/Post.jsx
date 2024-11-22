import React, { useState } from "react";
import Comment from "./Comment";

const Post = ({ user, time, content, comments }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full">
      <div className="flex items-center mb-2">
        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
          {user.charAt(0)}
        </div>
        <div>
          <div className="font-semibold">{user}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      </div>
      <div className="mb-2">{content}</div>
      <div className="flex items-center text-gray-500 mb-3">
        <button
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
          onClick={() => setShowComments(!showComments)}
          aria-expanded={showComments}
          aria-controls={`comments-${user}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          {comments.length}
        </button>
      </div>
      <hr />
      {showComments && comments.length > 0 && (
        <div id={`comments-${user}`} className="mt-4">
          <div className="text-sm text-gray-500 mb-2">
            {comments.length} comments
          </div>
          {comments.map((comment, idx) => (
            <Comment key={idx} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
