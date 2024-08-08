/**
 * Преобразует время в миллисекундах в формат минут и секунд.
 * @param {number} millis - Время в миллисекундах.
 * @returns {string} - Время в формате "минуты:секунды".
 */
const millisToMin = millis => {
	// Вычисляем минуты
	const minutes = Math.floor(millis / 60000);
	// Вычисляем секунды
	const seconds = Math.floor((millis % 60000) / 1000);
	// Форматируем строку с ведущим нулем для секунд
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default millisToMin;
