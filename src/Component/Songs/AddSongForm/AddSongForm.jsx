/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import {
  Button,
  Dropdown, Form, FormField, Icon, Input,
} from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { db, storage } from '../../../firebase/firebaseConfig'
import './AddSongForm.scss'
import alertErrors from '../../../utils/AlertErros'

const initialValueForm = () => ({
  name: '',
  album: '',
})

const AddSongForm = ({ setModal }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [albums, setAlbums] = useState([])
  const [formData, setFormData] = useState(initialValueForm)
  const [file, setFile] = useState(null)

  AddSongForm.propTypes = {
    setModal: propTypes.func.isRequired,
  }

  const resetForm = () => {
    setFormData(initialValueForm)
    setAlbums([])
    setFile(null)
  }

  const uploadSong = (fileName) => {
    const ref = storage.ref()
      .child(`songs/${fileName}`)

    return ref.put(file)
  }

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      toast.warning('El nombre de la cancion y el album al que petenerce son obligatorios!')
    } else if (!file) {
      toast.warning('Hay que ingresar una archivo mp3 para agregar la cancion.')
    } else {
      setIsLoading(true)
      const fileName = uuidv4()
      uploadSong(fileName)
        .then((res) => {
          db.collection('songs')
            .add({
              name: formData.name,
              album: formData.album,
              fileName,
            })
            .then(async () => {
              toast.success('Cancion guarda correctamente!')
              await resetForm()
              await setIsLoading(false)
              setModal((prevState) => ({
                ...prevState,
                show: false,
              }))
            })
            .catch((err) => {
              toast.error('Error al gaurdar los datos, intentlo mas tarde.')
            })
        })
        .catch((err) => {
          toast.error('Error al subir la cancion, intentalo de nuevo mas tarde.')
        })
    }
  }

  const onDrop = useCallback((acceptedFile) => {
    const filedrop = acceptedFile[0]
    setFile(filedrop)
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.mp3',
    noKeyboard: true,
    onDrop,
  })

  useEffect(() => {
    db.collection('albums')
      .get()
      .then((res) => {
        const arrayalbums = []
        res.docs.forEach((doc) => {
          const data = doc.data()
          arrayalbums.push({
            key: doc.id,
            value: doc.id,
            text: data.name,
          })
        })
        setAlbums(arrayalbums)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  })

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <FormField>
        <Input
          placeholder="Nombre de la cancion"
          onChange={(e) => setFormData({
            ...formData,
            name: e.target.value,
          })}
        />
      </FormField>
      <FormField>
        <Dropdown
          placeholder="Asigna la cancion a un album"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) => setFormData({
            ...formData,
            album: data.value,
          })}
        />
      </FormField>
      <FormField>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && 'load'} />
          <div>
            <p>
              Arrastra tu cancion o haz click
              {' '}
              <span>aqui</span>
              .
            </p>
            {
              file && (
                <p>
                  Cancion subida:
                  {' '}
                  <span>{file.name}</span>
                </p>
              )
            }
          </div>
        </div>
      </FormField>
      <Button type="submit" loading={isLoading}>Subir Cancion</Button>
    </Form>
  )
}

export default AddSongForm
