import {
  Button,
  Flex,
  Link,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { listRooms } from 'graphql/queries'
import { createRoom } from 'graphql/mutations'
import NextLink from 'next/link'

function Home({ signOut, user }) {
  const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    API.graphql({
      query: listRooms,
    }).then(({ data }) => {
      setRooms(data.listRooms.items)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await API.graphql({
      query: createRoom,
      variables: {
        input: {
          name: roomName,
        },
      },
    })

    setRooms([...rooms, data.createRoom])
  }

  return (
    <main>
      <div className="container mx-auto p-3">
        <View>
          <Flex justifyContent={'end'}>
            <Button onClick={signOut}>Sign Out</Button>
          </Flex>
          <Text marginBlockEnd={'relative.large'}>
            Hey, {user.username}! Select a room to chat in or create your own
            public room.
          </Text>
          <form onSubmit={handleSubmit}>
            <TextField
              width="300px"
              label="New Room Name"
              placeholder="product-love"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </form>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                <NextLink href={`/rooms/${room.id}`}>
                  <Link>{room.name}</Link>
                </NextLink>
              </li>
            ))}
          </ul>
        </View>
      </div>
    </main>
  )
}

export default withAuthenticator(Home, {
  signUpAttributes: ['email', 'given_name', 'family_name'],
})
