import React, { useState } from "react";
import supabase from "../supabaseClient";

const Post = ({ id, name, created_at, content }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-GB");

  const handleShowComments = () => {
    fetch_comments();
    setShowComments(!showComments);
    setIsModalOpen(true);
  };

  const fetch_comments = async () => {
    try {
      const { error, data } = await supabase
        .from("Comment")
        .select("*")
        .eq("post_id", id);
      if (error) throw error;
      setCommentsData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching comments:", error.message);
    }
  };

  const handleSubmitComment = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("Comment").insert([
        {
          post_id: id,
          name,
          comment: commentText,
        },
      ]);
      if (error) throw error;
      // You could add the new comment directly to the state to avoid re-fetching
      setCommentsData((prevComments) => [
        ...prevComments,
        { name, comment: commentText },
      ]);
      setCommentText("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Error submitting comment. Please try again.");
      console.error("Error during comment submission:", error.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full">
      <div className="max-h-[400px] overflow-y-auto">
        <div className="flex items-center mb-2">
          <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3"></div>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{formattedDate}</div>
          </div>
        </div>
        <div className="mb-2">{content}</div>
        <div className="flex items-center text-gray-500 mb-3">
          <button
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
            onClick={handleShowComments}
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
            Show Comments
          </button>
        </div>
      </div>
      <hr />

      {/* Modal for adding a comment */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="font-semibold text-lg">{content}</h2>
            <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto">
              {commentsData.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <div className="font-semibold">{comment.name}</div>
                  <div className="text-gray-700">{comment.comment}</div>
                </div>
              ))}
            </div>
            <textarea
              className="mt-4 w-full p-2 border border-gray-300 rounded-md"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter your comment"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center disabled:opacity-50"
                onClick={handleSubmitComment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 118 8A8 8 0 014 12z"
                    />
                  </svg>
                ) : (
                  "Submit Comment"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
