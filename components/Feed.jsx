'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PrompCardList = ({ data, handleTagClick }) => {
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
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [posts, setPosts] = useState([])

  const filterPrompts = (text) => {
    const regex = new RegExp(text, "i")

    return posts.filter(
      (item) => 
        regex.test(item.creator.username)
        || regex.test(item.tag)
        || regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
      setSearchText(e.target.value)

      setSearchResults(filterPrompts(e.target.value))
  }

  const handleTagClick= (tagName) => {
    setSearchText(tagName)

    setSearchResults(filterPrompts(tagName))
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', { cache: 'no-store' })
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PrompCardList
        data={searchText ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed