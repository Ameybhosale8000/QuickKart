import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { getImage } from "../utils/getImage"; // 👈 Correct import (named export)

export default function FoodScreen({ navigation }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const foodRef = ref(database, "categories/cat3");

    onValue(foodRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const firstKey = Object.keys(data)[0];
        const items = data[firstKey];

        if (items) {
          const foodList = Object.values(items);
          setFoods(foodList);
        }
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      {/* Image loaded using getImage helper */}
      {getImage(item.image) ? (
        <Image
          source={getImage(item.image)}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Image not found</Text>
        </View>
      )}

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating} Ratings</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={foods}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#777",
    fontSize: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#007bff",
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: "gray",
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartBtn: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 6,
  },
  buyBtn: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 6,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
