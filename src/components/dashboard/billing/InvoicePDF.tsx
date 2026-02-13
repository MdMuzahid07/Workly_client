"use client";

import { Invoice } from "@/types/billing";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Define professional styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#334155",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
  },
  companyInfo: {
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#64748B",
    marginBottom: 8,
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  table: {
    width: "100%",
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tableCol: {
    flex: 1,
  },
  tableColDescription: {
    flex: 2,
  },
  textBold: {
    fontWeight: "bold",
    color: "#0F172A",
  },
  totalSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginBottom: 4,
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10B981",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
}

export default function InvoicePDF({ invoice }: InvoicePDFProps) {
  return (
    <Document title={`Invoice-${invoice.number}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={{ marginTop: 4 }}>Workly Job Portal</Text>
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.textBold}>Workly Inc.</Text>
            <Text>123 Business Avenue</Text>
            <Text>Silicon Valley, CA 94025</Text>
            <Text>support@workly.job</Text>
          </View>
        </View>

        {/* Invoice Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.textBold}>TechFlow Solutions</Text>
            <Text>789 Innovation Drive</Text>
            <Text>Austin, TX 78701</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <Text style={styles.sectionTitle}>Invoice Details</Text>
            <Text>
              Number: <Text style={styles.textBold}>{invoice.number}</Text>
            </Text>
            <Text>
              Date: <Text style={styles.textBold}>{invoice.date}</Text>
            </Text>
            <Text>
              Status:{" "}
              <Text style={styles.textBold}>
                {invoice.status.toUpperCase()}
              </Text>
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableColDescription}>
              <Text style={styles.textBold}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.textBold, { textAlign: "center" }]}>
                Qty
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.textBold, { textAlign: "right" }]}>
                Price
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColDescription}>
              <Text style={styles.textBold}>{invoice.planName}</Text>
              <Text style={{ fontSize: 8, marginTop: 2, color: "#64748B" }}>
                Monthly subscription for premium hiring features.
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{ textAlign: "center" }}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={{ textAlign: "right" }}>
                ${invoice.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text style={styles.textBold}>${invoice.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax (0%):</Text>
            <Text style={styles.textBold}>$0.00</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text>Total Due:</Text>
            <Text>${invoice.amount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Thank you for choosing Workly Job. We appreciate your business.
          </Text>
          <Text style={{ marginTop: 2 }}>
            Terms & Conditions apply. Powered by Workly Billing.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
