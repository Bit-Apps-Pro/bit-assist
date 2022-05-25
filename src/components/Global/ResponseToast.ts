interface Props {
  toast
  response: any
  action: 'create' | 'update' | 'delete'
  messageFor: string
}

const ResponseToast = ({ toast, response, action, messageFor }: Props) => {
  if (response === undefined) {
    return
  }

  if (response?.success) {
    toast({
      status: 'success',
      position: 'top-right',
      title: `${messageFor} ${action}d`,
    })
  } else {
    toast({
      status: 'error',
      position: 'top-right',
      title: `${messageFor} could not be ${action}d`,
    })
  }
}

export default ResponseToast
