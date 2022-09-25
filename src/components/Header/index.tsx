import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles.containerheader}>
      <img src="/assets/Logo.svg" alt="logo" />
    </div>
  );
}
