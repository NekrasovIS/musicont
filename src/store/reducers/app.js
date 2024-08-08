// Импортируем начальное состояние приложения из файла состояний
import { app as appState } from '../states';

// Редуктор для обработки состояния приложения
// Параметры:
// - state: текущее состояние (по умолчанию начальное состояние из appState)
// - action: объект действия (содержит type и payload)
const app = (state = appState, { type = null, payload = null }) => {
	// Обрабатываем действие, используя switch
	switch (type) {
		// Можно добавить различные cases для обработки разных типов действий
		// Например:
		// case 'UPDATE_SOMETHING':
		//   return {
		//     ...state,
		//     something: payload,
		//   };

		// Если тип действия не распознан, возвращаем текущее состояние без изменений
		default:
			return state;
	}
};

// Экспорт редуктора по умолчанию
export default app;
