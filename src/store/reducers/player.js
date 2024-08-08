import { player as playerState } from '../states'; // Импорт начального состояния плеера
import { DISPATCHES } from '../../constants'; // Импорт констант действий (actions)

// Редуктор для управления состоянием плеера
const player = (state = playerState, { type = null, payload = {} }) => {
	// Используем switch для обработки различных типов действий
	switch (type) {
		// Обработка действия для установки текущей песни
		case DISPATCHES.SET_CURRENT_SONG:
			// Создаем конфигурацию, которая будет объединена с текущим состоянием
			const config = {
				playback: 'current', // Указывает, что мы хотим использовать текущее значение по умолчанию
				soundObj: 'current', // Указывает, что мы хотим использовать текущее значение по умолчанию
				detail: 'current', // Указывает, что мы хотим использовать текущее значение по умолчанию
				playbackStatus: 'current', // Указывает, что мы хотим использовать текущее значение по умолчанию
				...payload, // Объединяем с payload, который пришел с действием
			};

			return {
				...state,
				currentSong: {
					playback: config?.playback === 'current' ? state?.currentSong?.playback : payload?.playback,
					soundObj: config?.soundObj === 'current' ? state?.currentSong?.soundObj : payload?.soundObj,
					detail: config?.detail === 'current' ? state?.currentSong?.detail : payload?.detail,
					playbackStatus: config?.playbackStatus === 'current' ? state?.currentSong?.playbackStatus : payload?.playbackStatus,
				},
			};

		// Возвращаем текущее состояние, если действие не распознано
		default:
			return state;
	}
};

export default player;
