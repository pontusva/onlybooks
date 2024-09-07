import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

export interface SimpleDialogProps {
  open: boolean
  title: string
  onClose: () => void
  children?: React.ReactNode
}

export const SimpleDialog = ({
  onClose,
  open,
  children,
  title
}: SimpleDialogProps) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <div className="relative z-50">
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle align="center">{title}</DialogTitle>
        {children}
      </Dialog>
    </div>
  )
}
