import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreateTeamHeader from '../components/CreateTeamHeader';

const CreateTeam = () => {
  return <SafeAreaView>
    <CreateTeamHeader/>
  </SafeAreaView>;
}

export default CreateTeam