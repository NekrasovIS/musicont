import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Компонент Played принимает несколько props: style, imageURL, title, author и onPress.
const Played = ({ style = {}, imageURL, title = 'Song Title', author = `Artist Name`, onPress = () => {} }) => (
	<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
		<View>
			{/* Добавляем размытую фоновую картинку */}
			<Image
				style={{
					width: 130,
					height: 130,
					borderRadius: 10,
					position: 'absolute',
					bottom: -6,
					opacity: 0.5,
					alignSelf: 'center',
				}}
				source={{ uri: imageURL }}
				resizeMode="cover"
				borderRadius={10}
				blurRadius={100}
			/>
			{/* Обложка трека */}
			<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={10} />
		</View>
		<View style={styles.content}>
			{/* Заголовок трека */}
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
			{/* Имя автора */}
			<Text style={styles.author} numberOfLines={1}>
				{author}
			</Text>
		</View>
	</TouchableOpacity>
);

export default Played;

const styles = StyleSheet.create({
	// Основной контейнер для компонента.
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	// Стиль для обложки трека.
	coverArt: {
		width: 150,
		height: 150,
	},
	// Стиль для контейнера содержимого.
	content: {
		width: 140,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	// Стиль для заголовка.
	title: {
		color: '#555555',
		fontSize: 20,
		fontWeight: '900',
		letterSpacing: 1,
	},
	// Стиль для имени автора.
	author: {
		color: '#555555',
	},
});
