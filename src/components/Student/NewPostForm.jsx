import React, { useState } from "react";
import supabase from "../supabaseClient";

const NewPostForm = ({ onSubmit }) => {
  const name = sessionStorage.getItem("name");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const { data, error } = await supabase
    .from('Post')
    .insert([
      {
        name,
        content,
      },
    ])
window.location.reload();
  };

  return (
    <div>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <div className="flex justify-end">
        <button
        onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-1/3"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
