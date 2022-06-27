import { useEffect, useState } from 'react'
import { useEstimationType } from '../context/EstimationTypeContext'

export const EstimationTypes = () => {
  const { getAllEstimationTypes, createEstimationType } = useEstimationType()

  const [form, setForm] = useState({
    name: '',
    description: '',
    icon: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    let submitForm = {
      ...form,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    }

    const res = await createEstimationType(submitForm)
    console.log(res)
  }

  const loadEstimationTypes = async () => {
    const data = await getAllEstimationTypes()
    console.log(data)
  }

  useEffect(() => {
    loadEstimationTypes()
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="descripcion"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="icon"
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />

        <button type="submit">Crear</button>
      </form>
    </div>
  )
}
