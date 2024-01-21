"use client"

import styles from './titlePage.module.scss'

const TitlePage = ({title}) => {
    return (
        <div className={styles.titleWr}>
            <div className={styles.title}>
                {title}
            </div>
        </div>
    )
}

export default TitlePage