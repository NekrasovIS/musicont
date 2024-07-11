import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Сохраняет данные в AsyncStorage.
 * @param {string} key - Ключ для хранения данных.
 * @param {*} value - Значение для хранения.
 * @param {boolean} isJSON - Флаг, указывающий, является ли значение JSON-объектом.
 */
export const store = async (key, value, isJSON = false) => {
	try {
		// Преобразует значение в строку JSON, если isJSON = true, иначе сохраняет как есть.
		await AsyncStorage.setItem(`@${key}`, !isJSON ? value : JSON.stringify(value));
	} catch (e) {
		// Логирует ошибку в консоль, если не удалось сохранить данные.
		console.log(`[AsyncStorage Error][store]: ${e?.message}`);
	}
};

/**
 * Получает данные из AsyncStorage.
 * @param {string} key - Ключ для получения данных.
 * @param {boolean} isJSON - Флаг, указывающий, является ли значение JSON-объектом.
 * @returns {*} - Возвращает значение, сохраненное под указанным ключом, или null, если значение не найдено.
 */
export const get = async (key, isJSON = false) => {
	try {
		// Получает значение по ключу из AsyncStorage.
		const value = await AsyncStorage.getItem(`@${key}`);
		// Если значение найдено, возвращает его, преобразуя из строки JSON, если isJSON = true.
		return value != null ? (!isJSON ? value : JSON.parse(value)) : null;
	} catch (e) {
		// Логирует ошибку в консоль, если не удалось получить данные.
		console.log(`[AsyncStorage Error][get]: ${e?.message}`);
	}
};

/**
 * Удаляет данные из AsyncStorage.
 * @param {string} key - Ключ для удаления данных.
 */
export const remove = async (key) => {
	try {
		// Удаляет значение по ключу из AsyncStorage.
		await AsyncStorage.removeItem(`@${key}`);
	} catch (e) {
		// Логирует ошибку в консоль, если не удалось удалить данные.
		console.log(`[AsyncStorage Error][remove]: ${e?.message}`);
	}
};

/**
 * Очищает все данные в AsyncStorage.
 */
export const clear = async () => {
	try {
		// Очищает все данные из AsyncStorage.
		await AsyncStorage.clear();
	} catch (e) {
		// Логирует ошибку в консоль, если не удалось очистить данные.
		console.log(`[AsyncStorage Error][clear]: ${e?.message}`);
	}
};
