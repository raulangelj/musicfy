/* eslint-disable no-unused-vars */
import React from 'react'
import propTypes from 'prop-types'
import {
  Button,
  Dropdown, Form, FormField, Input,
} from 'semantic-ui-react'

const AddSongForm = ({ setModal }) => {
  AddSongForm.propTypes = {
    setModal: propTypes.func.isRequired,
  }

  const onSubmit = () => {
    console.log('enviandoooo')
  }

  const a = [
    { key: '1', value: '1', text: 'opcion 1' },
    { key: '2', value: '2', text: 'opcion 2' },
    { key: '3', value: '3', text: 'opcion 3' },
  ]

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <FormField>
        <Input
          placeholder="Nombre de la cancion"
        />
      </FormField>
      <FormField>
        <Dropdown
          placeholder="Asigna la cancion a un album"
          search
          selection
          lazyLoad
          options={a}
        />
      </FormField>
      <FormField>
        <h2>upload song</h2>
      </FormField>
      <Button type="submit">Subir Cancion</Button>
    </Form>
  )
}

export default AddSongForm
