/* eslint-disable no-unused-vars */
import React from 'react'
import { Modal, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './BasicModal.scss'

const BasicModal = ({
  show, setShow, title, children, size,
}) => {
  BasicModal.propTypes = {
    show: PropTypes.bool,
    size: PropTypes.string,
    title: PropTypes.string,
    setShow: PropTypes.func,
    children: PropTypes.node,
  }

  BasicModal.defaultProps = {
    title: '',
    show: false,
    size: 'tiny',
    setShow: () => null,
    children: <div>{null}</div>,
  }

  const onClose = () => {
    setShow(false)
  }
  return (
    <Modal open={show} onClose={onClose} className="basic-modal" size={size}>
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  )
}

export default BasicModal
