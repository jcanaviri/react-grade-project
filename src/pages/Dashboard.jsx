import { useState, useEffect } from 'react'

import { supabase } from '../supabase'

// Custom authentication hook
import { useAuth } from '../context/AuthContext'

// Components
import { SideBar } from '../components/SideBar'
import { Pannel } from '../components/Pannel'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const { user, signOut } = useAuth()

  useEffect(() => {
    getProfile()
  }, [user])

  const getProfile = async () => {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setEmail(user.email)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <SideBar url={avatar_url} email={email} signOut={signOut} />

      <Pannel
        email={email}
        avatar_url={avatar_url}
        signOut={signOut}
      />

      <div className="relative md:ml-64 top-20">
        <Outlet />
      </div>
    </>
  )
}
