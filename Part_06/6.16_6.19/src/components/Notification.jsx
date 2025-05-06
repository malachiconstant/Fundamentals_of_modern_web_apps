import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {

  const notification = useSelector((state) => state.notification)

  const notifyMessage = () => notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notifyMessage()}
    </div>
  )
}

export default Notification