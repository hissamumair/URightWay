import React from "react";
import { View, StyleSheet, ScrollView, Image, SafeAreaView,TouchableOpacity } from "react-native";
import { Card, Text, Searchbar, Badge } from "react-native-paper";
import BottomNavigator from "../../Navigation/BottomNavigator";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const TaskManagementApp = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigation = useNavigation(); // Initialize navigation

  const StatusCard = () => (
    <Card style={styles.statusCard}>
      {/* <View style={styles.statusGrid}> */}
        {/* First Row */}
        <View style={styles.statusRow}>
          <View style={[styles.statusItem, styles.columnBorder, styles.leftAlignedItem]}>
            <Text style={styles.labelText}>Status</Text>
            <View style={styles.statusHeader}>
              <View style={styles.dotContainer}>
                <View style={styles.activeDot} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>
          <View style={[styles.statusItem, styles.columnBorder, styles.leftAlignedItem]}>
            <Text style={styles.labelText}>Start date</Text>
            <Text style={styles.valueText}>14 Feb, 2025</Text>
          </View>
          <View style={[styles.statusItem, styles.leftAlignedItem]}>
            <Text style={styles.labelText}>End date</Text>
            <Text style={styles.valueText}>14 March, 2025</Text>
          </View>
        </View>

        {/* Divider Line (Horizontal) */}
        <View style={styles.dividerLine} />

        {/* Second Row */}
        <View style={styles.statusRow}>
          <View style={[styles.statusItem, styles.columnBorder, styles.leftAlignedItem]}>
            <Text style={styles.labelText}>Completed Tasks</Text>
            <Text style={styles.valueText}>3</Text>
          </View>
          <View style={[styles.statusItem, styles.columnBorder, styles.leftAlignedItem]}>
            <Text style={styles.labelText}>In Progress</Text>
            <Text style={styles.valueText}>6</Text>
          </View>
          <View style={[styles.statusItem, styles.leftAlignedItem]}>
            <Text style={styles.labelText}>Pending Tasks</Text>
            <Text style={styles.valueText}>11</Text>
          </View>
        </View>
      {/* </View> */}
    </Card>
  );

  const TaskCard = ({ title, status, items,navigateTo }) => {
    const badgeColor = getStatusColor(status);
    
    const badgeTextColor = "black";
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate("DiaryStack", { screen: "IslamicDuty" })}> 

      <Card style={styles.taskCard}>
        <View style={styles.taskContent}>
          <Badge 
            style={[
              styles.badge, 
              { backgroundColor: badgeColor }
            ]}
          >
            <Text style={{ color: badgeTextColor }}>{status}</Text>
          </Badge>
          
          <View style={styles.taskDetails}>
            <Text style={styles.taskTitle}>{title}</Text>
            <View style={styles.itemsContainer}>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <Text style={styles.itemText}>{item}</Text>
                  {index < items.length - 1 && (
                    <Text style={styles.itemText}> • </Text>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
          
          {/* Forward Arrow at the bottom */}
          <View style={styles.forwardIconContainer}>
            <Image
              source={require("./../../Asssets/Images/forward.png")}
              style={styles.forwardArrowIcon}
            />
          </View>
        </View>
      </Card>
      </TouchableOpacity>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#B2FFAA";
      case "In Progress":
        return "white";
      case "Pending":
        return "#F6EEB4";
      default:
        return "#757575";
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          {/* Title and Subtitle */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>My Diary</Text>
            <Text style={styles.subtitle}>
              Track, Reflect, and Grow – Your Personal Development Journey
            </Text>
          </View>

          <StatusCard />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
            Stay True, Stay Honest Complete Your Tasks with Integrity.
          </Text>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchBarContainer}>
              <Searchbar
                placeholder="Search Topic"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
                iconColor="#fff"
                inputStyle={styles.searchInput}
                placeholderTextColor="#fff"
              />
              <Image
                source={require("./../../Asssets/Images/filter.png")}
                style={styles.filterIcon}
              />
            </View>
          </View>
          <TaskCard
            title="Islamic Duties"
            status="Completed"
            items={["Prayers", "Recitation", "Drood Pak", "Reminder", "Surat Un Nabi"]}
            navigateTo="IslamicDuty" // Pass the screen name here

          />
          <TaskCard
            title="Daily Exercise"
            status="In Progress"
            items={["Morning Walk", "Yoga", "Gym", "Evening Stretches"]}
          />

          <TaskCard
            title="Work Projects"
            status="Pending"
            items={["Client Meeting", "Project Review", "Documentation", "Team Sync"]}
          />

          <TaskCard
            title="Personal Goals"
            status="In Progress"
            items={["Reading", "Meditation", "Journal Writing", "Skill Development"]}
          />

     
          
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
      
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0033cc",
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#0033cc",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContainer: {
    marginTop: "20%",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
  },
  statusCard: {
    backgroundColor: "#0033cc",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusGrid: {
    flexDirection: "column",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  statusItem: {
    flex: 1,
    paddingHorizontal: 8,
  },
  leftAlignedItem: {
    alignItems: "flex-start", // Left align the text within each item
  },
  columnBorder: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 8,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
  },
  labelText: {
    color: "white",
    opacity: 0.7,
    fontSize: 14,
  },
  valueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  searchContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchBar: {
    backgroundColor: "#003366",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    elevation: 0,
    height: 48,
    width: '90%',
  },
  searchInput: {
    color: "#fff",
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "500",
  },
  filterIcon: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },
  taskCard: {
    backgroundColor: "#0033cc",
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 180,
    width: "100%",
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 5,
  },
  taskContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  taskDetails: {
    marginTop: 16,
    marginBottom: 16,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  forwardIconContainer: {
    alignItems: "flex-end",
    marginTop: "auto",
  },
  forwardArrowIcon: {
    width: 40,
    height: 40,
  },
  taskTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 14,
  },
  bottomPadding: {
    height: 20, // Extra padding to ensure content isn't hidden behind the bottom tab
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0033cc',
    marginHorizontal: 0, // Reduced bottom padding to move icons up
  },
});



export default TaskManagementApp;