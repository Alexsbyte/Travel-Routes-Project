import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, Placemark, Polyline, SearchControl, GeolocationControl } from "@pbe/react-yandex-maps";
import { RootState } from "../../../app/store/store";
import { addPoint, updatePoint, deletePoint } from "../../../entities/point/";
import { Button, TextInput, Textarea, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { IPoint } from "@/entities/point/model";
// import { notifications } from "@mantine/notifications";
import style from './YandexMap.module.css'
// import { useLocation, useParams } from "react-router-dom";
export function YandexMap({isEditable}:{isEditable:boolean}) {
  const dispatch = useDispatch();
  const points = useSelector((state: RootState) => state.points.points);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newDescription, setNewDescription] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [viewPoint, setViewPoint] = useState<IPoint | null>(null);
  const [editPoint, setEditPoint] = useState<IPoint | null>(null);
  const [editComment, setEditComment] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  
  // const {id}= useParams()
  // const location = useLocation()

  useEffect(() => {
    if (isAddModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isAddModalOpen]);

  const handleMapClick = (e: any) => {
    if(!isEditable) return
    setSelectedCoords(e.get("coords"));
    setNewDescription("");
    setIsAddModalOpen(true);
  };

  const handleAddPoint = () => {
    if(!isEditable) return
    if (selectedCoords) {
      dispatch(addPoint({ latitude: selectedCoords[0], longitude: selectedCoords[1], description: newDescription }));
      setIsAddModalOpen(false);
    }
  };

  const handlePointLeftClick = (point: IPoint) => {
    setViewPoint(point);
    setIsViewModalOpen(true);
  };

  const handlePointRightClick = (point: IPoint, e: React.MouseEvent<HTMLDivElement>) => {
    if(!isEditable) return
    e.preventDefault();
    setEditPoint(point);
    setEditComment(point.description ?? "");
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editPoint) {
      dispatch(updatePoint({ id: editPoint.id, description: editComment }));
      setIsEditModalOpen(false);
    }
  };

  const handleDeletePoint = () => {
    if (editPoint) {
      dispatch(deletePoint(editPoint.id));
      setIsEditModalOpen(false);
    }
  };

  const handleCopyCoordinates = (latitude: number, longitude: number) => {
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
    // notifications.show({ title: "Скопировано", message: "Координаты скопированы!" });
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
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => handlePointRightClick(point, e)}
          />
        ))}

        {points.length > 1 && (
          <Polyline geometry={points.map((p) => [p.latitude, p.longitude])} options={{ strokeColor: "#0000FF", strokeWidth: 3 }} />
        )}
        <SearchControl options={{ float: "right" }} />
        <GeolocationControl options={{ float: "left" }} />
      </Map>

      {/* Модальное окно для добавления точки */}
      <Modal   opened={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Добавить точку">
        <TextInput
          ref={inputRef} 
          label="Описание точки"
          placeholder="Введите описание"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button variant="white"
            className={`${style.buttonBlue} ${style.customButton}`} 
            fullWidth mt="md" onClick={handleAddPoint}>
          Добавить
        </Button>
      </Modal>

      {/* Модальное окно для просмотра точки */}
      <Modal opened={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Информация о точке">
        {viewPoint && (
          <>
            <p><b>Описание:</b> {viewPoint.description}</p>
            <p>
              <b>Координаты:</b>{" "}
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => handleCopyCoordinates(viewPoint.latitude, viewPoint.longitude)}
              >
                {viewPoint.latitude}, {viewPoint.longitude}
              </span>
            </p>
            <Button  variant="white"
            className={`${style.buttonBlue} ${style.customButton}`} fullWidth mt="md" onClick={() => handleCopyCoordinates(viewPoint.latitude, viewPoint.longitude)}>
              Копировать координаты
            </Button>
          </>
        )}
      </Modal>

      {/* Модальное окно для редактирования точки */}
      <Modal opened={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Редактирование точки">
        {editPoint && (
          <>
            <p><b>Координаты:</b> {editPoint.latitude}, {editPoint.longitude}</p>
            <Textarea
              label="Описание"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <Button variant="white"
            className={`${style.buttonBlue} ${style.customButton}`} color="blue" onClick={handleSaveEdit}>Сохранить</Button>
              <Button variant="white"
            className={`${style.buttonRed} ${style.customButton}`} color="red" onClick={handleDeletePoint}>Удалить</Button>
            </div>
          </>
        )}
      </Modal>
    </YMaps>
  );
}
