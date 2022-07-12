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

export const getAllProjectsRequest = async (user_id) => {
  try {
    let { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user_id)
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

    // When a project is deleted, we have to delete all the related tables
    // because that will throw errors
    const { dataEstimations, errorEstimations } = await supabase
      .from('estimations')
      .delete()
      .eq('project_id', id)

    const { dataResults, errorResults } = await supabase
      .from('results')
      .delete()
      .eq('project_id', id)

    if (error || errorEstimations || errorResults)
      throw new Error('Some error happend when deleting a project')
    return data
  } catch (error) {
    return error.message
  }
}
