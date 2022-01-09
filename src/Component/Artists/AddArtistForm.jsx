/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Button, Form, Input, Image, FormField,
} from 'semantic-ui-react'
import './AddArtistForm.scss'

const AddArtistForm = () => {
  const onSubmit = () => {
    console.log('creando artist')
  }

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <FormField className="artist-banner">
        <Input
          type="file"
        />
      </FormField>
      <FormField className="artist-avatar">
        <div>
          Avatar
        </div>
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
