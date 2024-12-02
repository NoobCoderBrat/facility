import React, { useState, useEffect } from "react";
import StudentNavbar from "./StudentNavbar";
import Modal from "./Modal";
import NewPostForm from "./NewPostForm";
import Post from "./Post";
import supabase from "../supabaseClient";

const StudentDiscussion = () => {
  const [posts, setPosts] = useState([]);

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase.from("Post").select("*");
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPost = (content) => {
    const newPost = {
      user: "Current User",
      time: "Just Now",
      content: content,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <StudentNavbar />
      <main className="p-5 mx-auto container">
        <div className="flex justify-end mt-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create New Post
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPostForm onSubmit={handleNewPost} />
      </Modal>
    </div>
  );
};

export default StudentDiscussion;
