import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useAssets } from 'expo-asset';
import { SCREENS } from '../../constants';

// Компонент для отображения иконки гамбургера (меню)
const LeftChildren = () => <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />;

// Компонент для отображения текста в середине заголовка
const MiddleChildren = ({ text }) => (
	<Text
		style={{
			fontSize: 20,
			color: '#A4A4A4',
		}}
	>
		{text}
	</Text>
);

// Компонент для отображения иконки поиска
const RightChildren = () => <Image source={require('../../assets/icons/search.png')} resizeMode="contain" />;

// Основной компонент заголовка
const Index = ({ style = { marginTop: 10, marginHorizontal: 10 }, options = {} }) => {
	const { navigate } = useNavigation(); // Получение навигационных методов
	const [assets] = useAssets([require('../../assets/icons/hamburger.png'), require('../../assets/icons/search.png')]);

	// Конфигурация для различных частей заголовка
	const config = {
		left: {
			style: {},
			show: true,
			children: <LeftChildren />, // Компонент для левой части заголовка
			onPress: () => {}, // Функция для обработки нажатия (можно настроить в options)
			...options?.left,
		},
		middle: {
			style: {},
			show: false,
			text: null, // Текст для средней части заголовка
			children: <MiddleChildren text="Title" />, // Компонент для средней части заголовка
			...options?.middle,
		},
		right: {
			style: {},
			show: true,
			children: <RightChildren />, // Компонент для правой части заголовка
			onPress: () => navigate(SCREENS.SEARCH), // Функция для обработки нажатия (переход на экран поиска)
			...options?.right,
		},
	};

	return (
		<View style={style}>
			<View style={styles.header}>
				<View style={[styles.left, config?.left?.style]}>
					{config?.left?.show && (
						<TouchableOpacity style={styles.btn} onPress={config?.left?.onPress}>
							{config?.left?.children}
						</TouchableOpacity>
					)}
				</View>

				<View style={[styles.middle, config?.middle?.style]}>
					{config?.middle?.show && <>{config?.middle?.text !== null ? <MiddleChildren text={config?.middle?.text} /> : config?.middle?.children}</>}
				</View>

				<View style={[styles.right, config?.right?.style]}>
					{config?.right?.show && (
						<TouchableOpacity style={styles.btn} onPress={config?.right?.onPress}>
							{config?.right?.children}
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	left: {
		flexBasis: 60,
	},
	middle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	right: {
		alignItems: 'flex-end',
		flexBasis: 60,
	},
	btn: {
		padding: 10,
	},
});
