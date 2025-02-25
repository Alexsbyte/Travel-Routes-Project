import {
  createCommentThunk,
  deleteCommentThunk,
  getOneRouteCommentsThunk,
} from '@/entities/comment/api/CommentThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useEffect, useState } from 'react';
import { message as antMessage } from 'antd';
import { CommentType } from '@/entities/comment/model/CommentTypes';

interface CommentSectionProps {
  routeId: number; // Параметр, который будет передаваться в компонент
}

export function CommentSection({ routeId }: CommentSectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { comment, loading, error } = useAppSelector((state) => state.comment);
  const [newComment, setNewComment] = useState<string>('');
  const user = useAppSelector((state) => state.user);


  // Загружаем комментарии при изменении routeId
  useEffect(() => {
    dispatch(getOneRouteCommentsThunk(routeId));
  }, [dispatch, routeId]);

  // Функция для добавления нового комментария
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
      user_id: user.id, // Используем user.id из состояния
    };

    // Отправляем запрос на создание комментария
    dispatch(createCommentThunk(commentData))
      .unwrap()
      .then(() => {
        setNewComment(''); // очищаем поле ввода
        dispatch(getOneRouteCommentsThunk(routeId)); // обновляем комментарии
      })
      .catch(() => {
        antMessage.error('Ошибка при добавлении комментария');
      });
  };

  // Функция для удаления комментария
  const handleDeleteComment = (comment_id: number) => {
    dispatch(deleteCommentThunk(comment_id))
      .unwrap()
      .then(() => {
        antMessage.success('Комментарий удален');
        dispatch(getOneRouteCommentsThunk(routeId)); // обновляем комментарии
      })
      .catch(() => {
        antMessage.error('Ошибка при удалении комментария');
      });
  };

  return (
    <div>
      <h2>Комментарии</h2>

      {/* Форма добавления комментария */}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Добавьте ваш комментарий"
        />
        <button onClick={handleAddComment} disabled={loading}>
          Добавить комментарий
        </button>
      </div>

      {/* Если есть ошибка */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Список комментариев */}
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <div>
          {comment?.map((comment: CommentType) => (
            <div key={comment.id} style={{ marginBottom: '10px' }}>
              <p>{comment.text}</p>
              <p>
                <strong>{comment.username}</strong>
              </p>
              {/* Удалить комментарий */}
              <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
