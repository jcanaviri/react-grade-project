import { createContext, useContext } from 'react'

import {
  createTagRequest,
  getAllTagsRequest,
  getTagRequest,
  updateTagRequest,
  deleteTagRequest,
  getByNameRequest,
} from '../api/tags'

const TagContext = createContext()

export const useTags = () => useContext(TagContext)

export const TagProvider = ({ children }) => {
  const createTag = (tag) => createTagRequest(tag)

  const getAllTags = () => getAllTagsRequest()

  const getTag = (id) => getTagRequest(id)

  const updateTag = (id, tag) => updateTagRequest(id, tag)

  const deleteTag = (id) => deleteTagRequest(id)

  const getByName = (name) => getByNameRequest(name)

  return (
    <TagContext.Provider
      value={{ createTag, getAllTags, getTag, updateTag, deleteTag, getByName }}
    >
      {children}
    </TagContext.Provider>
  )
}
