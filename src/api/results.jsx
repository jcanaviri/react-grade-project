import { supabase } from '../supabase'

export const createResultRequest = async (result) => {
  try {
    const { data, error } = await supabase.from('results').insert([result])

    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getAllResultsRequest = async () => {
  try {
    let { data, error } = await supabase.from('results').select('*')
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getOneResultRequest = async (id) => {
  try {
    let { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const updateResultRequest = async (id, result) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .update(result)
      .eq('id', id)
    if (error) throw error

    return data
  } catch (error) {
    return error.message
  }
}

export const deleteResultRequest = async (id) => {
  try {
    const { data, error } = await supabase.from('results').delete().eq('id', id)
    if (error) throw error

    return data
  } catch (error) {
    return error.message
  }
}

export const getResultsDataRequest = async () => {
  try {
    const { data, error } = await supabase
      .from('results')
      .select(`*, project: projects (*), estimation: estimations (*)`)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getOneResultDataRequest = async (id) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .select(`*, project: projects (*), estimation: estimations (*)`)
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}
