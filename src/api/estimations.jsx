import { supabase } from '../supabase'
import { getOneProjectRequest } from './projects'
import { getOneEstimationTypeRequest } from './estimationType'

export const createEstimationRequest = async (estimation) => {
  try {
    let { data, error } = await supabase
      .from('estimations')
      .insert([estimation])
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}
export const getAllEstimationsRequest = async () => {
  try {
    let { data: estimations, error } = await supabase
      .from('estimations')
      .select('*')
    if (error) throw error

    // This way load the estimations with his current project and his current type
    const updatedEstimations = []
    for (let estimation of estimations) {
      const project = await getOneProjectRequest(estimation.project_id)
      const estimationType = await getOneEstimationTypeRequest(
        estimation.type_id
      )
      updatedEstimations.push({
        ...estimation,
        project: project[0],
        estimationType: estimationType[0],
      })
    }

    return updatedEstimations
  } catch (error) {
    return error.message
  }
}

export const getOneEstimationRequest = async (id) => {
  try {
    let { data, error } = await supabase
      .from('estimations')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}
export const updateOneEstimationRequest = async (id, estimation) => {
  try {
    let { data, error } = await supabase
      .from('estimations')
      .update([estimation])
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const deleteOneEstimationRequest = async (id) => {
  try {
    let { data, error } = await supabase
      .from('estimations')
      .delete()
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getEstimationByProjectAndTypeRequest = async (projectId, typeId) => {
  try {
    let { data, error } = await supabase
      .from('estimations')
      .select('*')
      .match({project_id: projectId, type_id: typeId})

    if (error) throw error

    return data
  } catch (error) {
    return error.message
  }
}
