import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {YearPicker} from "../utils/YearPicker";

export class GameEdit extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleProducerChange = this.handleProducerChange.bind(this);

        this.state = { nameText: this.props.game.name, producerText: this.props.game.producer, year: this.props.game.releaseYear};
    }

    handleNameChange(nameText)
    {
        this.setState({nameText});
    }



    handleProducerChange(producerText)
    {
        this.setState({producerText});
    }

    componentWillUnmount() {

        if (this.state.nameText !== this.props.game.name || this.state.year !== this.props.game.releaseYear || this.state.producerText !== this.props.game.producer)
        {
            Alert.alert(
                'Save?',
                'Would you like to save the changes?',
                [
                    {text: 'NO'},
                    {text: 'YES', onPress: () => this.updateGame()},
                ],
                { cancelable: false }
            );
        }
    }

    updateGame()
    {
        let newGame = {name: this.state.nameText, releaseYear: this.state.year, producer: this.state.producerText};

        this.props.updateGame(this.props.gameKey, newGame);
    }


    handleOnValueChange(itemValue, itemIndex)
    {
        this.setState({year: itemValue})
    }

    render() {
        return (
            <View>

                <Text style={styles.titleText}>Name:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    name='NameInput'
                    onChangeText={this.handleNameChange}
                    value={this.state.nameText}
                />

                <Text style={styles.titleText}>Release Year:</Text>

                <YearPicker selectedValue={this.state.year} onValueChange={this.handleOnValueChange.bind(this)}/>

                <Text style={styles.titleText}>Producer:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    name='ProducerInput'
                    onChangeText={this.handleProducerChange}
                    value={this.state.producerText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});