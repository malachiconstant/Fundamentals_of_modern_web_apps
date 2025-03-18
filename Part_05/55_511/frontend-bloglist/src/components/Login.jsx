const LoginForm = ({
  onSubmit,
  username,
  userOnChange,
  password,
  passOnChange
}) => {
  return (
<form onSubmit={onSubmit}>
  <div>
    username
    <input
      type="text"
      value={username}
      name="Username"
      onChange={userOnChange}
    />
  </div>
  <div>
    password
    <input
      type="password"
      value={password}
      name="Password"
      onChange={passOnChange}
    />
  </div>
  <button type="submit">login</button>
  
</form>      
)}

export default LoginForm