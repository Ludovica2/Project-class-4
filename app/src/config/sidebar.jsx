import SidebarItem from "../components/shared/SidebarItem"

export default {
    USER_SIDEBAR: [
        {
            type: "title",
            label: "Principale"
        },
        {
            type: "item",
            to: "/app/feed",
            iconClassName: "fa-regular fa-newspaper text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Bacheca"
        },
        {
            type: "item",
            to: "/app/profile",
            iconClassName: "fa-solid fa-passport text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Profilo"
        },
        {
            type: "item",
            to: "/app/groups",
            iconClassName: "fa-solid fa-users text-primaryColor text-sm max-lg:text-xl max-xl:text-2xl",
            label: "Gruppi"
        },
        {
            type: "separator",
        },
        {
            type: "title",
            label: "Strumenti"
        },
        {
            type: "item",
            to: "/app/chat",
            iconClassName: "fa-solid fa-comments text-primaryColor text-sm max-lg:text-xl max-xl:text-2xl",
            label: "Chat"
        },
        {
            type: "item",
            to: "/app/calendar",
            iconClassName: "fa-solid fa-calendar-days text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Calendario"
        },
        {
            type: "item",
            to: "/app/favorites",
            iconClassName: "fa-solid fa-suitcase-rolling text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Preferiti"
        },
    ],
    BUSINESS_SIDEBAR: [
        {
            type: "title",
            label: "Principale"
        },
        {
            type: "item",
            to: "/app/feed",
            iconClassName: "fa-regular fa-newspaper text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Bacheca"
        },
        {
            type: "item",
            to: "/app/profile",
            iconClassName: "fa-solid fa-passport text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Profilo"
        },
        {
            type: "separator",
        },
        {
            type: "title",
            label: "Strumenti"
        },
        {
            type: "item",
            to: "/app/chat",
            iconClassName: "fa-solid fa-comments text-primaryColor text-sm max-lg:text-xl max-xl:text-2xl",
            label: "Chat"
        },
        {
            type: "item",
            to: "/app/calendar",
            iconClassName: "fa-solid fa-calendar-days text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "Calendario"
        },
    ]
}

export const renderSidebarItem = (item, index) => {
    switch (item.type) {
        case "title":
            return (
                <h2 key={`side-item-${index}`} className="dark:text-white max-xl:hidden">{item.label}</h2>
            )
        case "item":
            return (
                <SidebarItem key={`side-item-${index}`} to={item.to} label={item.label}>
                    <div className='w-5 mr-1 max-xl:m-0 max-xl:flex max-xl:justify-center max-xl:items-center'>
                        <i className={item.iconClassName}></i>
                    </div>
                    <span className="dark:text-slate-500 max-xl:hidden">{item.label}</span>
                </SidebarItem>
            )
        case "separator":
            return (
                <hr key={`side-item-${index}`} className='my-4' />
            )
        default:
            return (
                <></>
            )
    }
}