import { Link, useLocation } from "react-router-dom"

const SidebarItem = ({children, to}) => {
    const location = useLocation();
    
    const formatClassName = () => {
       return location.pathname == to ? "p-1 bg-[#e1e4f5] rounded min-w-[120px]" : "p-1"
    }

    return (
        <>
            <div className={formatClassName()}>
                <Link to={to} className='flex hover:opacity-70'>
                    {children}
                </Link>
            </div>
        </>
    )
}

export default SidebarItem