import { useState } from 'react'

import { Alert } from '../components/Alert'
import { NoProjects } from '../components/NoProjects'

export const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [createForm, setCreateForm] = useState(false)

  return (
    <div>
      <div className="mx-8 my-4">
        {showAlert && (
          <Alert
            message="This is the message"
            type="info"
            closeAlert={() => setShowAlert(false)}
          />
        )}
      </div>

      {/* Lista De Proyectos */}
      <p className="text-2xl font-semibold py-4 mx-8">Tus Proyectos</p>
      {createForm ? (
        <>
        <p>Create form </p>
        <button onClick={() => setCreateForm(false)}>back</button>
        </>
      ) : (
        <NoProjects onCreateProject={() => setCreateForm(true)} />
      )}
    </div>
  )
}
