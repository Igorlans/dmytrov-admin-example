import { useState } from "react";
import SubCategoryItem from "./SubCategoryItem/SubCategoryItem";
import classes from "./categoryItem.module.scss";
import Link from "next/link";

const CategoryItem = ({ title, children, href, subcategories }) => {
    const [open, setOpen] = useState(false);

    const handleCategoryClick = () => {
        if (href) {
            window.location.href = href; // перенаправлення на сторінку
        } else {
            setOpen(!open); // відкриття/закриття підкатегорій
        }
    };

    return (
        <div className={classes.categoryItem}>
            <div className={classes.categoryName} onClick={handleCategoryClick}>
                <div className={classes.categoryText}>  
                    { children }
                    <span>{title}</span>
                </div>
                <div className="categoryIcon">
                    { children }
                </div>
            </div>
            {open && (
                <div className={classes.subcategories}>
                    {subcategories.map((subcategory) => (
                        <Link
                            key={subcategory.title}
                            href={subcategory.href}
                            style={{ textDecoration: "none" }}
                        >
                            <SubCategoryItem title={subcategory.title} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryItem;
