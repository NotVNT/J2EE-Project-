import { StyleSheet, Text, View } from 'react-native';

const SUBTLE = '#6B7280';
const FACEBOOK_BLUE = '#1877F2';

export function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <View style={eyeStyles.outer}>
      <View style={eyeStyles.inner} />
      {!visible && <View style={eyeStyles.slash} />}
    </View>
  );
}

export function FacebookIcon() {
  return (
    <View style={socialStyles.fbCircle}>
      <Text style={socialStyles.fbText}>f</Text>
    </View>
  );
}

export function GoogleIcon() {
  return (
    <View style={socialStyles.gCircle}>
      <Text style={socialStyles.gText}>G</Text>
    </View>
  );
}

const eyeStyles = StyleSheet.create({
  outer: {
    width: 22,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: SUBTLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SUBTLE,
  },
  slash: {
    position: 'absolute',
    width: 24,
    height: 1.5,
    backgroundColor: SUBTLE,
    transform: [{ rotate: '-35deg' }],
  },
});

const socialStyles = StyleSheet.create({
  fbCircle: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: FACEBOOK_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  gCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#EA4335',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4285F4',
    lineHeight: 15,
  },
});
