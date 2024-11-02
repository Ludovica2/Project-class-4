import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/app/">Feed</Link>
    </nav>
  )
}

export default Navbar