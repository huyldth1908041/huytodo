import useAuthentication from "../hooks/useAuthentication";

const Header = () => {
  const {isLoggedIn, user} = useAuthentication()
  console.log(user);
  return (
    <div>
      {isLoggedIn && user.username}
    </div>
  )
}

export default Header