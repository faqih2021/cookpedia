import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulcobjrrjvdkrkceezgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsY29ianJyanZka3JrY2Vlemd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjA2NDUsImV4cCI6MjA4MTYzNjY0NX0.ee8Vb42begtgySSIVgZ-vBqgDhQ0y9LGURAoB2GKTZc';

// Debug log
console.log('Connecting to Supabase:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Storage configuration
export const STORAGE_BUCKET = 'photo-profile';
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

/**
 * Upload profile photo to Supabase Storage
 * @param {string} uri - Local file URI
 * @param {string} userId - User ID for file naming
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadProfilePhoto = async (uri, userId) => {
  try {
    // Get file extension
    const ext = uri.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${userId}/${Date.now()}.${ext}`;
    
    // Fetch the file as blob
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Validate file size (2MB limit)
    if (blob.size > MAX_FILE_SIZE) {
      return {
        url: null,
        error: `File size exceeds 2MB limit. Current size: ${(blob.size / (1024 * 1024)).toFixed(2)}MB`
      };
    }
    
    // Convert blob to array buffer
    const arrayBuffer = await new Response(blob).arrayBuffer();
    
    // Determine content type
    const contentType = blob.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`;
    
    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, arrayBuffer, {
        contentType,
        upsert: true,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Upload profile photo error:', error);
    return { url: null, error: error.message || 'Failed to upload photo' };
  }
};

/**
 * Delete profile photo from Supabase Storage
 * @param {string} fileUrl - The public URL of the file to delete
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const deleteProfilePhoto = async (fileUrl) => {
  try {
    // Extract file path from URL
    const urlParts = fileUrl.split(`${STORAGE_BUCKET}/`);
    if (urlParts.length < 2) {
      return { success: false, error: 'Invalid file URL' };
    }
    
    const filePath = urlParts[1];
    
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) {
      console.error('Delete file error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Delete profile photo error:', error);
    return { success: false, error: error.message || 'Failed to delete photo' };
  }
};

/**
 * Get public URL for a file in storage
 * @param {string} filePath - Path to the file in storage
 * @returns {string} Public URL
 */
export const getProfilePhotoUrl = (filePath) => {
  const { data: { publicUrl } } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);
  return publicUrl;
};