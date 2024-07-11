import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';

import { Section } from '../../widgets'; // Импорт пользовательских виджетов
import { Icon } from '../../components'; // Импорт пользовательских компонентов

const Index = ({ songs }) => {
	const { goBack } = useNavigation(); // Получение функции для навигации назад
	const [audios, setAudios] = useState([]); // Состояние для хранения результатов поиска
	const [search, setSearch] = useState(''); // Состояние для хранения текста поиска

	const handleInput = (val) => {
		const value = val.replace('  ', ' '); // Замена двойных пробелов на одинарные
		setSearch(value);
		if (value.length > 3) { // Поиск начинается, если длина строки поиска больше 3 символов
			const results = songs.filter((song) => {
				let regex = new RegExp(value, 'ig');
				return regex.exec(song?.title) || regex.exec(song?.author); // Поиск совпадений в названии или авторе песни
			});

			setAudios(results); // Обновление состояния с результатами поиска
		} else {
			setAudios([]); // Очистка результатов поиска, если длина строки меньше 3 символов
		}
	};

	return (
		<>
		<StatusBar style="dark" />
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<View style={styles.input}>
						<Icon name="search" color="#FFF" />
						<TextInput style={styles.textInput} onChangeText={handleInput} value={search} returnKeyType="search" placeholder="Search..." /> {/* Поле ввода для поиска */}
					</View>
					<TouchableOpacity style={styles.btn} onPress={() => goBack()}>
						<Text style={styles.btnTxt}>Cancel</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.result}>
					{audios.length > 0 ? (
						<Section.MusicList audios={audios} />
						) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0, 0, 0, .3)' }}>Search something...</Text>
				</View>
				)}
			</View>
		</SafeAreaView>
		</TouchableWithoutFeedback>
</>
);
};

// Подключение компонента к Redux store для получения списка песен
const mapStateToProps = (state) => ({ songs: state?.player?.songs });
export default connect(mapStateToProps, null)(memo(Index)); // Использование memo для оптимизации производительности

// Стили для компонента
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 15,
		marginHorizontal: 20,
	},
	input: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 15,
		backgroundColor: '#E6E6E6',
		borderRadius: 6,
	},
	textInput: {
		flex: 1,
		color: 'rgba(0, 0, 0, .5)',
		marginLeft: 10,
	},
	btn: {
		flexBasis: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnTxt: {
		color: '#C4C4C4',
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	result: {
		flex: 1,
	},
});
