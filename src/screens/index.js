import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Loading, Search, Playing, Home, Songs, Favourite, Recent, Playlists, Playlist } from './screens'; // Импорт экранов
import { SCREENS } from '../constants'; // Импорт констант для имен экранов

// Создание стека навигации
const Stack = createStackNavigator();

// Компонент для настройки стека навигации
const StackNavigation = () => (
	<Stack.Navigator
		headerMode="none" // Отключение заголовков по умолчанию
		initialRouteName={SCREENS.LOADING} // Установка начального экрана
	>
		<Stack.Screen name={SCREENS.LOADING} component={Loading} />
		<Stack.Screen name={SCREENS.SEARCH} component={Search} />
		<Stack.Screen name={SCREENS.PLAYING} component={Playing} />
		<Stack.Screen name={SCREENS.HOME} component={Home} />
		<Stack.Screen name={SCREENS.SONGS} component={Songs} />
		<Stack.Screen name={SCREENS.FAVOURITE} component={Favourite} />
		<Stack.Screen name={SCREENS.RECENT} component={Recent} />
		<Stack.Screen name={SCREENS.PLAYLISTS} component={Playlists} />
		<Stack.Screen name={SCREENS.PLAYLIST} component={Playlist} />
	</Stack.Navigator>
);

// Основной компонент приложения, оборачивающий навигацию
const Index = () => {
	return (
		<NavigationContainer>
			<StackNavigation />
		</NavigationContainer>
	);
};

// Экспорт компонента Index для использования в приложении
export default Index;
