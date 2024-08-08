import { storage as storageState } from '../states'; // Импорт начального состояния для хранения
import { DISPATCHES } from '../../constants'; // Импорт констант для типов действий (actions)

// Редуктор для управления состоянием хранения
const storage = (state = storageState, { type, payload }) => {
	// Обработка различных типов действий
	switch (type) {
		// Обработка действия для обновления состояния хранения
		case DISPATCHES.STORAGE:
			// Создаем конфигурацию для обновления состояния
			const config = {
				favourites: 'current', // Значение по умолчанию для избранных
				recents: 'current', // Значение по умолчанию для недавних
				playlists: 'current', // Значение по умолчанию для плейлистов
				...payload, // Объединяем с данными из payload
			};

			return {
				...state, // Сохраняем текущее состояние
				favourites: config?.favourites === 'current' ? state?.favourites : payload?.favourites,
				recents: config?.recents === 'current' ? state?.recents : payload?.recents,
				playlists: config?.playlists === 'current' ? state?.playlists : payload?.playlists,
			};

		// Возвращаем текущее состояние, если действие не распознано
		default:
			return state;
	}
};

export default storage;
