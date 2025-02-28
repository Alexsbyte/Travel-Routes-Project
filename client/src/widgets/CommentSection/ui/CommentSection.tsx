import styles from './CommentSection.module.css';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import {
  createCommentThunk,
  deleteCommentThunk,
  getOneRouteCommentsThunk,
} from '@/entities/comment/api/CommentThunk';
import { CommentType } from '@/entities/comment/model/CommentTypes';
import { Button, Card, Title, Divider, Modal, Text, Group, Avatar } from '@mantine/core';
import { message as antMessage } from 'antd';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
      text: newComment, // Добавляем HTML-строку в комментарий
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
      <Title className={styles.title} order={3}>
        Комментарии
      </Title>
      <Divider my="sm" />
      <div className={styles.commentForm}>
        <ReactQuill
          value={newComment}
          onChange={setNewComment}
          theme="snow"
          placeholder="Напишите комментарий..."
          className={styles.customQuill} // Используем стили из модуля
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

      {error && <Text>{error}</Text>}
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <div className={styles.commentList}>
          {comments?.map((comment: CommentType) => (
            <Card key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentInfo}>
                  {user?.avatar && (
                    <Avatar
                      src={`${import.meta.env.VITE_API}images/avatars/${user.avatar}`}
                      alt="User Avatar"
                      className={styles.avatar}
                    />
                  )}
                  <Text fw={'bold'} className={styles.commentUsername}>
                    {comment.userComment?.username}
                  </Text>
                  <p className={styles.date}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {user?.id === comment.user_id && (
                  <Button
                    h={40}
                    fz={18}
                    onClick={() => confirmDelete(comment.id)}
                    className={styles.commentDelete}
                    size="xs"
                    variant="subtle"
                  >
                    Удалить
                  </Button>
                )}
              </div>

              {/* Текст комментария */}
              <div
                className={styles.commentText}
                dangerouslySetInnerHTML={{ __html: comment.text }}
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        className={styles.modalText}
      >
        <Text fz={24} mb={20} className={styles.text}>
          Вы уверены, что хотите удалить этот комментарий?
        </Text>
        <Group pt={10} justify="flex-end">
          <Button
            h={40}
            fz={18}
            className={`${styles.modalButtons} ${styles.deleteButton}`}
            onClick={handleDeleteComment}
            color="red"
          >
            Удалить
          </Button>
          <Button
            h={40}
            fz={18}
            className={styles.modalButtons}
            onClick={() => setModalOpen(false)}
            variant="outline"
          >
            Отмена
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
