import React from 'react';
import {Picker} from "react-native";

export class YearPicker extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render() {

        return(

            <Picker
                selectedValue={this.props.selectedValue}
                onValueChange={this.props.onValueChange}>
                <Picker.Item label="2009" value="2009" />
                <Picker.Item label="2010" value="2010" />
                <Picker.Item label="2011" value="2011" />
                <Picker.Item label="2012" value="2012" />
                <Picker.Item label="2013" value="2013" />
                <Picker.Item label="2014" value="2014" />
                <Picker.Item label="2015" value="2015" />
                <Picker.Item label="2016" value="2016" />
                <Picker.Item label="2017" value="2017" />
            </Picker>
        )
        ;

    }
}