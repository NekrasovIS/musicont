import React from 'react';
import {
	AntDesign,
	Entypo,
	EvilIcons,
	Feather,
	FontAwesome,
	FontAwesome5,
	Fontisto,
	Foundation,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
	SimpleLineIcons,
	Zocial,
} from '@expo/vector-icons';
// Интерфейс IC определяет типы пропсов, которые принимает компонент Icon.
interface IC {
	family:
		| 'AntDesign'
		| 'Entypo'
		| 'EvilIcons'
		| 'Feather'
		| 'FontAwesome'
		| 'FontAwesome5'
		| 'Fontisto'
		| 'Foundation'
		| 'Ionicons'
		| 'MaterialCommunityIcons'
		| 'MaterialIcons'
		| 'Octicons'
		| 'SimpleLineIcons'
		| 'Zocial';
	[name: string]: any;
	[size: number]: any;
	color: string;
	props: object;
}
// Компонент Icon принимает несколько props: family, name, size, color и дополнительные props.
const Icon = ({ family = 'Feather', name = 'home', size = 24, color = '#000', props }: IC) => (
	<>
		{family === 'AntDesign' && <AntDesign name={name} size={size} color={color} {...props} />}
		{family === 'Entypo' && <Entypo name={name} size={size} color={color} {...props} />}
		{family === 'EvilIcons' && <EvilIcons name={name} size={size} color={color} {...props} />}
		{family === 'Feather' && <Feather name={name} size={size} color={color} {...props} />}
		{family === 'FontAwesome' && <FontAwesome name={name} size={size} color={color} {...props} />}
		{family === 'FontAwesome5' && <FontAwesome5 name={name} size={size} color={color} {...props} />}
		{family === 'Fontisto' && <Fontisto name={name} size={size} color={color} {...props} />}
		{family === 'Foundation' && <Foundation name={name} size={size} color={color} {...props} />}
		{family === 'Ionicons' && <Ionicons name={name} size={size} color={color} {...props} />}
		{family === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={name} size={size} color={color} {...props} />}
		{family === 'MaterialIcons' && <MaterialIcons name={name} size={size} color={color} {...props} />}
		{family === 'Octicons' && <Octicons name={name} size={size} color={color} {...props} />}
		{family === 'SimpleLineIcons' && <SimpleLineIcons name={name} size={size} color={color} {...props} />}
		{family === 'Zocial' && <Zocial name={name} size={size} color={color} {...props} />}
	</>
);

export default Icon;
