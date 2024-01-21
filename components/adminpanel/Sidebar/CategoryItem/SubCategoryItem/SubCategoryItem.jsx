import classes from './SubCategory.module.scss'

const SubCategoryItem = ({title}) => {
    return (
        <div className={classes.box}>
            <span className={classes.title}>
                {title}
            </span>
        </div>
    )
}
export default SubCategoryItem