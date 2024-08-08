import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Импорт контейнера навигации для управления навигацией
import { createStackNavigator } from '@react-navigation/stack'; // Импорт функции для создания стека навигации

// Импорт экранов приложения
import HomeScreen from './src/screens/Home'; // Экран домашней страницы
import SearchScreen from './src/screens/Search'; // Экран поиска
import PlayScreen from './src/screens/Playing'; // Экран воспроизведения

// Создаем экземпляр стека навигации
const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false, // Отключить отображение заголовка для всех экранов по умолчанию
				}}
			>

				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Search" component={SearchScreen} />
				<Stack.Screen name="Play" component={PlayScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
