import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  Menu,
  Provider as PaperProvider,
  BottomNavigation,
} from 'react-native-paper';
import {DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './../../Components/Button/Button';
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

const questions = [
  {
    id: 1,
    text: 'Have you recited Holy Quran? If yes, how did you recite? Choose from the options below:',
    hasDropdown: true,
    options: ['Pary', 'Tajweed', 'Tarteel', 'Hadr', 'Tadweer'],
  },
  {
    id: 2,
    text: 'Did you offer all five prayers today?',
    hasDropdown: true,
    options: [
      'All Five Prayers',
      'Four Prayers',
      'Three Prayers',
      'Two Prayers',
      'One Prayer',
    ],
  },
  {
    id: 3,
    text: 'Have you recited Drood Pak today?',
    hasDropdown: true,
    options: ['100 Times', '50 Times', '25 Times', '10 Times', 'Less than 10'],
  },
  {
    id: 4,
    text: 'Did you complete your daily Quran reminder?',
    hasDropdown: true,
    options: [
      'Full Chapter',
      'Half Chapter',
      'Quarter Chapter',
      'Few Verses',
      'One Verse',
    ],
  },
  {
    id: 5,
    text: 'Have you studied Serat Un Nabi today?',
    hasDropdown: true,
    options: ['1 Hour', '30 Minutes', '15 Minutes', '10 Minutes', '5 Minutes'],
  },
];

const steps = [
  {id: 1, title: 'Prayers'},
  {id: 2, title: 'Recitation'},
  {id: 3, title: 'Drood Pak'},
  {id: 4, title: 'Reminder'},
  {id: 5, title: 'Serat Un Nabi'},
];

const IslamicDutiesScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleMethodSelect = method => {
    setMenuVisible(false);
    handleAnswer(questions[currentQuestion].id, {
      ...answers[questions[currentQuestion].id],
      method: method,
    });
  };

  const handleNextStep = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Q{question.id}.</Text>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              handleAnswer(question.id, {
                ...answers[question.id],
                answer: 'yes',
              })
            }>
            <View
              style={[
                styles.radioButton,
                answers[question.id]?.answer === 'yes' &&
                  styles.radioButtonSelected,
              ]}>
              {answers[question.id]?.answer === 'yes' && (
                <Icon name="check" size={18} color="#0024CF" />
              )}
            </View>
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              handleAnswer(question.id, {
                ...answers[question.id],
                answer: 'no',
              })
            }>
            <View
              style={[
                styles.radioButton,
                answers[question.id]?.answer === 'no' &&
                  styles.radioButtonSelected,
              ]}>
              {answers[question.id]?.answer === 'no' && (
                <Icon name="check" size={18} color="0024CF" />
              )}
            </View>
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>

        {question.hasDropdown && answers[question.id]?.answer === 'yes' && (
          <View style={styles.dropdownContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setMenuVisible(true)}>
                  <Text style={styles.dropdownButtonText}>
                    {answers[question.id]?.method || 'Select Option'}
                  </Text>
                  <Icon name="chevron-down" size={24} color="white"style={{marginTop:-7}}/>
                </TouchableOpacity>
              }>
              {question.options.map(option => (
                <Menu.Item
                  key={option}
                  onPress={() => handleMethodSelect(option)}
                  title={option}
                />
              ))}
            </Menu>
          </View>
        )}
      </View>
    );
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Appbar style={styles.header}>
            <Appbar.BackAction
              onPress={() => navigation.goBack()}
              color="white"
            />
            <Appbar.Content
              title="Islamic Duties"
              titleStyle={styles.headerTitle}
              style={styles.headerContent}
            />
          </Appbar>

          <View style={styles.stepIndicatorOuterContainer}>
            <View style={styles.stepIndicatorContainer}>
              {steps.map((step, index) => (
                <View key={step.id} style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      currentStep === step.id && styles.activeStepCircle,
                    ]}>
                    <Text
                      style={[
                        styles.stepNumber,
                        currentStep === step.id && styles.activeStepNumber,
                      ]}>
                      {step.id}
                    </Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  {index < steps.length - 1 && <View style={styles.stepLine} />}
                </View>
              ))}
            </View>
          </View>

          <ScrollView style={styles.content}>{renderQuestion()}</ScrollView>
          <View style={{flexDirection:"row",justifyContent:"space-between",padding:20}}>
            <CustomButton
              title={'Previous Step'}
              backgroundColor={'#2562FF'}
              onPress={handlePreviousStep}
           
              width={170}
              height={50}
              fontSize={14}
            />
            <CustomButton
              title={'Next'}
              onPress={handleNextStep}

              width={170}
              backgroundColor={'white'}
              fontSize={15}
              textColor={'black'}
              height={50}

            />
          </View>
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0123AE',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0123AE',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    height: Platform.OS === 'ios' ? 44 : 56,
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        marginTop: -8,
      },
    }),
  },
  stepIndicatorOuterContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  stepItem: {
    alignItems: 'center',
    width: '16%',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0024CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: 'white',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  activeStepNumber: {
    color: '#0047cc',
  },
  stepTitle: {
    fontSize: 9,
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: 15,
    left: '90%',
    width: 34,
    height: 2,
    backgroundColor: '#0537DE',
  },
  content: {
    flex: 1,
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
    fontSize: 15,
    color: 'white',
    flex: 1,
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#00F400',
    borderColor: '#32cd32',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 12,
  },
  dropdownContainer: {
    // marginBottom: 24,
    paddingHorizontal: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    width: 130,
    height: 37,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0024CF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  dropdownButtonText: {
    fontSize: 10,
    color: 'white',
    // textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  buttonContent: {
    height: 40,
  },
  previousButton: {
    backgroundColor: '#2671fc',
    paddingVertical: 8,
    borderRadius: 30,
    width: '45%',
  },
  previousButtonText: {
    color: 'white',
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default IslamicDutiesScreen;
