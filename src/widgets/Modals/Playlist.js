import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { DISPATCHES } from '../../constants';
import { Storage } from '../../helpers';

// Определение размеров экрана для стилей
const { width, height } = Dimensions.get('screen');

// Компонент Playlist для отображения и управления плейлистами
const Playlist = ({ storedPlaylists, dispatch, visible = false, onClose = () => {}, songIndex = 0 }) => {
	const [playlists, setPlaylists] = useState([]);
	const [newPlaylist, setNewPlaylist] = useState(false);
	const [input, setInput] = useState('');
	const [animation, setAnimation] = useState('slideInUp');

	// Закрытие модального окна и очистка состояния
	const closeModal = () => {
		setNewPlaylist(false);
		setInput('');
		setAnimation('fadeOutDown');

		const x = setTimeout(() => {
			onClose(false);
			clearTimeout(x);
		}, 300);
	};

	// Обработка ввода пользователя
	const handleInput = (val) => {
		setInput(val.replace('  ', ' '));
	};

	// Добавление песни в существующий плейлист или удаление из него
	const addToPlaylist = async (name) => {
		let lists = await Storage.get('playlists', true);

		for (let i = 0; i < lists.length; i++) {
			if (lists[i]?.name.toLowerCase() === name.toLowerCase()) {
				if (lists[i]?.songs.includes(songIndex)) {
					const updatedLists = lists[i]?.songs.filter((i) => i !== songIndex);
					lists[i].songs = updatedLists;

					if (updatedLists?.length < 1) {
						lists = lists.filter((i) => i?.name.toLowerCase() !== name.toLowerCase());
					}
				} else {
					lists[i]?.songs.unshift(songIndex);
				}
			}
		}

		await Storage.store('playlists', lists, true);
		dispatch({
			type: DISPATCHES.STORAGE,
			payload: {
				playlists: await Storage.get('playlists', true),
			},
		});
	};

	// Создание нового плейлиста
	const createPlaylist = async () => {
		const playlist = {
			name: input || 'Default',
			songs: [songIndex],
		};

		if (playlists.some((i) => i?.name.toLowerCase() === playlist?.name.toLowerCase())) {
			return Alert.alert('Playlist', 'Playlist already exists!', [
				{
					text: 'Close',
					style: 'cancel',
				},
				{
					text: 'Add to playlist',
					onPress: () => {
						addToPlaylist(playlist?.name);
						setNewPlaylist(false);
						setInput('');
					},
				},
			]);
		}

		playlists.unshift(playlist);
		await Storage.store('playlists', playlists, true);
		dispatch({
			type: DISPATCHES.STORAGE,
			payload: {
				playlists: await Storage.get('playlists', true),
			},
		});
		setNewPlaylist(false);
		setInput('');
	};

	// Эффект для обновления анимации при изменении видимости
	useEffect(() => {
		if (visible) {
			setAnimation('slideInUp');
		}
	}, [visible]);

	// Эффект для обновления списка плейлистов при изменении хранилища
	useEffect(() => {
		if (storedPlaylists !== null) {
			setPlaylists(storedPlaylists);
		}
	}, [storedPlaylists]);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<TouchableOpacity
				style={[{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width, height, backgroundColor: 'rgba(0, 0, 0, .5)', zIndex: 999 }]}
				activeOpacity={1}
				onPress={closeModal}
			/>
			<Animatable.View style={styles.modal} animation={animation} duration={300}>
				<Text style={styles.title}>Playlists</Text>
				{playlists.map(({ name, songs }, key) => (
					<TouchableOpacity key={key} style={styles.item} onPress={() => addToPlaylist(name)} activeOpacity={0.6}>
						<Text style={styles.itemText}>{`${name} (${songs.length || 0})`}</Text>
					</TouchableOpacity>
				))}

				{!newPlaylist && (
					<TouchableOpacity style={styles.item} onPress={() => setNewPlaylist(true)} activeOpacity={0.6}>
						<Text style={styles.itemText}>Create playlist</Text>
					</TouchableOpacity>
				)}

				{newPlaylist && (
					<View style={styles.newPlaylistContainer}>
						<View style={styles.input}>
							<TextInput
								style={styles.textInput}
								onChangeText={handleInput}
								value={input}
								placeholder="Playlist Name : "
								maxLength={25}
							/>
						</View>
						<TouchableOpacity
							style={styles.btn}
							onPress={input.length >= 3 ? createPlaylist : () => {}}
						>
							<Text style={[styles.btnTxt, { color: '#C07037' }, input.length < 3 && { opacity: 0.5 }]}>Создать</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => {
								setNewPlaylist(false);
								setInput('');
							}}
						>
							<Text style={styles.btnTxt}>Отмена</Text>
						</TouchableOpacity>
					</View>
				)}
			</Animatable.View>
		</Modal>
	);
};

// Соединение компонента с Redux
const mapStateToProps = (state) => ({ storedPlaylists: state?.storage?.playlists });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

// Стили для компонента
const styles = StyleSheet.create({
	modal: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 30,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		zIndex: 9999,
	},
	title: {
		color: 'rgba(0, 0, 0, .5)',
		fontSize: 24,
		fontWeight: 'bold',
		letterSpacing: 1,
		marginBottom: 20,
	},
	item: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: '#E6E6E6',
		marginBottom: 10,
		borderRadius: 5,
	},
	itemText: {
		color: 'rgba(0, 0, 0, .5)',
		fontSize: 16,
		letterSpacing: 1,
	},
	input: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 6,
		paddingHorizontal: 10,
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
	newPlaylistContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
});
