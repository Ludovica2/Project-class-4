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
            iconClassName: "fa-regular fa-newspaper text-primayColor",
            label: "Bacheca"
        },
        {
            type: "item",
            to: "/app/profile",
            iconClassName: "fa-solid fa-passport text-primayColor",
            label: "Profilo"
        },
        {
            type: "item",
            to: "/app/groups",
            iconClassName: "fa-solid fa-users text-primayColor text-sm",
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
            iconClassName: "fa-solid fa-comments text-primayColor text-sm",
            label: "Chat"
        },
        {
            type: "item",
            to: "/app/calendar",
            iconClassName: "fa-solid fa-calendar-days text-primayColor",
            label: "Calendario"
        },
        {
            type: "item",
            to: "/app/favorites",
            iconClassName: "fa-solid fa-suitcase-rolling text-primayColor",
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
            iconClassName: "fa-regular fa-newspaper text-primayColor",
            label: "Bacheca"
        },
        {
            type: "item",
            to: "/app/profile",
            iconClassName: "fa-solid fa-passport text-primayColor",
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
            iconClassName: "fa-solid fa-comments text-primayColor text-sm",
            label: "Chat"
        },
        {
            type: "item",
            to: "/app/calendar",
            iconClassName: "fa-solid fa-calendar-days text-primayColor",
            label: "Calendario"
        },
    ]
}

export const renderSidebarItem = (item, index) => {
    switch (item.type) {
        case "title":
            return (
                <h2 key={`side-item-${index}`}>{item.label}</h2>
            )
        case "item":
            return (
                <SidebarItem key={`side-item-${index}`} to={item.to}>
                    <div className='w-5 mr-1'>
                        <i className={item.iconClassName}></i>
                    </div>
                    <span>{item.label}</span>
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