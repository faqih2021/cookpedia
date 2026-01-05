import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { Box, Text, VStack, HStack, Pressable, Input, InputField } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, User, Mail } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/useAuth';
import { supabase, uploadProfilePhoto, MAX_FILE_SIZE } from '../lib/supabase';
import { COLORS } from '../components/auth/authComponents';

const avatarUri = 'https://i.pravatar.cc/150?img=12';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(avatarUri);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isFocused, setIsFocused] = useState({ name: false });

  const userEmail = user?.email || 'user@email.com';

  useEffect(() => {
    if (user) {
      setFullName(user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
      setAvatarUrl(user?.user_metadata?.avatar_url || avatarUri);
    }
  }, [user]);

  const requestPermission = async (type) => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    }
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermission('gallery');
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please allow access to your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploadingImage(true);
    try {
      // Check file size before uploading
      const response = await fetch(uri);
      const blob = await response.blob();
      
      if (blob.size > MAX_FILE_SIZE) {
        Alert.alert(
          'File Too Large', 
          `File size exceeds 2MB limit. Current size: ${(blob.size / (1024 * 1024)).toFixed(2)}MB. Please choose a smaller image.`
        );
        return;
      }

      // Upload to Supabase Storage (photo-profile bucket)
      const { url, error } = await uploadProfilePhoto(uri, user.id);

      if (error) {
        console.log('Upload error:', error);
        Alert.alert('Upload Failed', error);
        return;
      }

      setAvatarUrl(url);
      Alert.alert('Success', 'Photo uploaded! Click Save Changes to save your profile.');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Error', error.message || 'Failed to upload photo. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImageFromGallery },
      ]
    );
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName.trim(),
          avatar_url: avatarUrl
        }
      });

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="#F9FAFB">
      <SafeAreaView style={{ flex: 1 }}>
        <Box px="$5" pt="$2" pb="$4">
          <HStack alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => router.back()} p="$2">
              <ArrowLeft size={24} color="#1F2937" />
            </Pressable>
            <Text size="lg" fontWeight="$bold" color="$coolGray800">
              Edit Profile
            </Text>
            <Box w={40} />
          </HStack>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="center" py="$6">
            <Box position="relative">
              {uploadingImage ? (
                <Box
                  w={120}
                  h={120}
                  borderRadius={60}
                  bg="$coolGray200"
                  justifyContent="center"
                  alignItems="center"
                  borderWidth={3}
                  borderColor={COLORS.primary}
                >
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </Box>
              ) : (
                <Image
                  source={{ uri: avatarUrl }}
                  style={{ 
                    width: 120, 
                    height: 120, 
                    borderRadius: 60,
                    borderWidth: 3,
                    borderColor: COLORS.primary
                  }}
                />
              )}
              <Pressable
                onPress={showImagePickerOptions}
                disabled={uploadingImage}
                position="absolute"
                bottom={0}
                right={0}
                bg={COLORS.primary}
                w={36}
                h={36}
                borderRadius={18}
                justifyContent="center"
                alignItems="center"
                borderWidth={3}
                borderColor="white"
                $active={{ bg: COLORS.primaryDark }}
              >
                <Camera size={18} color="white" />
              </Pressable>
            </Box>
            <Pressable onPress={showImagePickerOptions} disabled={uploadingImage}>
              <Text color={COLORS.primary} fontSize="$sm" mt="$3" fontWeight="$medium">
                {uploadingImage ? 'Uploading...' : 'Tap to change photo'}
              </Text>
            </Pressable>
          </Box>

          <Box px="$5">
            <Box 
              bg="$white" 
              borderRadius={16} 
              p="$5"
              shadowColor="$coolGray300"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={2}
            >
              <VStack mb="$5">
                <Text fontSize="$sm" fontWeight="$medium" color="$coolGray700" mb="$2">
                  Full Name
                </Text>
                <Input
                  variant="outline"
                  size="lg"
                  borderRadius={12}
                  borderWidth={1.5}
                  borderColor={isFocused.name ? COLORS.primary : '$coolGray200'}
                  bg="$white"
                  h={52}
                >
                  <Box pl="$4" justifyContent="center">
                    <User size={20} color={isFocused.name ? COLORS.primary : '#9CA3AF'} />
                  </Box>
                  <InputField
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setIsFocused({ ...isFocused, name: true })}
                    onBlur={() => setIsFocused({ ...isFocused, name: false })}
                    fontSize="$md"
                    color="$coolGray800"
                    px="$3"
                  />
                </Input>
              </VStack>

              <VStack>
                <Text fontSize="$sm" fontWeight="$medium" color="$coolGray700" mb="$2">
                  Email Address
                </Text>
                <Input
                  variant="outline"
                  size="lg"
                  borderRadius={12}
                  borderWidth={1.5}
                  borderColor="$coolGray200"
                  bg="$coolGray50"
                  h={52}
                  isDisabled
                >
                  <Box pl="$4" justifyContent="center">
                    <Mail size={20} color="#9CA3AF" />
                  </Box>
                  <InputField
                    value={userEmail}
                    fontSize="$md"
                    color="$coolGray500"
                    px="$3"
                    editable={false}
                  />
                </Input>
                <Text fontSize="$xs" color="$coolGray400" mt="$1">
                  Email cannot be changed
                </Text>
              </VStack>
            </Box>

            <Pressable
              onPress={handleSave}
              disabled={loading}
              bg={loading ? '$coolGray400' : COLORS.primary}
              py="$4"
              borderRadius={12}
              mt="$6"
              alignItems="center"
              $active={{ bg: COLORS.primaryDark }}
              shadowColor={COLORS.primary}
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
              elevation={4}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text color="$white" fontWeight="$bold" fontSize="$md">
                  Save Changes
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              py="$4"
              borderRadius={12}
              mt="$3"
              alignItems="center"
              borderWidth={1}
              borderColor="$coolGray300"
              $active={{ bg: '$coolGray100' }}
            >
              <Text color="$coolGray700" fontWeight="$bold" fontSize="$md">
                Cancel
              </Text>
            </Pressable>
          </Box>

          <Box height={40} />
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}
