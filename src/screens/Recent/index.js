import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets'; // Импорт пользовательских виджетов
import { Icon } from '../../components'; // Импорт пользовательских компонентов

const Index = ({ songs }) => {
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]); // Загрузка иконок
	const [drawer, setDrawer] = useState(false); // Состояние для управления Drawer (боковым меню)

	return (
		<Drawer active={drawer} current="recent" onItemPressed={() => setDrawer(false)}>
			<SafeAreaView style={styles.container}>
				<Header
					options={{
						left: {
							children: drawer ? <Icon name="x" color="#C4C4C4" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
							onPress: () => setDrawer(!drawer), // Переключение состояния Drawer при нажатии
						},
						middle: {
							show: true,
							text: 'Recently Played', // Заголовок в центре
						},
						right: {
							show: false,
						},
					}}
				/>
				<View style={styles.sections}>
					{songs && songs.length > 0 ? (
						<Section.MusicList audios={songs} indicator={false} useIndex={true} /> // Отображение списка недавно проигрывавшихся песен
					) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0, 0, 0, .3)' }}>No recent yet!</Text> // Сообщение, если песен нет
						</View>
					)}
				</View>
			</SafeAreaView>
		</Drawer>
	);
};

// Подключение компонента к Redux store для получения списка недавно проигрывавшихся песен
const mapStateToProps = (state) => ({ songs: state?.storage?.recents });
export default connect(mapStateToProps, null)(Index);

// Стили для компонента
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
