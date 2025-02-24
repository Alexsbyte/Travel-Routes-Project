import styles from './CommentSection.module.css';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import {
  createCommentThunk,
  deleteCommentThunk,
  getOneRouteCommentsThunk,
} from '@/entities/comment/api/CommentThunk';
import { CommentType } from '@/entities/comment/model/CommentTypes';
import {
  Textarea,
  Button,
  Card,
  Title,
  Divider,
  Modal,
  Text,
  Group,
  Avatar,
} from '@mantine/core';
import { message as antMessage } from 'antd';
import { useParams } from 'react-router-dom';

export function CommentSection(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { comments, loading, error } = useAppSelector((state) => state.comments);
  const user = useAppSelector((state) => state.user.user);
  const [newComment, setNewComment] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
  const routeId = Number(id); // Преобразуем id в число, если нужно

  useEffect(() => {
    dispatch(getOneRouteCommentsThunk(routeId));
  }, [dispatch, routeId]);

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      antMessage.error('Комментарий не может быть пустым');
      return;
    }
    if (!user) {
      antMessage.error('Пользователь не найден');
      return;
    }
    const commentData = {
      text: newComment,
      route_id: routeId,
      user_id: user.id,
    };

    dispatch(createCommentThunk(commentData))
      .unwrap()
      .then(() => {
        setNewComment('');
        dispatch(getOneRouteCommentsThunk(routeId));
      })
      .catch(() => {
        antMessage.error('Ошибка при добавлении комментария');
      });
  };

  const confirmDelete = (comment_id: number) => {
    setCommentToDelete(comment_id);
    setModalOpen(true);
  };

  const handleDeleteComment = () => {
    if (!commentToDelete) return;

    dispatch(deleteCommentThunk(commentToDelete))
      .unwrap()
      .then(() => {
        dispatch(getOneRouteCommentsThunk(routeId));
      })
      .catch(() => {
        antMessage.error('Ошибка при удалении комментария');
      })
      .finally(() => {
        setModalOpen(false);
        setCommentToDelete(null);
      });
  };

  return (
    <div className={styles.commentSection}>
      <Title order={3}>Отзывы</Title>
      <Divider my="sm" />
      <div className={styles.commentForm}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.commentInput}
          minRows={3}
          placeholder="Напишите ваш отзыв..."
        />
        <div className={styles.commentButtonWrapper}>
          <Button
            onClick={handleAddComment}
            disabled={loading}
            className={styles.commentButton}
          >
            Добавить
          </Button>
        </div>
      </div>
      Aselya, [25.02.2025 19:53]
      {error && <Text>{error}</Text>}
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <div className={styles.commentList}>
          {comments?.map((comment: CommentType) => (
            <Card key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                {user?.avatar && (
                  <Avatar
                    src={`${import.meta.env.VITE_API}images/avatars/${user.avatar}`}
                    alt="User Avatar"
                    className={styles.avatar}
                  />
                )}
                <Text className={styles.commentUsername}>
                  {comment.userComment?.username}
                </Text>
                <p className={styles.date}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                {user?.id === comment.user_id && (
                  <Button
                    onClick={() => confirmDelete(comment.id)}
                    className={styles.commentDelete}
                    size="xs"
                    variant="subtle"
                  >
                    Удалить
                  </Button>
                )}
              </div>
              <Text>{comment.text}</Text>
            </Card>
          ))}
        </div>
      )}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Удаление комментария"
      >
        <Text>Вы уверены, что хотите удалить этот комментарий?</Text>
        <Group justify="flex-end" className={styles.modalButtons}>
          <Button onClick={handleDeleteComment}>Удалить</Button>
          <Button onClick={() => setModalOpen(false)} variant="outline">
            Отмена
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
