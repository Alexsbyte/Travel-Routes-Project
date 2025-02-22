import { YMaps, Map, Placemark, Polyline } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { addPoint, updatePoint, deletePoint, setTransportType } from "../../../entities/route/slice/index";

export function YandexMap() {
  const dispatch = useDispatch();
  const { points, transportType } = useSelector((state: RootState) => state.routes);

  // Добавление точки при клике
  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    const comment = prompt("Введите комментарий для точки") || "Без комментария";
    dispatch(addPoint({ coords, comment }));
  };

  // Обработка клика по точке (показ комментария и координат)
  const handlePointClick = (pointId: string, e: React.MouseEvent) => {
    if (e.ctrlKey) {
      const newComment = prompt("Редактировать комментарий:", points.find(p => p.id === pointId)?.comment);
      if (newComment !== null) {
        dispatch(updatePoint({ id: pointId, comment: newComment }));
      }
    } else {
      alert(`Комментарий: ${points.find(p => p.id === pointId)?.comment}\nКоординаты: ${points.find(p => p.id === pointId)?.coords}`);
    }
  };

  // Удаление точки при нажатии на Ctrl + Delete
  const handleDeletePoint = (pointId: string) => {
    if (window.confirm("Удалить эту точку?")) {
      dispatch(deletePoint(pointId));
    }
  };

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API }}>
      <div>
        <label>Выбор транспорта: </label>
        <select onChange={(e) => dispatch(setTransportType(e.target.value as any))}>
          <option value="auto">Авто</option>
          <option value="masstransit">Общественный транспорт</option>
          <option value="pedestrian">Пешком</option>
          <option value="bicycle">Велосипед</option>
        </select>
      </div>

      <Map
        defaultState={{ center: [55.751244, 37.618423], zoom: 10 }}
        width="100%" height="500px"
        onClick={handleMapClick}
      >
        {points.map((point) => (
          <Placemark
            key={point.id}
            geometry={point.coords}
            properties={{ balloonContent: point.comment }}
            options={{ draggable: false }}
            onClick={(e) => handlePointClick(point.id, e)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeletePoint(point.id);
            }}
          />
        ))}

        {points.length > 1 && (
          <Polyline
            geometry={points.map((p) => p.coords)}
            options={{ strokeColor: "#0000FF", strokeWidth: 3 }}
          />
        )}
      </Map>
    </YMaps>
  );
}