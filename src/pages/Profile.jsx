import { useState, useEffect } from 'react'

import { supabase } from '../supabase'

import { Avatar } from '../components/Avatar'

import { useAuth } from '../context/AuthContext'

export const Profile = () => {
  const [loading, setLoading] = useState(false)

  const {
    user,
    username,
    website,
    avatar_url,
    setUsername,
    setWebsite,
    setAvatarUrl,
  } = useAuth()

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      })

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={updateProfile}>
      <div>Email: {user.email}</div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <Avatar
        url={avatar_url}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url })
        }}
        isForUpdating={true}
      />

      <div>
        <button disabled={loading}>Update profile</button>
      </div>
    </form>
  )
}
