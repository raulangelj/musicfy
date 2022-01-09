/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import {
  Button, Form, Input, Image, FormField,
} from 'semantic-ui-react'
import NoImage from '../../assets/png/no-image.png'
import './AddArtistForm.scss'

const AddArtistForm = ({ setModal }) => {
  const [banner, setBanner] = useState(null)
  const [file, setFile] = useState(null)

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

  const onSubmit = () => {
    console.log('creando artist')
    setModal((prevState) => ({
      ...prevState,
      show: false,
    }))
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
        <Input {...getInputProps()} />
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
        />
      </FormField>
      <Button type="submit">
        Crear Artista
      </Button>
    </Form>
  )
}

export default AddArtistForm
