import { supabase } from '../supabase'

export const createTagRequest = async (tag) => {
  try {
    let { data, error } = await supabase.from('tags').insert([tag])
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getAllTagsRequest = async () => {
  try {
    let { data: tags, error } = await supabase.from('tags').select('*')
    if (error) throw error
    return tags
  } catch (error) {
    return error.message
  }
}

export const getTagRequest = async (id) => {
  try {
    let { data: tag, error } = await supabase
      .from('tags')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return tag
  } catch (error) {
    return error.message
  }
}

export const updateTagRequest = async (id, tag) => {
  try {
    let { data: tags, error } = await supabase
      .from('tags')
      .update(tag)
      .eq('id', id)
    if (error) throw error
    return tags
  } catch (error) {
    return error.message
  }
}

export const deleteTagRequest = async (id) => {
  try {
    const { data, error } = await supabase.from('tags').delete().eq('id', id)
    if (error) throw error

    return data
  } catch (error) {
    return error.message
  }
}

export const getByNameRequest = async (name) => {
  try {
    const { data: tag, error } = await supabase
      .from('tags')
      .select('*')
      .eq('name', name)

    if (error) throw error

    return tag
  } catch (error) {
    return error.message
  }
}
