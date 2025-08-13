import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const sections = [
  {
    title: "Quickkart UPI",
    items: [
      { label: "Scan any QR Code", icon: "qr-code-scanner" },
      { label: "Pay Mobile Number", icon: "phone-android" },
      { label: "Pay UPI ID/UPI Number", icon: "account-balance-wallet" }
    ]
  },
  {
    title: "Bills & Recharge",
    items: [
      { label: "Electricity Bill", icon: "bolt" },
      { label: "Mobile Recharge", icon: "signal-cellular-alt" },
      { label: "Mobile Postpaid", icon: "phone-android" }
    ]
  },
  {
    title: "Cards, Loans & EMIs",
    items: [
      { label: "Quickkart Axis Bank Credit", icon: "credit-card" },
      { label: "EMI", icon: "payments" },
      { label: "Personal Loan", icon: "account-balance" }
    ]
  },
  {
    title: "New Launches",
    items: [
      { label: "Axis Bank Quickkart", icon: "new-releases" },
      { label: "Business Loan", icon: "business" },
      { label: "Home Loan", icon: "home" }
    ]
  },
  {
    title: "Sponsored",
    items: [
      { label: "Stock Advisory", icon: "show-chart" },
      { label: "Credit Report", icon: "assignment" },
      { label: "Fixed Deposit", icon: "savings" }
    ]
  }
];

const IconGrid = ({ items }) => (
  <View style={styles.grid}>
    {items.map((item, index) => (
      <TouchableOpacity key={index} style={styles.gridItem}>
        <View style={styles.iconCircle}>
          <Icon name={item.icon} size={24} color="white" />
        </View>
        <Text style={styles.gridText}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const UPIAndLoansScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <IconGrid items={section.items} />
        </View>
      ))}

      <View style={styles.finalBanner}>
        <Text style={styles.finalTextTitle}>
          Your Freedom Account returns are now your second income.
        </Text>
        <Text style={styles.finalTextSubtitle}>
          Get 7% interest* p.a., paid monthly
        </Text>
        <Text style={styles.finalBrand}>UNITY Freedom Account</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12
  },
  section: {
    marginTop: 18
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000000ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
  },
  gridText: {
    fontSize: 12,
    textAlign: "center"
  },
  finalBanner: {
    backgroundColor: "#ffe3f0",
    padding: 16,
    borderRadius: 10,
    marginVertical: 20
  },
  finalTextTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  finalTextSubtitle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 4
  },
  finalBrand: {
    color: "#ff1e88",
    fontWeight: "bold",
    marginTop: 4
  }
});

export default UPIAndLoansScreen;