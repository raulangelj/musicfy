/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import propType from 'prop-types'
import { toast } from 'react-toastify'
import {
  Form, Input, Button, Image, Dropdown, FormGroup, FormField,
} from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import NoImage from '../../assets/png/no-image.png'
import './AddAlbumForm.scss'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'

const initialValueForm = () => ({
  name: '',
  artist: '',
})

const AddAlbumForm = ({ setModal }) => {
  const [albumImage, setAlbumImage] = useState(null)
  const [file, setFile] = useState(null)
  const [artists, setArtists] = useState([])
  const [formData, setFormData] = useState(initialValueForm())
  const [isloading, setisloading] = useState(false)

  AddAlbumForm.propTypes = {
    setModal: propType.func.isRequired,
  }

  useEffect(() => {
    db.collection('artists')
      .get()
      .then((res) => {
        const arrayArtists = []
        res.docs?.forEach((doc) => {
          const data = doc.data()
          arrayArtists.push({
            key: doc.id,
            value: doc.id,
            text: data.name,
          })
        })
        setArtists(arrayArtists)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    const firstFile = acceptedFiles[0]
    setFile(firstFile)
    setAlbumImage(URL.createObjectURL(firstFile))
  }, [])

  const { getInputProps, getRootProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  })

  const uploadImage = (fileName) => {
    const ref = storage
      .ref()
      .child(`albums/${fileName}`)

    return ref.put(file)
  }

  const resetForm = () => {
    setFormData(initialValueForm())
    setFile(null)
    setAlbumImage(null)
  }

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning('El nombre del album y del artista son obligatorios.')
    } else if (!file) {
      toast.warning('La imagen del album es obligatora.')
    } else {
      const filename = uuidv4()
      setisloading(true)
      uploadImage(filename)
        .then((res) => {
          db.collection('albums')
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: filename,
            })
            .then(() => {
              toast.success('Album creado!')
              resetForm()
              setisloading(false)
              setModal((prevState) => ({
                ...prevState,
                show: false,
              }))
            })
            .catch((err) => {
              toast.error('Erro al crear el album!')
              setisloading(false)
            })
        })
        .catch((err) => {
          toast.error('Error al subir la imagen del album!')
          setisloading(false)
        })
    }
  }

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <FormGroup>
        <FormField className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{
              backgroundImage: `url('${albumImage}')`,
            }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </FormField>
        <FormField className="album-inputs" width={11}>
          <Input
            placeholder="Nombre del album"
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder="El album pertenece a..."
            search
            fluid
            lazyLoad
            selection
            options={artists}
            onChange={(e, data) => setFormData({ ...formData, artist: data.value })}
          />
        </FormField>
      </FormGroup>
      <Button type="submit" loading={isloading}>
        Crear Album
      </Button>
    </Form>
  )
}

export default AddAlbumForm
