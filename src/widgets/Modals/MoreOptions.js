import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Получение размеров экрана для использования в стиле
const { width, height } = Dimensions.get('screen');

// Компонент MoreOptions для отображения модального окна с дополнительными опциями
const MoreOptions = ({
						 visible = false, // Флаг видимости модального окна
						 onClose = () => {}, // Функция для закрытия модального окна
						 title = 'Song Title', // Заголовок модального окна
						 moreOptions = [ // Массив опций, отображаемых в модальном окне
							 {
								 text: 'Play',
								 onPress: () => alert('Play song'), // Действие при нажатии на опцию
							 },
							 {
								 text: 'Add to favorite',
								 onPress: () => alert('Add song to favorite'),
							 },
							 {
								 text: 'Add to playlist',
								 onPress: () => alert('Add song to playlist'),
							 },
						 ],
					 }) => {
	const [animation, setAnimation] = useState('slideInUp'); // Состояние для управления анимацией модального окна

	// Функция для закрытия модального окна
	const closeModal = () => {
		setAnimation('fadeOutDown'); // Установка анимации закрытия

		// Таймер для вызова функции onClose после завершения анимации
		const x = setTimeout(() => {
			onClose(false);
			clearTimeout(x);
		}, 300); // Длительность таймера соответствует длительности анимации
	};

	// Эффект для обновления анимации при изменении видимости
	useEffect(() => {
		if (visible) {
			setAnimation('slideInUp'); // Установка анимации появления
		}
	}, [visible]);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<TouchableOpacity
				style={[{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width, height, backgroundColor: 'rgba(0, 0, 0, .5)', zIndex: 999 }]} // Полупрозрачный фон
				activeOpacity={1}
				onPress={closeModal}
			/>
			<Animatable.View style={styles.modal} animation={animation} duration={300}>
				<Text style={{ color: 'rgba(0, 0, 0, .5)', fontSize: 24, fontWeight: 'bold', letterSpacing: 1, marginBottom: 20 }}>{title}</Text>
				{moreOptions.map(({ text, onPress }, key) => (
					<TouchableOpacity key={key} style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#E6E6E6', marginBottom: 10, borderRadius: 5 }} onPress={onPress} activeOpacity={0.6}>
						<Text style={{ color: 'rgba(0, 0, 0, .5)', fontSize: 16, letterSpacing: 1 }}>{text}</Text>
					</TouchableOpacity>
				))}
			</Animatable.View>
		</Modal>
	);
};

export default MoreOptions;

// Стили для модального окна
const styles = StyleSheet.create({
	modal: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 30,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		zIndex: 9999, // Установка zIndex для правильного отображения поверх других компонентов
	},
});
