import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#1A6B6B';
const BORDER = '#D0D5DD';
const PLACEHOLDER = '#A0A0A0';
const LABEL = '#1A1A1A';
const SUBTLE = '#6B7280';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }
    // TODO: connect to backend
    Alert.alert('Login', `Logging in as ${email}`);
  };

  const handleFacebook = () => Alert.alert('Facebook', 'Facebook login coming soon.');
  const handleGoogle = () => Alert.alert('Google', 'Google login coming soon.');
  const handleRegister = () => router.push({ pathname: '/register' } as never);
  const handleForgotPassword = () => Alert.alert('Forgot Password', 'Password reset coming soon.');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.title}>Đăng Nhập</Text>

        {/* Email field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email của bạn"
            placeholderTextColor={PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Nhập mật khẩu của bạn"
              placeholderTextColor={PLACEHOLDER}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={8}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color={SUBTLE}
              />
            </Pressable>
          </View>
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          style={styles.forgotWrapper}
          onPress={handleForgotPassword}
          activeOpacity={0.7}
        >
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Log In button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.85}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebook} activeOpacity={0.8}>
            <FontAwesome name="facebook-square" size={22} color="#1877F2" style={styles.socialIcon} />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogle} activeOpacity={0.8}>
            <GoogleColorIcon size={22} style={styles.socialIcon} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Register */}
        <Text style={styles.noAccountText}>Chưa có tài khoản?</Text>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/** Simple inline Google "G" colored icon */
function GoogleColorIcon({ size = 22, style }: { size?: number; style?: object }) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1.5,
          borderColor: '#EA4335',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={{ fontSize: size * 0.55, fontWeight: '700', color: '#4285F4', lineHeight: size * 0.7 }}>
        G
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: PRIMARY,
    textAlign: 'center',
    marginBottom: 28,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: LABEL,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: LABEL,
    backgroundColor: '#FAFAFA',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 46,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 2,
  },
  forgotText: {
    fontSize: 13,
    color: SUBTLE,
  },
  loginButton: {
    backgroundColor: PRIMARY,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: SUBTLE,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  socialIcon: {
    // spacing handled by gap
  },
  socialText: {
    fontSize: 14,
    color: LABEL,
    fontWeight: '500',
  },
  noAccountText: {
    textAlign: 'center',
    fontSize: 13,
    color: SUBTLE,
    marginBottom: 12,
  },
  registerButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: LABEL,
  },
});
