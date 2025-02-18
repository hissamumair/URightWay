import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Text, Button, Menu, Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Create a custom theme extending Paper's DefaultTheme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0047cc',
    accent: '#32cd32',
    background: '#0047cc',
    text: '#ffffff',
  },
};

const IslamicDutiesScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(2); // Start at Recitation (step 2)
  const [hasRecited, setHasRecited] = useState('yes');
  const [recitationMethod, setRecitationMethod] = useState('Pary');
  const [menuVisible, setMenuVisible] = useState(false);

  const steps = [
    { id: 1, title: 'Prayers' },
    { id: 2, title: 'Recitation' },
    { id: 3, title: 'Drood Pak' },
    { id: 4, title: 'Reminder' },
    { id: 5, title: 'Serat Un Nabi' },
  ];

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
          <Appbar.Content title="Islamic Duties" titleStyle={styles.headerTitle} />
        </Appbar.Header>

        <View style={styles.stepIndicatorOuterContainer}>
          <View style={styles.stepIndicatorContainer}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepItem}>
                <View 
                  style={[
                    styles.stepCircle, 
                    currentStep === step.id && styles.activeStepCircle
                  ]}
                >
                  <Text 
                    style={[
                      styles.stepNumber, 
                      currentStep === step.id && styles.activeStepNumber
                    ]}
                  >
                    {step.id}
                  </Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                {index < steps.length - 1 && <View style={styles.stepLine} />} 
              </View>
            ))}
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>Q1.</Text>
            <Text style={styles.questionText}>
              Have you recite Holy Quran? If yes, how did you recite? Choose from the options below:
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionRow}
              onPress={() => setHasRecited('yes')}
            >
              <View style={[styles.radioButton, hasRecited === 'yes' && styles.radioButtonSelected]}>
                {hasRecited === 'yes' && <Icon name="check" size={18} color="white" />}
              </View>
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionRow}
              onPress={() => setHasRecited('no')}
            >
              <View style={[styles.radioButton, hasRecited === 'no' && styles.radioButtonSelected]}>
                {hasRecited === 'no' && <Icon name="check" size={18} color="white" />}
              </View>
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>

          {hasRecited === 'yes' && (
            <View style={styles.dropdownContainer}>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setMenuVisible(true)}
                  >
                    <Text style={styles.dropdownButtonText}>{recitationMethod}</Text>
                    <Icon name="chevron-down" size={24} color="white" />
                  </TouchableOpacity>
                }
              >
                <Menu.Item onPress={() => { setRecitationMethod('Pary'); setMenuVisible(false); }} title="Pary" />
                <Menu.Item onPress={() => { setRecitationMethod('Tajweed'); setMenuVisible(false); }} title="Tajweed" />
                <Menu.Item onPress={() => { setRecitationMethod('Tarteel'); setMenuVisible(false); }} title="Tarteel" />
                <Menu.Item onPress={() => { setRecitationMethod('Hadr'); setMenuVisible(false); }} title="Hadr" />
                <Menu.Item onPress={() => { setRecitationMethod('Tadweer'); setMenuVisible(false); }} title="Tadweer" />
              </Menu>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handlePreviousStep}
            style={styles.previousButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.previousButtonText}
          >
            Previous Step
          </Button>

          <Button
            mode="contained"
            onPress={handleNextStep}
            style={styles.nextButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.nextButtonText}
          >
            Next
          </Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0047cc',
    padding:10,
  },
  header: {
    backgroundColor: '#0047cc',
    elevation: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign:"center",

  },
  stepIndicatorOuterContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: {
    width: '16%', // Adjusted width for 5 steps (20% width - small step size)
    marginHorizontal: 8, // Space between steps
  },
  stepCircle: {
    width: 30,  // Slightly smaller circle
    height: 30,  // Slightly smaller circle
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: 'white',
  },
  stepNumber: {
    fontSize: 14, // Reduced font size for small circle
    fontWeight: 'bold',
    color: 'white',
  },
  activeStepNumber: {
    color: '#0047cc',
  },
  stepTitle: {
    fontSize: 9,  // Reduced font size for step titles
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: '-50%',
    width: 30,  // Adjusted to match the smaller step size
    height: 2,
    margin:38,
    backgroundColor: 'white',
  },
  content: {
    // flex: 1,
    paddingHorizontal: 24,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  questionText: {
    fontSize: 15, // Reduced font size for the question
    color: 'white',
    flex: 1,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    margin:10,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#32cd32',
    borderColor: '#32cd32',
  },
  optionText: {
    fontSize: 16, // Slightly smaller font size for options
    color: 'white',
    marginLeft: 8,
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownButton: {
    flexDirection: 'row',
    width:"40%",
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor:"blue",
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 10,  // Reduced padding for compactness
  },
  dropdownButtonText: {
    fontSize: 14,  // Slightly smaller font size for dropdown text
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  buttonContent: {
    height: 40,  // Slightly smaller button
  },
  previousButton: {
    backgroundColor: '#2671fc',
    paddingVertical: 8,
    // paddingHorizontal: 24,
    borderRadius: 30,
    width: '45%',
  },
  previousButtonText: {
    color: 'white',
    fontSize: 14,  // Slightly smaller font size for button text
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '45%',
  },
  nextButtonText: {
    color: '#0047cc',
    fontSize: 14,  // Slightly smaller font size for button text
    fontWeight: 'bold',
  },
});

export default IslamicDutiesScreen;
