import React, { useState, useEffect } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";
import Modal from "./Modal";
import NewPostForm from "./NewPostForm";
import Post from "./Post";
import supabase from "../supabaseClient";

const StudentDiscussion = () => {
  const [posts, setPosts] = useState([]);

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase
        .from('Post')
        .select('*')
      if (error) throw error;
      setPosts(data)
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
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
    <div className="flex h-screen bg-gray-100 font-mono">
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <div className="flex justify-end mt-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create New Post
              </button>
            </div>
        <main className="flex-1 p-6 overflow-auto w-full">
      
          <div className="w-full">
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </main>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPostForm onSubmit={handleNewPost} />
      </Modal>
    </div>
  );
};

export default StudentDiscussion;
