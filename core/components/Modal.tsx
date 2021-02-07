import React, { useContext } from 'react'
import { Observer } from 'mobx-react-lite'
import { Dialog, DialogActions } from '@material-ui/core'
import { modalContext } from '../contexts/modal_context'

interface ModalProps {
  onSubmit: () => void
  title: string
  content?: React.ReactElement
  buttonSubmit: string
}

export const CoreModal = (props: ModalProps) => {
  const { onSubmit, title, content, buttonSubmit } = props
  const context = useContext(modalContext)

  return (
    <Observer>
      {() => (
        <Dialog open={context.isOpen}>
          <div data-cy="core-modal" className="p-4 text-left">
            <p className="mb-3 mr-40 font-prompt-medium text-heading-6">{title}</p>
            <span className="mb-5 font-prompt text-subtitle-1">{content}</span>
            <DialogActions className="mt-4">
              <button onClick={context.closeModal} className="text-secondary2 focus:outline-none">
                <p className="px-5 py-2 font-prompt">ยกเลิก</p>
              </button>
              <button onClick={onSubmit} className="text-white bg-primary focus:outline-none">
                <p className="px-5 py-2 font-prompt">{buttonSubmit}</p>
              </button>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </Observer>
  )
}
