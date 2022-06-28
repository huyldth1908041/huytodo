import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { privateRoutes } from "../routes";

const RegisterPage = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuthentication()
  const history = useHistory()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!newUsername || !newPassword) return
    try {
      setLoading(true)
      await register(newUsername, newPassword)
      history.push(privateRoutes.home.path) // history.push('/')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // await login(username, password)


  return (
    <form onSubmit={handleRegister}>
      <h2>Register an account</h2>
      <p>user name:</p>
      <input type='text' value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder='newUsername'></input>
      <p>password:</p>
      <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='newPassword'></input>
      <br />
      <button type='submit' >
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  )
}

export default RegisterPage;