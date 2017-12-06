import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {YearPicker} from "../utils/YearPicker";

export class GameEdit extends React.Component {

    constructor(props)
    {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleProducerChange = this.handleProducerChange.bind(this);

        this.state = { nameText: this.props.name, yearText: this.props.releaseYear, producerText: this.props.producer, year: this.props.releaseYear};
    }

    handleNameChange(nameText)
    {
        this.setState({nameText});
    }

    handleYearChange(yearText)
    {
        this.setState({yearText});
    }

    handleProducerChange(producerText)
    {
        this.setState({producerText});
    }

    componentWillUnmount() {

        if (this.state.nameText !== this.props.name || this.state.year !== this.props.releaseYear || this.state.producerText !== this.props.producer)
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
        let newGame = { game: {name: this.state.nameText, releaseYear: this.state.year, producer: this.state.producerText} };

        this.props.updateGame(this.props.index, newGame);
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
                {/*<TextInput*/}
                    {/*style={{height: 40, borderColor: 'gray', borderWidth: 1}}*/}
                    {/*name='YearInput'*/}
                    {/*onChangeText={this.handleYearChange}*/}
                    {/*value={this.state.yearText}*/}
                {/*/>*/}

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