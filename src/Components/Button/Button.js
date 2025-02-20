import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  backgroundColor, 
  textColor, 
  disabled,
  width,
  height,
  borderRadius,
  fontSize,
  fontWeight,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: backgroundColor || '#2671fc', // Default color
          width: width || '45%', // Default width
          height: height || 40, // Default height
          borderRadius: borderRadius || 30, // Default border radius
          opacity: disabled ? 0.6 : 1, // Disabled state
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          { 
            color: textColor || 'white', // Default text color
            fontSize: fontSize || 14, // Default font size
            fontWeight: fontWeight || 'bold', // Default font weight
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Button;