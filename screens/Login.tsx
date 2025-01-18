import { View, Text } from 'react-native'
import React, {useState }from 'react'
import { FIREBASE_AUTH } from 'firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen