import { useState } from "react"
import CategoryItem from "./CategoryItem/categoryItem"
import { 
    LuList,
    LuEdit,
    LuUser,
    LuSearch
} from "react-icons/lu"
import { BiFileBlank } from "react-icons/bi"
import { MdOutlineArticle } from "react-icons/md"
import { AiOutlineSecurityScan } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"

const categories = [
    {
        title: "Заявки",
        Icon: <LuList />,
        subcategories: [
            { title: "Заяки на проєкт", href: "/proposals/proposalsProject" },
            {
                title: "Заяки на дод.послуги",
                href: "/proposals/proposalsAddition",
            },
        ],
    },
    {
        title: "Редагування сайту",
        Icon: <LuEdit />,
        subcategories: [
            { title: "Тарифи", href: "/tariffs" },
            { title: "Додаткові послуги", href: "/services" },
            { title: "Питання", href: "/questions" },
            { title: "Блог", href: "/blog" },
            { title: "Політика конфеденційності", href: "/privacyPolicy" },
        ],
    },
    {
        title: "Анкета",
        Icon: <BiFileBlank />,
        subcategories: [
            { title: "Текстові питання", href: "/questionary/questions" },
            { title: "Cписок приміщень", href: "/questionary/rooms" },
            {
                title: "Таблиці з приміщеннями",
                href: "/questionary/roomTables",
            },
            {
                title: "Таблиці без приміщень",
                href: "/questionary/tables",
            },
        ],
    },
    {
        title: "Користувачі",
        Icon: <LuUser />,
        href: "/users",
        subcategories: null,
    },
    {
        title: "Пароль",
        Icon: <RiLockPasswordLine />,
        href: "/password",
        subcategories: null,
    },
    {
        title: "Seo",
        Icon: <LuSearch />,
        href: "/seo",
        subcategories: null,
    },
]

const Sidebar = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="animatedSidebar sidebarWr min-h-full">
            {/* <div className="relative h-full"> */}
            <div className="name">
                <div className="nameTitle">Dmytrov</div>
            </div>
            <div className="sidebarContentWrapper">
                {categories.map((category) => (
                    <CategoryItem
                        key={category.title}
                        title={category.title}
                        href={category.href}
                        subcategories={category.subcategories}
                    >
                        { category.Icon }
                    </CategoryItem>
                ))}
            </div>

            {/* </div> */}
        </div>
    )
}

export default Sidebar
