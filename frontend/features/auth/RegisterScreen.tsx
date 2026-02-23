import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
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
const FACEBOOK_BLUE = '#1877F2';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!agreed) {
      Alert.alert('Lỗi', 'Bạn cần đồng ý với điều khoản & điều kiện.');
      return;
    }
    // TODO: connect to backend
    Alert.alert('Thành công', `Đăng ký tài khoản: ${email}`);
  };

  const handleFacebook = () => Alert.alert('Facebook', 'Đăng ký bằng Facebook sắp ra mắt.');
  const handleGoogle = () => Alert.alert('Google', 'Đăng ký bằng Google sắp ra mắt.');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Đăng Ký</Text>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor={PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Mật khẩu */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Nhập mật khẩu"
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
              <EyeIcon visible={showPassword} />
            </Pressable>
          </View>
        </View>

        {/* Xác nhận mật khẩu */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Xác nhận mật khẩu</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={PLACEHOLDER}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword((prev) => !prev)}
              hitSlop={8}
            >
              <EyeIcon visible={showConfirmPassword} />
            </Pressable>
          </View>
        </View>

        {/* Checkbox điều khoản */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgreed((prev) => !prev)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Tôi đồng ý với điều khoản &amp; điều kiện</Text>
        </TouchableOpacity>

        {/* Nút Đăng Ký */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.85}>
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hoặc đăng ký với</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Nút mạng xã hội */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebook} activeOpacity={0.8}>
            <FacebookIcon />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogle} activeOpacity={0.8}>
            <GoogleIcon />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Đã có tài khoản */}
        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push({ pathname: '/login' } as never)} activeOpacity={0.7}>
            <Text style={styles.loginLink}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <View style={eyeStyles.outer}>
      <View style={eyeStyles.inner} />
      {!visible && <View style={eyeStyles.slash} />}
    </View>
  );
}

function FacebookIcon() {
  return (
    <View style={socialIconStyles.fbCircle}>
      <Text style={socialIconStyles.fbText}>f</Text>
    </View>
  );
}

function GoogleIcon() {
  return (
    <View style={socialIconStyles.gCircle}>
      <Text style={socialIconStyles.gText}>G</Text>
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

const socialIconStyles = StyleSheet.create({
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  checkboxLabel: {
    fontSize: 13,
    color: LABEL,
    flex: 1,
  },
  registerButton: {
    backgroundColor: PRIMARY,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
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
    marginBottom: 28,
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
  socialText: {
    fontSize: 14,
    color: LABEL,
    fontWeight: '500',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 13,
    color: SUBTLE,
  },
  loginLink: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: '600',
  },
});
