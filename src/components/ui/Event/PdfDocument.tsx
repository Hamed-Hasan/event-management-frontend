/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { IPaymentDetails } from "@/interfaces/global";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "1px solid #ddd",
    color: "#3BA27A",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    paddingTop: 20,
    borderTop: "1px solid #ddd",
  },
  logo: {
    width: 150,
    height: 75,
    margin: "auto",
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: "#1F3C4A",
  },
  details: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

interface IProps {
  details: IPaymentDetails | undefined;
}

// Create Document Component
const PdfDocument = ({ details }: IProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo.png" />
        <Text>Payment Receipt</Text>
      </View>
      <View>
        <Text style={styles.text}>Invoice to:</Text>
        <Text style={styles.text}>Name: {details?.name}</Text>
        <Text style={styles.text}>Email: {details?.email}</Text>
        <Text style={styles.text}>Payment ID: {details?.paymentId}</Text>
        <Text style={styles.text}>Booking ID: {details?.bookingId}</Text>
        <Text style={styles.text}>
          Amount: {details?.amount} {details?.currency}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text>Thank you for your booking!</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
