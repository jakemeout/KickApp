import React from 'react'
import { useSelector } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalBody,
    SIZE,
    ROLE
  } from "baseui/modal";
  
  export default () => {
      const user = useSelector(state => state.userInfo.user)
      console.log(user)
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>{`Thanks, ${user.first_name}!`}</ModalHeader>
        <ModalBody>
          Thank you for sponsoring this idea. You have made a significant contribution in turning this idea to a reality!
        </ModalBody>
      </Modal>
    );
  }

