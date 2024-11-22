import React, { useState } from "react";

const NewPostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-1/3"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
