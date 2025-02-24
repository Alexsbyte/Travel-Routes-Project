import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, Placemark, Polyline, SearchControl, GeolocationControl } from "@pbe/react-yandex-maps";
import { RootState } from "../../../app/store/store";
import { addPoint, updatePoint, deletePoint } from "../../../entities/point/";
import { Button, Input, Modal, message } from "antd";
import { useState } from "react";
import { IPoint } from "@/entities/point/model";

export function YandexMap() {
  const dispatch = useDispatch();
  const points = useSelector((state: RootState) => state.points.points);

  const [viewPoint, setViewPoint] = useState<IPoint | null>(null);
  const [editPoint, setEditPoint] = useState<IPoint | null>(null);
  const [editComment, setEditComment] = useState("");

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    const description = prompt("Введите описание точки") ?? "";
    dispatch(addPoint({ latitude: coords[0], longitude: coords[1], description }));
  };

  const handlePointLeftClick = (point: IPoint) => {
    setViewPoint(point);
  };

  const handlePointRightClick = (point: IPoint, e: any) => {
    e.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
    setEditPoint(point);
    setEditComment(point.description ?? "");
  };

  const handleSaveEdit = () => {
    if (editPoint) {
      dispatch(updatePoint({ id: editPoint.id, description: editComment }));
      setEditPoint(null);
    }
  };

  const handleDeletePoint = (pointId: string) => {
      dispatch(deletePoint(pointId));
      setEditPoint(null);
    
  };

  const handleCopyCoordinates = (latitude: number, longitude: number) => {
    const coordsText = `${latitude}, ${longitude}`;
    navigator.clipboard.writeText(coordsText);
    message.success("Координаты скопированы!");
  };

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API }}>
      <Map
        defaultState={{ center: [55.751244, 37.618423], zoom: 10 }}
        width="100%"
        height="100%"
        onClick={handleMapClick}
      >
        {points.map((point) => (
          <Placemark
            key={point.id}
            geometry={[point.latitude, point.longitude]}
            options={{ draggable: false }}
            onClick={() => handlePointLeftClick(point)}
            onContextMenu={(e) => handlePointRightClick(point, e)}
          />
        ))}

        {points.length > 1 && (
          <Polyline geometry={points.map((p) => [p.latitude, p.longitude])} options={{ strokeColor: "#0000FF", strokeWidth: 3 }} />
        )}
        <SearchControl options={{ float: "right" }} />
        <GeolocationControl options={{ float: "left" }} />
      </Map>

      {/* Модальное окно для ПРОСМОТРА */}
      <Modal open={viewPoint !== null} onCancel={() => setViewPoint(null)} footer={null}>
        <h3>Информация о точке</h3>
        {viewPoint && (
          <>
            <p><b>Описание:</b> {viewPoint.description}</p>
            <p>
              <b>Координаты:</b>{" "}
              <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handleCopyCoordinates(viewPoint.latitude, viewPoint.longitude)}>
                {viewPoint.latitude}, {viewPoint.longitude}
              </span>
            </p>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => handleCopyCoordinates(viewPoint.latitude, viewPoint.longitude)}>Копировать</Button>
            <Button onClick={() => setViewPoint(null)}>Закрыть</Button>
            </div>
          </>
        )}
      </Modal>

     {/* Модальное окно для РЕДАКТИРОВАНИЯ  */}
      <Modal open={editPoint !== null} onCancel={() => setEditPoint(null)} footer={null}>
        <h3>Редактирование точки</h3>
        {editPoint && (
          <>
            <p><b>Координаты:</b> {editPoint.latitude}, {editPoint.longitude}</p>
            <Input value={editComment} onChange={(e) => setEditComment(e.target.value)} />
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleSaveEdit} type="primary">Сохранить</Button>
              <Button onClick={() => handleDeletePoint(editPoint.id)} danger>Удалить</Button>
              <Button onClick={() => setEditPoint(null)}>Закрыть</Button>
            </div>
          </>
        )}
      </Modal>
    </YMaps>
  );
}
