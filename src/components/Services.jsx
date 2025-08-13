import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // navigation hook
import AmazonPay from '../assets/pay.png';
import SendMoney from '../assets/send.png';
import PayBills from '../assets/bill.png';
import ScanQR from '../assets/scan.png';
import { RecentSearchData } from '../data/RecentSearchData';

const Services = () => {
  const navigation = useNavigation(); // navigation object

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingRight: 20 }}>
      
      {/* First Block */}
      <View style={styles.serviceContainer}>
        <View style={styles.row}>
          {/* Pay Tab */}
          <TouchableOpacity 
            style={styles.innerContainer} 
            onPress={() => navigation.navigate("Pay")} // navigate to PayScreen
          >
            <Image style={styles.imgStyle} source={AmazonPay} />
            <Text style={styles.title}>Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.innerContainer} 
            onPress={() => console.log("Send Money clicked")}
          >
            <Image style={styles.imgStyle} source={SendMoney} />
            <Text style={styles.title}>Send Money</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.innerContainer} 
            onPress={() => console.log("Scan QR clicked")}
          >
            <Image style={styles.imgStyle} source={ScanQR} />
            <Text style={styles.title}>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.innerContainer} 
            onPress={() => console.log("Pay Bills clicked")}
          >
            <Image style={styles.imgStyle} source={PayBills} />
            <Text style={styles.title}>Pay Bills</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Search Block */}
      {RecentSearchData.map(item => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.outerContainer} 
          onPress={() => console.log(item.title + " clicked")}
        >
          <Text style={styles.recentSearch}>{item.title}</Text>
          <Image source={item.image} style={styles.serviceImg} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 5,
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  innerContainer: {
    padding: 10,
    alignItems: 'center',
    paddingTop: 15,
  },
  title: {
    fontSize: 10,
    color: 'black',
    marginTop: 2,
  },
  serviceImg: {
    width: '100%',
    height: 130,
  },
  outerContainer: {
    backgroundColor: 'white',
    marginLeft: 8,
    borderRadius: 5,
    elevation: 5,
    padding: 5,
    width: 140,
  },
  recentSearch: {
    fontSize: 13,
    color: 'black',
    marginBottom: 8,
  },
});

export default Services;
