import React, { useContext, useEffect } from 'react'
import { Observer } from 'mobx-react-lite'
import { Dialog, DialogActions } from '@material-ui/core'
import { modalContext } from '../contexts/modal_context'

interface ModalProps {
  onSubmit: () => void
  title: string
  content?: React.ReactElement
  buttonSubmit: string
  isDisable?: boolean
  color?: string
}

export const CoreModal = (props: ModalProps) => {
  const { onSubmit, title, content, buttonSubmit, isDisable, color } = props
  const context = useContext(modalContext)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [isDisable])

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
              <div className="relative bg-primary">
                <button
                  onClick={onSubmit}
                  disabled={isDisable}
                  className={`text-white ${
                    color ? color : isDisable ? 'bg-primary opacity-50' : 'bg-primary'
                  } focus:outline-none`}>
                  {!isDisable && <p className="px-5 py-2 text-white font-prompt">{buttonSubmit}</p>}
                  {isDisable && (
                    <div className="flex flex-col justify-center px-5 py-2">
                      <div className="loader" />
                    </div>
                  )}
                </button>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </Observer>
  )
}
