import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

import VisuallyHidden from '@reach/visually-hidden'

import defaultUser from '../assets/default.png'

export const Avatar = ({
  url,
  onUpload,
  isForUpdating,
  width = 32,
  height = 32,
}) => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={avatarUrl ? avatarUrl : defaultUser}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        style={{ height, width }}
      />
      {uploading ? (
        <p>Actualizando...</p>
      ) : (
        <>
          {isForUpdating && (
            <>
              <label
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center my-4"
                htmlFor="single"
              >
                Actualizar avatar
              </label>
              <VisuallyHidden>
                <input
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
              </VisuallyHidden>
            </>
          )}
        </>
      )}
    </div>
  )
}
