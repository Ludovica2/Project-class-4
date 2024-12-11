import { Link, useLocation } from "react-router-dom"

const SidebarItem = ({children, to, label}) => {
    const location = useLocation();
    
    const formatClassName = () => {
       return location.pathname == to ? "p-1 bg-[#e1e4f5] rounded min-w-[120px] dark:bg-gray-700" : "p-1"
    }

    return (
        <>
            <div className={formatClassName()}>
            {label == "Chat" ? <a href="/app/chat" target="_blank" className="flex hover:opacity-70">{children}</a> :  <Link to={to} className='flex hover:opacity-70'>
                    {children}
                </Link>}
            </div>
        </>
    )
}

export default SidebarItem