import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";
import Modal from "./Modal";
import NewPostForm from "./NewPostForm";
import Post from "./Post";

const StudentDiscussion = () => {
  const [posts, setPosts] = useState([
    {
      user: "Sally",
      time: "3 days ago",
      content: "Nindot kaayo og limpyo ang audi sa hiraya",
      comments: [
        { user: "Marion", time: "2d", content: "Wow! Mao?!" },
        { user: "Marc", time: "1h", content: "Daw ehh?!" },
        { user: "Danny", time: "1h", content: "Char, sure oy?" },
      ],
    },
  ]);

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
        <main className="flex-1 p-6 overflow-auto w-full">
          <div className="w-full">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create New Post
              </button>
            </div>
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
