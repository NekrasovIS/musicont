import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';

import { Footer, Header, Section, Drawer } from '../../widgets'; // Импорт виджетов и компонентов
import { Icon } from '../../components'; // Импорт компонента Icon

const Index = () => {
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]); // Загрузка ресурсов
	const [drawer, setDrawer] = useState(false); // Состояние для открытия/закрытия бокового меню

	return (
		<Drawer active={drawer} current="home" onItemPressed={() => setDrawer(false)}>
			<SafeAreaView style={styles.container}>
				<Header // Заголовок экрана
					options={{
						left: {
							children: drawer ? <Icon name="x" color="#C4C4C4" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
							onPress: () => setDrawer(!drawer),
						},
					}}
				/>
				<View style={styles.sections}>
					<Section.Explore /> // Виджет "Исследовать"
					<Section.Recent style={{ marginTop: 30 }} /> // Виджет "Недавнее"
					<Section.Playlist style={{ marginTop: 30 }} /> // Виджет "Плейлист"
				</View>
				<Footer /> // Нижняя панель
			</SafeAreaView>
		</Drawer>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025, // Отступ от верхнего края экрана
	},
});
