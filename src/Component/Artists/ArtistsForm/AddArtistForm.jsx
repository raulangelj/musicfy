/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import {
  Button, Form, Input, Image, FormField,
} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import NoImage from '../../../assets/png/no-image.png'
import './AddArtistForm.scss'
import { db, storage } from '../../../firebase/firebaseConfig'

const initialValueForm = () => ({
  name: '',
})

const AddArtistForm = ({ setModal }) => {
  const [banner, setBanner] = useState(null)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState(initialValueForm)
  const [isloading, setIsloading] = useState(false)

  AddArtistForm.propTypes = {
    setModal: propTypes.func.isRequired,
  }

  const onDrop = useCallback((acceptedFile) => {
    const firstFile = acceptedFile[0]
    setFile(firstFile)
    setBanner(URL.createObjectURL(firstFile))
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  })

  const uploadImage = (fileName) => {
    const ref = storage
      .ref()
      .child(`artists/${fileName}`)

    return ref.put(file)
  }

  const resetForm = () => {
    setFormData(initialValueForm())
    setFile(null)
    setBanner(null)
  }

  const onSubmit = () => {
    // setIsloading(false)
    // setModal((prevState) => ({
    //   ...prevState,
    //   show: false,
    // }))
    if (!formData.name) {
      toast.warning('Agrega el nombre del artista!')
    } else if (!file) {
      toast.warning('Agrega la imagen del artista!')
    } else {
      setIsloading(true)
      const fileName = uuidv4()
      uploadImage(fileName)
        .then((res) => {
          db.collection('artists')
            .add({
              name: formData.name,
              banner: fileName,
            })
            .then(() => {
              toast.success('Artista creado correctamente!')
              resetForm()
              setIsloading(false)
              setModal((prevState) => ({
                ...prevState,
                show: false,
              }))
            })
            .catch(() => {
              toast.error('Error al crear el artista, intento mas tarde.')
              setIsloading(false)
            })
        })
        .catch((err) => {
          toast.error('Error al subir la imagen, intentalo mas tarde.')
          setIsloading(false)
        })
    }
  }

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <FormField className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{
            backgroundImage: `url('${banner}')`,
          }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </FormField>
      <FormField className="artist-avatar">
        <div
          className="avatar"
          style={{
            backgroundImage: `url('${banner || NoImage}')`,
          }}
        />
      </FormField>
      <FormField>
        <Input
          placeholder="Nombre del artista"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </FormField>
      <Button type="submit" loading={isloading}>
        Crear Artista
      </Button>
    </Form>
  )
}

export default AddArtistForm
