import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Сохраняет значение в AsyncStorage.
 *
 * @param {string} key - Ключ для хранения значения.
 * @param {any} value - Значение для сохранения. Если isJSON равно true, значение будет преобразовано в JSON строку.
 * @param {boolean} [isJSON=false] - Флаг, указывающий, нужно ли преобразовывать значение в JSON перед сохранением.
 */
export const store = async (key, value, isJSON = false) => {
	try {
		// Преобразуем значение в JSON, если isJSON равно true
		const storageValue = isJSON ? JSON.stringify(value) : value;
		await AsyncStorage.setItem(`@${key}`, storageValue);
	} catch (e) {
		// Логируем ошибку, если что-то пошло не так
		console.error(`[AsyncStorage Error][store]: ${e.message}`);
	}
};

/**
 * Получает значение из AsyncStorage.
 *
 * @param {string} key - Ключ для получения значения.
 * @param {boolean} [isJSON=false] - Флаг, указывающий, нужно ли преобразовывать полученное значение из JSON.
 * @returns {Promise<any>} - Значение, хранящееся в AsyncStorage. Если isJSON равно true, значение будет преобразовано из JSON.
 */
export const get = async (key, isJSON = false) => {
	try {
		const value = await AsyncStorage.getItem(`@${key}`);
		return value != null ? (isJSON ? JSON.parse(value) : value) : null;
	} catch (e) {
		// Логируем ошибку, если что-то пошло не так
		console.error(`[AsyncStorage Error][get]: ${e.message}`);
	}
};

/**
 * Удаляет значение из AsyncStorage по ключу.
 *
 * @param {string} key - Ключ, по которому будет удалено значение.
 */
export const remove = async (key) => {
	try {
		await AsyncStorage.removeItem(`@${key}`);
	} catch (e) {
		// Логируем ошибку, если что-то пошло не так
		console.error(`[AsyncStorage Error][remove]: ${e.message}`);
	}
};

/**
 * Очищает все данные в AsyncStorage.
 */
export const clear = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		// Логируем ошибку, если что-то пошло не так
		console.error(`[AsyncStorage Error][clear]: ${e.message}`);
	}
};
