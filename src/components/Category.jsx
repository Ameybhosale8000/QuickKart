import { ScrollView, Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';

import { Categories } from '../data/Categories';
import { useNavigation } from '@react-navigation/native';

const Category = () => {
    const navigation = useNavigation();


    const handleCategoryPress = (title) => {
        switch (title.toLowerCase()) {
            case 'fresh':
                navigation.navigate('FreshScreen');
                break;
            case 'deals':
                navigation.navigate('DealsScreen'); 
                break;


            case 'beauty':
                navigation.navigate('BeautyScreen');
                break;
            case 'mobiles':
                navigation.navigate('MobileScreen');
                break;
            // Add more cases as needed

        }
    };

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.container}
        >
            {Categories.map(item => (
                <TouchableOpacity
                    onPress={() => handleCategoryPress(item.title)}
                    key={item.id}
                    style={styles.category}
                >
                    <Image source={item.image} style={styles.imgstyle} />
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 10,
    },
    imgstyle: {
        width: 65,
        height: 65,
    },
    title: {
        fontSize: 14,
        color: '#2c4341',
    },
    category: {
        paddingHorizontal: 8,
        alignItems: 'center',
    },
});

export default Category;
