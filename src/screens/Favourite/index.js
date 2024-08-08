import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets'; // Импорт виджетов и компонентов из локальных путей
import { Icon } from '../../components'; // Импорт компонента Icon из локальных путей

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
			current="favourite"
			onItemPressed={() => setDrawer(false)}
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
							text: 'Мои избранные',
						},
						right: {
							show: false,
						},
					}}
				/>
				<View style={styles.sections}>
					{songs && songs.length > 0 ? (
						<Section.MusicList
							audios={songs}
							indicator={false}
							useIndex={true}
						/>
					) : (
						<View style={styles.emptyState}>
							<Text style={styles.emptyText}>Избранных песен нет!</Text>
						</View>
					)}
				</View>
			</SafeAreaView>
		</Drawer>
	);
};

// Получаем список избранных песен из состояния Redux
const mapStateToProps = (state) => ({
	songs: state?.storage?.favourites
});

export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025, // Отступ от верхнего края экрана
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	emptyText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'rgba(0, 0, 0, .3)' // Стилизуем текст сообщения
	}
});
