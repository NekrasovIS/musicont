import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

// Объединяем редукторы в один
const reducer = combineReducers({
	app: reducers.app,
	player: reducers.player,
	storage: reducers.storage,
});

// Создаем хранилище Redux
const store = createStore(reducer);

export default store;
