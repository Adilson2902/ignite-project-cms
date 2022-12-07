import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles.containerheader}>
      <div className={styles.background_img}>
        <img src="/assets/Logo.svg" alt="logo" width={238} height={25} />
      </div>
    </div>
  );
}
