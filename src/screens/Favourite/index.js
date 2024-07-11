import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets'; // Импорт виджетов и компонентов
import { Icon } from '../../components'; // Импорт компонента Icon

const Index = ({ songs }) => {
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]); // Загрузка ресурсов
	const [drawer, setDrawer] = useState(false); // Состояние для открытия/закрытия бокового меню

	return (
		<Drawer active={drawer} current="favourite" onItemPressed={() => setDrawer(false)}>
			<SafeAreaView style={styles.container}>
				<Header // Заголовок экрана
					options={{
						left: {
							children: drawer ? <Icon name="x" color="#C4C4C4" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
							onPress: () => setDrawer(!drawer),
						},
						middle: {
							show: true,
							text: 'My Favourites', // Текст в центре заголовка
						},
						right: {
							show: false, // Не отображать правую часть заголовка
						},
					}}
				/>
				<View style={styles.sections}>
					{songs && songs.length > 0 ? ( // Проверка наличия избранных песен
						<Section.MusicList audios={songs} indicator={false} useIndex={true} /> // Вывод списка песен
					) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0, 0, 0, .3)' }}>No favourite yet!</Text> // Сообщение об отсутствии избранных песен
						</View>
					)}
				</View>
			</SafeAreaView>
		</Drawer>
	);
};

const mapStateToProps = (state) => ({ songs: state?.storage?.favourites }); // Получение списка избранных песен из Redux состояния
export default connect(mapStateToProps, null)(Index); // Подключение компонента к Redux

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025, // Отступ от верхнего края экрана
	},
});
