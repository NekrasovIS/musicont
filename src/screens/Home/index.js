import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';

import { Footer, Header, Section, Drawer } from '../../widgets'; // Импорт виджетов и компонентов из локальных путей
import { Icon } from '../../components'; // Импорт компонента Icon из локальных путей

const Index = () => {
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
			current="home"
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
					}}
				/>
				<View style={styles.sections}>
					<Section.Explore />
					<Section.Recent style={{ marginTop: 30 }} />
					<Section.Playlist style={{ marginTop: 30 }} />
				</View>
				<Footer />
			</SafeAreaView>
		</Drawer>
	);
};

export default Index;

// Определяем стили для компонента
const styles = StyleSheet.create({
	container: {
		flex: 1, // Разворачиваем контейнер на всю доступную высоту
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025, // Отступ от верхнего края экрана
	},
});
