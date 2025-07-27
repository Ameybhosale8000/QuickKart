import { ScrollView, Text, Image, StyleSheet, View } from 'react-native';
import React from 'react';

import { Categories } from '../data/Categories';


const Category = () => {
    return (
        <ScrollView 
        showsHorizontalScrollIndicator={false}
        horizontal style={styles.container}>
            {Categories.map(item => (
                <View key={item.id} style={styles.category}>
                    <Image source={item.image} style={styles.imgstyle} />
                    <Text style={styles.title}>{item.title}</Text>

                </View>
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
        color: '#2c4341'
       },

       category:{

paddingHorizontal: 8,
alignItems: 'center',

       }



});

export default Category;
