import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAssets } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';

// Компонент Explore принимает несколько props: style, imageURL, title, subtitle и onPress.
const Explore = ({ style = {}, imageURL, title = 'Explore', subtitle = `Listen to what's trending now`, onPress = () => {} }) => {
	// useAssets загружает изображения, используемые в компоненте.
	const [assets] = useAssets([require('../../assets/explore/default.png'), require('../../assets/icons/play.png')]);
/* Основной контейнер компонента, позволяющий применять внешний стиль через props.
ImageBackground для отображения фона карточки. 
LinearGradient для добавления градиентного наложения на изображение.
Блок для заголовка и подзаголовка.
TouchableOpacity для кнопки воспроизведения, которая вызывает onPress при нажатии. */
	return (
		<View style={[styles.container, style]}>
			<ImageBackground
				style={styles.card}
				imageStyle={styles.imageStyle}
				source={imageURL ? { uri: imageURL } : require('../../assets/explore/default.png')}
				resizeMode="cover"
			>
				<LinearGradient
					style={styles.overlay}
					colors={['rgba(0, 0, 0, 1)', 'transparent']}
					start={[0, 0]}
					end={[1, 0]}
				/>
				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subtitle}>{subtitle}</Text>
				</View>
				<TouchableOpacity style={styles.btn} onPress={onPress}>
					<Image
						style={{ width: 40, height: 40 }}
						source={require('../../assets/icons/play.png')}
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

export default Explore;

const styles = StyleSheet.create({
	// Стиль для основного контейнера.
	container: {
		flex: 1,
		width: 280,
		height: 158,
		marginHorizontal: 10,
	},
	// Стиль для карточки, включающей flex настройки и стили.
	card: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		borderRadius: 8,
		paddingBottom: 10,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
	},
	// Стиль для градиентного наложения.
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: null,
		height: 158,
		borderRadius: 8,
	},
	// Стиль для изображения фона карточки.
	imageStyle: {
		borderRadius: 8,
	},
	// Стиль для заголовка.
	title: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'Roboto',
	},
	// Стиль для подзаголовка.
	subtitle: {
		color: '#FFF',
	},
	// Стиль для кнопки воспроизведения.
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
	},
});
