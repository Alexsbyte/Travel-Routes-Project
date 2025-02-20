
import styles from './UserCard.module.css';

type Props = {
  user: UserType;
};

export function UserCard({ user }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img
          src={'/userAvatar.jpeg'}
          alt={`${user.username}'s avatar`}
          className={styles.avatar}
        />
      </div>
    </div>
  );
}
