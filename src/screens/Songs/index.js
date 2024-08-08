import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets'; // Импорт виджетов и компонентов из локальных путей
import { Icon } from '../../components'; // Импорт компонента Icon из локальных путей

// Основной компонент экрана отображения всех песен
const Index = ({ songs }) => {
	// Загружаем и кэшируем изображения с помощью expo-asset
	const [assets] = useAssets([
		require('../../assets/icons/hamburger.png'),
		require('../../assets/icons/search.png')
	]);

	// Состояние для управления открытием и закрытием бокового меню
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer
			active={drawer}
			current="песни"
			onItemPressed={() => setDrawer(false)} // Закрытие бокового меню при нажатии
		>
			<SafeAreaView style={styles.container}>
				<Header
					options={{
						left: {
							children: drawer ? (
								<Icon name="x" color="#C4C4C4" />
							) : (
								<Image
									source={require('../../assets/icons/hamburger.png')}
									resizeMode="contain"
								/>
							),
							onPress: () => setDrawer(!drawer),
						},
						middle: {
							show: true,
							text: 'Все песни',
						},
						right: {
							show: false,
						},
					}}
				/>
				<View style={styles.sections}>
					<Section.MusicList
						audios={songs}
						indicator={false}
					/>
				</View>
			</SafeAreaView>
		</Drawer>
	);
};

// Функция для получения данных о песнях из Redux состояния
const mapStateToProps = (state) => ({
	songs: state?.player?.songs, // Извлечение списка песен из состояния player
});

// Подключение компонента к Redux
export default connect(mapStateToProps, null)(Index);

// Определение стилей для компонента
const styles = StyleSheet.create({
	container: {
		flex: 1, // Разворачиваем контейнер на всю доступную высоту
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025, // Отступ от верхнего края экрана
	},
});
