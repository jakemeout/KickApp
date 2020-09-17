
import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";




export default () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.full}
      role={ROLE.dialog}
    >
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
}