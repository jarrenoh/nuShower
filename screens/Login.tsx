import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, {useState }from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { FIREBASE_AUTH } from 'firebase'
import { useNavigation } from '@react-navigation/core'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH
  const navigation = useNavigation()

  const signup = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Signed up')
      })
      .then(() => {
        navigation.navigate('UploadPicture')
      })
      .catch((error) => {
        console.log('Error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const signin = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Logged in')
      })
      .then(() => {
        navigation.navigate('UploadPicture')
      })
      .catch((error) => {
        console.log('Error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

return (
    <View style = {styles.container}>
      <Text style={styles.header}>nu<Text style={styles.orange}>Shower</Text></Text>
      <TextInput
        placeholder = "Email"
        value = {email}
        onChangeText = {setEmail}
        autoCapitalize='none'
        style = {{borderWidth: 1, padding: 10, margin: 10, width: 200}}
      />
      <TextInput
        secureTextEntry = {true}
        placeholder = "Password"
        value = {password}
        onChangeText = {setPassword}
        style = {{borderWidth: 1, padding: 10, margin: 10, width: 200}}
      />
      <TouchableOpacity style = {styles.button}
        onPress = {signin}
        disabled = {loading}
      >
        <Text style = {styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}
        onPress = {signup}
        disabled = {loading}
      >
        <Text style = {styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      
    </View>

  )
}

export default LoginScreen

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center'
  },
  header: {
    fontSize: 36,
    fontFamily: 'Great Vibes',
    color: '#173e78',
    textAlign: 'center',
  },
  orange: {
    color: '#fa6800',
  }, 
  button: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }

}