import React from 'react';
import {Picker, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {GameEdit} from "../model/GameEdit";

import { Pie } from 'react-native-pathjs-charts'

export class DetailScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.navParams = this.props.navigation.state.params;

    }

    getPieData()
    {
        let data = [];

        for(let {game} of this.navParams.list)
        {
            console.log(game);
            let exists = 0;

            for(let obj of data)
            {
                if(obj.name == game.producer)
                {
                    exists = 1;
                    obj.number += 1;
                }
            }

            if(exists === 0)
            {
                data.push({
                    name: game.producer,
                    number: 1
                });
            }
        }

        return data;
    }

    render()
    {

        let data = this.getPieData();

        return (
            <View>

                <GameEdit gameKey={this.navParams.gameKey} game={this.navParams.game} updateGame={this.navParams.updateGame} />


                <Pie
                    data={data}
                    options={optionsPie}
                    accessorKey="number" />

            </View>

        );
    }
}

const optionsPie = {
    margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    },
    width: 350,
    height: 350,
    color: '#2980B9',
    r: 50,
    R: 150,
    legendPosition: 'topLeft',
    animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
    },
    label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
    }
}