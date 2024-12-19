import SidebarItem from "../components/shared/SidebarItem"
import { useDictionary } from "../provider/Language"

export default {
    USER_SIDEBAR: [
        {
            type: "title",
            label: "TITLE_1",
        },
        {
            type: "item",
            to: "/app/feed",
            iconClassName: "fa-regular fa-newspaper text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "FEED"
        },
        {
            type: "item",
            to: "/app/profile",
            iconClassName: "fa-solid fa-passport text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "PROFILE"
        },
        {
            type: "item",
            to: "/app/groups",
            iconClassName: "fa-solid fa-users text-primaryColor text-sm max-lg:text-xl max-xl:text-2xl",
            label: "GROUPS"
        },
        {
            type: "separator",
        },
        {
            type: "title",
            label: "TITLE_2"
        },
        {
            type: "item",
            to: "/app/chat",
            iconClassName: "fa-solid fa-comments text-primaryColor text-sm max-lg:text-xl max-xl:text-2xl",
            label: "CHAT"
        },
        {
            type: "item",
            to: "/app/calendar",
            iconClassName: "fa-solid fa-calendar-days text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "CALENDAR"
        },
        {
            type: "item",
            to: "/app/favorites",
            iconClassName: "fa-solid fa-suitcase-rolling text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "FAVORITES"
        },
    ],
    BUSINESS_SIDEBAR: [
        {
            type: "title",
            label: "TITLE_1"
        },
        {
            type: "item",
            to: "/app/feed",
            iconClassName: "fa-regular fa-newspaper text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "FEED"
        },
        {
            type: "item",
            to: "/app/profile",
            iconClassName: "fa-solid fa-passport text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "PROFILE"
        },
        {
            type: "separator",
        },
        {
            type: "title",
            label: "TITLE_2"
        },
        {
            type: "item",
            to: "/app/chat",
            iconClassName: "fa-solid fa-comments text-primaryColor text-sm max-lg:text-xl max-xl:text-2xl",
            label: "CHAT"
        },
        {
            type: "item",
            to: "/app/calendar",
            iconClassName: "fa-solid fa-calendar-days text-primaryColor max-lg:text-xl max-xl:text-2xl",
            label: "CALENDAR"
        },
    ]
}

export const renderSidebarItem = (item, index) => {
    const [dictionary] = useDictionary();

    switch (item.type) {
        case "title":
            return (
                <h2 key={`side-item-${index}`} className="dark:text-white max-xl:hidden">{dictionary.menu[item.label]}</h2>
            )
        case "item":
            return (
                <SidebarItem key={`side-item-${index}`} to={item.to} label={dictionary.globals[item.label]}>
                    <div className='w-5 mr-1 max-xl:m-0 max-xl:flex max-xl:justify-center max-xl:items-center'>
                        <i className={item.iconClassName}></i>
                    </div>
                    <span className="dark:text-slate-500 max-xl:hidden">{dictionary.globals[item.label]}</span>
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