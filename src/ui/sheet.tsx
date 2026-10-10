/* Modal screens: a close button and title on top, a big Save button fixed at the bottom. */
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Column, T, tap } from './kit';
import { useTheme } from './theme';

export function Sheet({
  title,
  onSave,
  saveLabel = 'সেভ করুন',
  canSave = true,
  children,
}: {
  title: string;
  onSave?: () => void;
  saveLabel?: string;
  canSave?: boolean;
  children: React.ReactNode;
}) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const top = Platform.OS === 'ios' ? 10 : insets.top + 6;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.bg }}
      // padding is measured against the keyboard's real position, so it is right with or without window resize
      behavior="padding"
    >
      <Column>
        <View style={[styles.header, { paddingTop: top }]}>
          <Pressable
            accessibilityLabel={onSave ? 'বাতিল' : 'বন্ধ'}
            onPress={() => {
              tap();
              router.back();
            }}
            hitSlop={8}
            style={({ pressed }) => [styles.close, { backgroundColor: t.fill, opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="close" size={22} color={t.text} />
          </Pressable>
          <T size={17} weight="700" center numberOfLines={1} style={{ flex: 1, marginHorizontal: 8 }}>
            {title}
          </T>
          {/* keeps the title centred */}
          <View style={{ width: 44 }} />
        </View>
      </Column>
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: onSave ? 24 : insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Column>{children}</Column>
      </ScrollView>
      {onSave ? (
        <View
          style={[
            styles.footer,
            { backgroundColor: t.bg, borderTopColor: t.sep, paddingBottom: Math.max(insets.bottom, 12) + 4 },
          ]}
        >
          <Column style={{ paddingHorizontal: 16 }}>
            <Button title={saveLabel} icon="checkmark-circle" onPress={onSave} disabled={!canSave} />
          </Column>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 10 },
  close: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingTop: 12, borderTopWidth: StyleSheet.hairlineWidth },
});
