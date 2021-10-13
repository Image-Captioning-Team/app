import React, {FC, useState} from 'react';
import {Portal, Dialog, Button, Paragraph, Subheading} from 'react-native-paper';
import ApiError from "../models/apiError";
import Colors from "../constants/Colors";
import {ScrollView, View} from 'react-native';

interface Props {
    error: Error
    resetError: () => void
}

const ErrorFatal: FC<Props> = props => {
    const [error, setError] = useState<Error>(props.error)
    const [isErrorStackShown, setIsErrorStackShown] = useState<boolean>(false)

    const onDismiss = () => {
        props.resetError()
    }

    return (
        <View>
            <Portal>
                <Dialog visible={true} onDismiss={() => onDismiss()}>
                    <Dialog.Title>Fataler Fehler</Dialog.Title>
                    <Dialog.Content>
                        <ScrollView style={{height: '80%', margin: 5}}>
                            <Subheading style={{color: Colors.secondary}}>{error.message}</Subheading>
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => onDismiss()} onLongPress={() => setIsErrorStackShown(true)}>App neu starten</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            {isErrorStackShown &&
            <Portal>
                <Dialog visible={isErrorStackShown} onDismiss={() => setIsErrorStackShown(false)}>
                    <Dialog.Title>Fehler Info</Dialog.Title>
                    <Dialog.Content>
                        <ScrollView style={{height: '80%', margin: 5}}>
                            <Subheading style={{color: Colors.secondary}}>{error.message}</Subheading>
                            <Paragraph>Stack: {JSON.stringify(error, Object.getOwnPropertyNames(error))}</Paragraph>
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsErrorStackShown(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            }
        </View>
    )
}


export default ErrorFatal;