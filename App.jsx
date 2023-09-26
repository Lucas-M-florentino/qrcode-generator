import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Linking, TouchableOpacity } from 'react-native';

import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';

export default function App() {
  const [link, setLink] = useState('');
  const [qrcodeLink, setQrcodeLink] = useState('');

  const handleGenerate = () => {
    QRCodeLink.toDataURL(link, {
      width: 600,
      margin: 3,
    }, function (err, url) {
      setQrcodeLink(url);
    });
  };

  const handleQrcode = (value) => {
    setLink(value);
    handleGenerate(value);
  };

  const handleDownloadQrcode = () => {
    if (qrcodeLink) {
      // Abre o link no navegador para iniciar o download da imagem
      Linking.openURL(qrcodeLink);
    }
  };

  return (
    <View style={styles.container}>
      {link && <QRCode value={link} size={200} />}
      <TextInput
        style={styles.formInput}
        keyboardType='text'
        onChangeText={(text) => handleQrcode(text)}
        value={link}
      />
      {link && (
        <TouchableOpacity onPress={handleDownloadQrcode} style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Baixar QR Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    height: 40,
    borderRadius: 10,
    maxWidth: 300,
    width: '100%',
    margin: '24px',
    padding: '8px',
    outline: 'none',
    border: '1px solid #ccc',
  },
  downloadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
