"use client"

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState("");
  const [searchedResults, setSearchedResults] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searechText) => {
    const regex = new RegExp(searechText, "i") // "i" flag for case-insensitive
    return allPosts.filter((item) => 
      regex.test(item.creator.username) || 
      regex.test(item.tag) ||
      regex.test(item.prompt)
    )
  };

  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    //debounce method
    setSearchTimeout(() => {
      const searchResult = filterPrompts(event.target.value);
      setSearchedResults(searchResult);
    }, 500);
  };

  const handleTagCick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={allPosts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
