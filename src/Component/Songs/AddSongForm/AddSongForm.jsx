/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import {
  Button,
  Dropdown, Form, FormField, Input,
} from 'semantic-ui-react'
import { db } from '../../../firebase/firebaseConfig'
import './AddSongForm.scss'
import alertErrors from '../../../utils/AlertErros'

const AddSongForm = ({ setModal }) => {
  const [albums, setAlbums] = useState([])

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
        />
      </FormField>
      <FormField>
        <Dropdown
          placeholder="Asigna la cancion a un album"
          search
          selection
          lazyLoad
          options={albums}
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
