import { supabase } from '../supabase'

export const createEstimationTypeRequest = async (estimationType) => {
  try {
    let { data, error } = await supabase
      .from('estimation_type')
      .insert([estimationType])
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}
export const getAllEstimationTypeRequest = async () => {
  try {
    let { data, error } = await supabase.from('estimation_type').select('*')
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const getOneEstimationTypeRequest = async (id) => {
  try {
    let { data, error } = await supabase
      .from('estimation_type')
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}
export const updateOneEstimationTypeRequest = async (id, estimationType) => {
  try {
    let { data, error } = await supabase
      .from('estimation_type')
      .update([estimationType])
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}

export const deleteOneEstimationTypeRequest = async (id) => {
  try {
    let { data, error } = await supabase
      .from('estimation_type')
      .delete()
      .eq('id', id)
    if (error) throw error
    return data
  } catch (error) {
    return error.message
  }
}
