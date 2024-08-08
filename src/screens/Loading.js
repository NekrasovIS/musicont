import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { DISPATCHES, SCREENS } from '../constants'; // Импорт констант для действий и экранов
import { Storage } from '../helpers'; // Импорт утилит для работы с хранилищем

// Получаем размеры экрана
const { width, height } = Dimensions.get('screen');

// Компонент загрузки
const Loading = ({ songs, dispatch, navigation: { replace } }) => {
	// Загружаем необходимые ресурсы
	const [assets] = useAssets([require('../../assets/splash.png')]);

	// Функция для получения данных из хранилища
	const getStorage = async () => {
		try {
			// Извлекаем данные из хранилища
			const favourites = await Storage.get('favourites', true);
			const recents = await Storage.get('recents', true);
			const playlists = await Storage.get('playlists', true);

			// Обновляем состояние Redux с полученными данными
			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					favourites,
					recents,
					playlists,
				},
			});

			// Если есть недавние треки, устанавливаем текущий трек
			if (recents && recents.length > 0) {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						detail: songs[recents[0]],
					},
				});
			}
		} catch (error) {
			console.error('Error fetching storage data:', error);
		}
	};

	// Функция инициализации, вызываемая при монтировании компонента
	const init = async () => {
		await getStorage();
		replace(SCREENS.HOME); // Перенаправляем на основной экран
	};

	// Эффект для выполнения инициализации при монтировании компонента
	useEffect(() => {
		init();
	}, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз

	return (
		<Image
			style={styles.img}
			source={require('../../assets/splash.png')}
			resizeMode="cover"
		/>
	);
};

// Связываем состояние Redux с компонентом
const mapStateToProps = (state) => ({
	songs: state?.player?.songs,
});

// Связываем диспетчер с компонентом
const mapDispatchToProps = (dispatch) => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);

// Стили для изображения
const styles = StyleSheet.create({
	img: {
		width, // Ширина экрана
		height, // Высота экрана
	},
});
