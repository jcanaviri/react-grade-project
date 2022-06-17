import { supabase } from '../supabase'

export const createProjectRequest = async (project) => {
  try {
    const { data, error } = await supabase.from('projects').insert([project])

    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getAllProjectsRequest = async () => {
  try {
    let { data: projects, error } = await supabase.from('projects').select('*')
    if (error) throw error
    return projects
  } catch (error) {
    return error.message
  }
}

export const getOneProjectRequest = async (id) => {
  try {
    let { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return project
  } catch (error) {
    return error.message
  }
}

export const updateProjectRequest = async (id, project) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
    if (error) throw error

    return data
  } catch (error) {
    return error.message
  }
}

export const deleteProjectRequest = async (id) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    if (error) throw error

    return data
  } catch (error) {
    return error.message
  }
}
