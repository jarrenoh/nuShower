import { View, Text, TextInput, Button } from 'react-native'
import React, {useState }from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { FIREBASE_AUTH } from 'firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  const signup = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Signed up')
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
      .catch((error) => {
        console.log('Error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }


return (
    <View style = {styles.container}>
      <Text>LoginScreen</Text>
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
      <Button
        title = "Login"
        onPress = {() => {
          setLoading(true)
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              console.log('Logged in')
            })
            .catch((error) => {
              console.log('Error:', error)
            })
            .finally(() => {
              setLoading(false)
            })
        }}
        disabled = {loading}
      />

      <Button
        title = "Sign Up"
        onPress = {signup}
        disabled = {loading}
      />
    </View>
  )
}

export default LoginScreen

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center'
  }
}