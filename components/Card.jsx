/* eslint-disable jsx-a11y/anchor-is-valid */
import cls from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import styles from './Card.module.css'

const Card = props => {
  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              alt={props.name}
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
