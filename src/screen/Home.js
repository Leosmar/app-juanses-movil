import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React from 'react'
import  Layout  from '../components/Layout';

import Title from '../components/Title'


const Home = ({navigation}) => {
    return (
        <Layout navigation={navigation} style={styles.container}>
            <Title> Inicio </Title>
 
        </Layout> 
      );
}


export default Home

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})
