import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Linking, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

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

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {link && <QRCode value={link} size={200} />}
        <TextInput
          style={styles.formInput}
          keyboardType='text'
          onChangeText={(text) => handleQrcode(text)}
          placeholder='Digite a URL ...'
          value={link}
        />
        {link && (
          <TouchableOpacity onPress={handleDownloadQrcode} style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>Baixar QR Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    backgroundColor: '#fafafa',
    fontSize: 20,
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
