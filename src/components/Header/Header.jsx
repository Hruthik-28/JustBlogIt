import {Container, Logo, LogoutButton} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector(state => state.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        },
    ]

    return (
    <header className="sm:py-3 py-2 shadow-lg bg-background sticky top-0 z-10">
    <Container>
        <nav className="flex flex-wrap items-center justify-center">
        <div className="sm:mr-4 w-14">
            <Link>
            <Logo width="100px" />
            </Link>
        </div>
        <div className="ml-auto flex items-center">
            <ul className="flex sm:space-x-4 space-x-3">
            {navItems.map((item) =>
                item.active ? (
                <li key={item.name}>
                    <button
                    onClick={() => navigate(item.slug)}
                    className="text-text sm:px-4 py-2 duration-200 hover:bg-accent hover:text-background rounded-full"
                    >
                    {item.name}
                    </button>
                </li>
                ) : null
            )}
            </ul>
            {authStatus && (
            <li className="list-none rounded-full text-primary hover:bg-accent hover:text-background">
                <LogoutButton />
            </li>
            )}
        </div>
        </nav>
    </Container>
    </header>
    )
}

export default Header
