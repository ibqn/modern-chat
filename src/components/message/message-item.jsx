import {
  Card,
  Flex,
  Heading,
  Image,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const MessageItem = ({ msg = {}, myUsername }) => {
  const { tokens } = useTheme()

  const isMyMsg = msg.owner === myUsername
  const isEdited = msg.createdAt !== msg.updatedAt
  const isImage = msg.content.imageId !== null

  return (
    <Card
      borderRadius={tokens.radii.small}
      variation="elevated"
      alignSelf={isMyMsg ? 'end' : 'start'}
      width={{ base: '300px', medium: '450px' }}
      backgroundColor={isMyMsg ? '#007aff' : '#DDDDDD'}
    >
      <Flex>
        <Image
          borderRadius={tokens.radii.small}
          src={`https://github.com/${msg.owner}.png`}
          height="50px"
          width={'50px'}
          alt="avatar"
        />

        <View>
          <Flex>
            <Heading level={5} color={isMyMsg ? 'white' : 'black'}>
              {msg.owner}{' '}
              <Text
                as="span"
                color={isMyMsg ? 'white' : 'black'}
                fontSize={'12px'}
                fontWeight="normal"
              >
                {formatDistanceToNow(parseISO(msg.createdAt), {
                  addSuffix: true,
                })}
              </Text>
            </Heading>
          </Flex>

          <TextMessage
            isMyMsg={isMyMsg}
            msgContent={msg.content.text}
            isEdited={isEdited}
          />
          {isImage && (
            <PicMessage isMyMsg={isMyMsg} msgContent={msg.content.imageId} />
          )}
        </View>
      </Flex>
    </Card>
  )
}

const TextMessage = ({ isMyMsg, msgContent, isEdited }) => {
  return (
    <Text display={'inline'} color={isMyMsg ? 'white' : 'black'}>
      {msgContent}{' '}
    </Text>
  )
}

const PicMessage = ({ msgContent }) => {
  const [picUrl, setPicUrl] = useState('')
  console.log('image name:', msgContent)

  useEffect(() => {
    const fetchData = async () => {
      const imageUrl = await Storage.get(msgContent)
      console.log(imageUrl)
      setPicUrl(imageUrl)
    }

    fetchData()
  }, [msgContent])

  return <Image src={picUrl} alt="" />
}
